#include "pxt.h"

void cpu_clock_init(void);

PXT_ABI(__aeabi_dadd)
PXT_ABI(__aeabi_dcmplt)
PXT_ABI(__aeabi_dcmpgt)
PXT_ABI(__aeabi_dsub)
PXT_ABI(__aeabi_ddiv)
PXT_ABI(__aeabi_dmul)


// newer codal-core has get_fiber_list() but not list_fibers()
namespace codal {
/*
 * Return all current fibers.
 *
 * @param dest If non-null, it points to an array of pointers to fibers to store results in.
 *
 * @return the number of fibers (potentially) stored
 */
int list_fibers(Fiber **dest) {
    int i = 0;
    for (Fiber *fib = codal::get_fiber_list(); fib; fib = fib->next) {
        if (dest)
            dest[i] = fib;
        i++;
    }
    return i;
}

} // namespace codal


#define PXT_COMM_BASE 0x20001000  // 4k in

namespace pxt {

void platform_init();
void usb_init();

// The first two word are used to tell the bootloader that a single reset should start the
// bootloader and the MSD device, not us.
// The rest is reserved for partial flashing checksums.
__attribute__((section(".binmeta"))) __attribute__((used)) const uint32_t pxt_binmeta[] = {
    0x87eeb07c, 0x87eeb07c, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff,
    0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff, 0x00ff00ff,
};

CODAL_TIMER devTimer;
Event lastEvent;
MessageBus devMessageBus;
codal::CodalDevice device;

struct FreeList {
    FreeList *next;
};

static void commInit() {
    int commSize = bytecode[20];
    if (!commSize) return;

    FreeList *head = NULL;        
    void *commBase = (void*)PXT_COMM_BASE;
    for (;;) {
        void *p = malloc(4);
        // assume 4 byte alloc header; if we're not hitting 8 byte alignment, try allocating 8 bytes, not 4
        // without the volatile, gcc assumes 8 byte alignment on malloc()
        volatile unsigned hp = (unsigned)p;
        if (hp & 4) {
            free(p);
            p = malloc(8);
        }
        if (p == commBase) {
            free(p);
            // allocate the comm section; this is never freed
            p = malloc(commSize);
            if (p != commBase)
                target_panic(999);
            break;
        }
        if (p > commBase) 
            target_panic(999);
        auto f = (FreeList*)p;
        f->next = head;
        head = f;
    }
    // free all the filler stuff
    while (head) {
        auto p = head;
        head = head->next;
        free(p);
    }
}

static void initCodal() {
    cpu_clock_init();

    commInit();

    // Bring up fiber scheduler.
    scheduler_init(devMessageBus);

    // We probably don't need that - components are initialized when one obtains
    // the reference to it.
    // devMessageBus.listen(DEVICE_ID_MESSAGE_BUS_LISTENER, DEVICE_EVT_ANY, this,
    // &CircuitPlayground::onListenerRegisteredEvent);

    for (int i = 0; i < DEVICE_COMPONENT_COUNT; i++) {
        if (CodalComponent::components[i])
            CodalComponent::components[i]->init();
    }

    usb_init();
}

// ---------------------------------------------------------------------------
// An adapter for the API expected by the run-time.
// ---------------------------------------------------------------------------

// We have the invariant that if [dispatchEvent] is registered against the DAL
// for a given event, then [handlersMap] contains a valid entry for that
// event.
void dispatchEvent(Event e) {
    lastEvent = e;

    auto curr = findBinding(e.source, e.value);
    auto value = fromInt(e.value);
    if (curr)
        runAction1(curr->action, value);

    curr = findBinding(e.source, DEVICE_EVT_ANY);
    if (curr)
        runAction1(curr->action, value);
}

void registerWithDal(int id, int event, Action a, int flags) {
    // first time?
    if (!findBinding(id, event))
        devMessageBus.listen(id, event, dispatchEvent, flags);
    setBinding(id, event, a);
}

void fiberDone(void *a) {
    decr((Action)a);
    release_fiber();
}

void releaseFiber() {
    release_fiber();    
}

void sleep_ms(unsigned ms) {
    fiber_sleep(ms);
}

void sleep_us(uint64_t us) {
    target_wait_us(us);
}

void forever_stub(void *a) {
    while (true) {
        runAction0((Action)a);
        fiber_sleep(20);
    }
}

void runForever(Action a) {
    if (a != 0) {
        incr(a);
        create_fiber(forever_stub, (void *)a);
    }
}

void runInParallel(Action a) {
    if (a != 0) {
        incr(a);
        create_fiber((void (*)(void *))runAction0, (void *)a, fiberDone);
		
		fiber_sleep(1); // TQD fixed crashed game engine - overlap event
    }
}

void waitForEvent(int id, int event) {
    fiber_wait_for_event(id, event);
}

void initRuntime() {
    initCodal();
    platform_init();
}

//%
unsigned afterProgramPage() {
    unsigned ptr = (unsigned)&bytecode[0];
    ptr += programSize();
    ptr = (ptr + (PAGE_SIZE - 1)) & ~(PAGE_SIZE - 1);
    return ptr;
}

// TQD_TODO

uint64_t getLongSerialNumber() {
    return device.getSerialNumber();
}

// int getSerialNumber() {
    // return device.getSerialNumber();
// }

int current_time_ms() {
    return system_timer_current_time();
}

uint64_t current_time_us() {
    return system_timer_current_time_us();
}


ThreadContext *getThreadContext() {
    if (!currentFiber)
        return NULL;
    return (ThreadContext *)currentFiber->user_data;
}

void setThreadContext(ThreadContext *ctx) {
    currentFiber->user_data = ctx;
}
static void *threadAddressFor(codal::Fiber *fib, void *sp) {
    if (fib == currentFiber)
        return sp;
    return (uint8_t *)sp + ((uint8_t *)fib->stack_top - (uint8_t *)tcb_get_stack_base(fib->tcb));
}

void gcProcessStacks(int flags) {
    // check scheduler is initialized
    if (!currentFiber) {
        // make sure we allocate something to at least initalize the memory allocator
        void *volatile p = xmalloc(1);
        xfree(p);
        return;
    }

    int numFibers = codal::list_fibers(NULL);
    codal::Fiber **fibers = (codal::Fiber **)xmalloc(sizeof(codal::Fiber *) * numFibers);
    int num2 = codal::list_fibers(fibers);
    if (numFibers != num2)
        oops(12);
    int cnt = 0;

    for (int i = 0; i < numFibers; ++i) {
        auto fib = fibers[i];
        auto ctx = (ThreadContext *)fib->user_data;
        if (!ctx)
            continue;
        gcProcess(ctx->thrownValue);
        for (auto seg = &ctx->stack; seg; seg = seg->next) {
            auto ptr = (TValue *)threadAddressFor(fib, seg->top);
            auto end = (TValue *)threadAddressFor(fib, seg->bottom);
            if (flags & 2)
                DMESG("RS%d:%p/%d", cnt++, ptr, end - ptr);
            // VLOG("mark: %p - %p", ptr, end);
            while (ptr < end) {
                gcProcess(*ptr++);
            }
        }
    }
    xfree(fibers);
}

// TQD_TODO
LowLevelTimer *getJACDACTimer() {
    static LowLevelTimer *jacdacTimer;
    if (!jacdacTimer) {
        // jacdacTimer = allocateTimer();
        // jacdacTimer->setIRQPriority(1);
    }
    return jacdacTimer;
}
void initSystemTimer() {
    //new CODAL_TIMER(*allocateTimer());
}
}
