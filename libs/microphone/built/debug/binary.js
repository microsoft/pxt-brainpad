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
    r0 = inline__P107;
    s.tmp_0 = r0;
    r0 = pxsim.loops.forever(s.tmp_0);
    s.tmp_1 = r0;
    r0 = s.tmp_0;
    pxtrt.decr(r0);
    r0 = s.tmp_1;
    r0 = inline__P113;
    s.tmp_0 = r0;
    r0 = pxsim.input.onLoudSound(s.tmp_0);
    s.tmp_1 = r0;
    r0 = s.tmp_0;
    pxtrt.decr(r0);
    r0 = s.tmp_1;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt_modules/base/pxt-core.d.ts","functionName":"<main>"}
_main___P1.continuations = [  ]



var inline__P107  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.level___108 = undefined;
    r0 = pxsim.input.soundLevel();
    s.level___108 = (r0);
    s.tmp_0 = { fn: writeValue__P73, parent: s };
    r0 = "sound";
    s.tmp_0.arg0 = r0;
    r0 = s.level___108;
    s.tmp_0.arg1 = r0;
    s.pc = 2;
    return actionCall(s.tmp_0)
  case 2:
    r0 = s.retval;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
inline__P107.info = {"start":14,"length":82,"line":0,"column":14,"endLine":3,"endColumn":1,"fileName":"test.ts","functionName":"inline"}



var writeValue__P73  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.prefix___111 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = pxtrt.incr(s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    pxtrt.incr(r0);
    s.tmp_0 = r0;
    r0 = pxsim.numops.toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    r0 = s.arg0;
    pxtrt.incr(r0);
    s.tmp_1 = r0;
    r0 = ":";
    s.tmp_2 = r0;
    r0 = pxsim.String_.concat(s.tmp_1, s.tmp_2);
    s.tmp_3 = r0;
    r0 = s.tmp_1;
    pxtrt.decr(r0);
    r0 = s.tmp_2;
    pxtrt.decr(r0);
    r0 = s.tmp_3;
    { step = 2; continue; }
  case 1:
    r0 = pxsim.String_.mkEmpty();
    { step = 2; continue; }
  case 2:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = s.prefix___111;
    pxtrt.decr(r0);
    r0 = s.tmp_4;
    s.prefix___111 = (r0);
    s.tmp_0 = { fn: writeLine__P71, parent: s };
    r0 = s.prefix___111;
    pxtrt.incr(r0);
    s.tmp_1 = r0;
    r0 = s.arg1;
    s.tmp_2 = r0;
    r0 = pxsim.numops.toString(s.tmp_2);
    s.tmp_3 = r0;
    r0 = s.tmp_2;
    pxtrt.decr(r0);
    r0 = s.tmp_3;
    s.tmp_4 = r0;
    r0 = pxsim.String_.concat(s.tmp_1, s.tmp_4);
    s.tmp_5 = r0;
    r0 = s.tmp_1;
    pxtrt.decr(r0);
    r0 = s.tmp_4;
    pxtrt.decr(r0);
    r0 = s.tmp_5;
    s.tmp_0.arg0 = r0;
    s.pc = 4;
    return actionCall(s.tmp_0)
  case 4:
    r0 = s.retval;
  case 3:
    r0 = s.prefix___111;
    pxtrt.decr(r0);
    r0 = s.arg0;
    pxtrt.decr(r0);
    return leave(s, r0)
  default: oops()
} } }
writeValue__P73.info = {"start":1114,"length":158,"line":35,"column":4,"endLine":38,"endColumn":5,"fileName":"pxt_modules/base/serial.ts","functionName":"writeValue"}



var writeLine__P71  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = pxtrt.incr(s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    pxtrt.incr(r0);
    s.tmp_0 = r0;
    r0 = "\r\n";
    s.tmp_1 = r0;
    r0 = pxsim.String_.concat(s.tmp_0, s.tmp_1);
    s.tmp_2 = r0;
    r0 = s.tmp_0;
    pxtrt.decr(r0);
    r0 = s.tmp_1;
    pxtrt.decr(r0);
    r0 = s.tmp_2;
    s.tmp_3 = r0;
    r0 = pxsim.serial.writeString(s.tmp_3);
    s.tmp_4 = r0;
    r0 = s.tmp_3;
    pxtrt.decr(r0);
    r0 = s.tmp_4;
  case 1:
    r0 = s.arg0;
    pxtrt.decr(r0);
    return leave(s, r0)
  default: oops()
} } }
writeLine__P71.info = {"start":390,"length":89,"line":13,"column":4,"endLine":15,"endColumn":5,"fileName":"pxt_modules/base/serial.ts","functionName":"writeLine"}



var inline__P113  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.tmp_0 = { fn: writeLine__P71, parent: s };
    r0 = "loud";
    s.tmp_0.arg0 = r0;
    s.pc = 2;
    return actionCall(s.tmp_0)
  case 2:
    r0 = s.retval;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
inline__P113.info = {"start":116,"length":38,"line":4,"column":18,"endLine":6,"endColumn":1,"fileName":"test.ts","functionName":"inline"}


setupDebugger(1)
