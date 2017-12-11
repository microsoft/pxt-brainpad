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

    s.tmp_0 = { fn: writeLine__P71, parent: s };
    r0 = "light=";
    s.tmp_1 = r0;
    r0 = pxsim.input.lightLevel();
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
    s.pc = 2;
    return actionCall(s.tmp_0)
  case 2:
    r0 = s.retval;
  case 1:
    return leave(s, r0)
  default: oops()
} } }
inline__P107.info = {"start":14,"length":62,"line":0,"column":14,"endLine":2,"endColumn":1,"fileName":"test.ts","functionName":"inline"}



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


setupDebugger(1)
