pxsim.enableFloatingPoint();
pxsim.setConfigData({}, {});


var _main___P1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    r0 = globals._pollEventQueue___52;
    pxtrt.decr(r0);
    r0 = undefined;
    globals._pollEventQueue___52 = (r0);
    r0 = 1;
    globals.i___76 = (r0);
    r0 = 0.5;
    globals.f___77 = (r0);
    r0 = (globals.i___76 + globals.f___77);
    globals.plus___78 = (r0);
    r0 = (globals.i___76 - globals.f___77);
    globals.minus___79 = (r0);
    r0 = pxsim.Math_.random();
    globals.r___80 = (r0);
    r0 = pxsim.Math_.randomRange(5, 10);
    globals.ri___81 = (r0);
    r0 = inline__P82;
    s.tmp_0 = r0;
    r0 = pxsim.loops.forever(s.tmp_0);
    s.tmp_1 = r0;
    r0 = s.tmp_0;
    pxtrt.decr(r0);
    r0 = s.tmp_1;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt-core.d.ts","functionName":"<main>"}
_main___P1.continuations = [  ]



var inline__P82  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    setupResume(s, 2);
    pxsim.loops.pause(100);
    checkResumeConsumed();
    return;
  case 2:
    r0 = s.retval;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
inline__P82.info = {"start":128,"length":30,"line":8,"column":14,"endLine":10,"endColumn":1,"fileName":"test.ts","functionName":"inline"}


setupDebugger(1)
