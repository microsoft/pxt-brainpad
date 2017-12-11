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
    r0 = 1000;
    globals.i___128 = (r0);
  case 1:
    r0 = (globals.i___128 > 0);
    s.tmp_0 = r0;
    r0 = pxsim.numops.toBoolDecr(s.tmp_0);
    if (!r0) { step = 3; continue; }
    setupResume(s, 8);
    pxsim.music.playTone(440, globals.i___128);
    checkResumeConsumed();
    return;
  case 8:
    r0 = s.retval;
  case 2:
    r0 = (globals.i___128 - 50);
    globals.i___128 = (r0);
    { step = 1; continue; }
  case 3:
    r0 = 0;
    globals.i___130 = (r0);
  case 4:
    r0 = (globals.i___130 < 1000);
    s.tmp_0 = r0;
    r0 = pxsim.numops.toBoolDecr(s.tmp_0);
    if (!r0) { step = 6; continue; }
    setupResume(s, 9);
    pxsim.music.playTone(440, globals.i___130);
    checkResumeConsumed();
    return;
  case 9:
    r0 = s.retval;
  case 5:
    r0 = (globals.i___130 + 20);
    globals.i___130 = (r0);
    { step = 4; continue; }
  case 6:
  case 7:
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt_modules/base/pxt-core.d.ts","functionName":"<main>"}
_main___P1.continuations = [ 8,9 ]


setupDebugger(1)
