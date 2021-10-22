# Onboard LED

## Step 1 @unplugged

Let's start by doing something simple. Let's light up the LED on the BrainPad.

![BrainPad led image](../static/images/led.jpg)

## Step 2 @unplugged

You'll notice the project begins with a ``||loops:forever||`` block. Anything we place inside this block will keep running forever in the program.

 ```blocks
forever(function () {
   
})
```

## Step 3 @fullscreen

Let's drag a new block into the ``||loops:forever||`` block. In our block menu under LED grab the led on block and drag it into the ``||loops:forever||`` block. You'll see the LED in the simulator is now on. 

 ```blocks
forever(function () {
    led.setled(true)
})
```

## Step 4 @fullscreen

Let's make it blink! To make it blink we first need to add a pause just under the LED block. Let's set the pause to 1000ms, which is 1 second.

 ```blocks
forever(function () {
    led.setled(true)
    pause(1000)
})
```

## Step 5 @fullscreen

We next to an LED OFF block just below the ``||loops:pause||`` block.

 ```blocks
forever(function () {
    led.setled(true)
    pause(1000)
    led.setled(false)
})
```

## Step6 @fullscreen

The LED doesn't quite blink properly yet, we need to add one last pause after we turn the led off and wait 1 second before we turn it back on. Once added we now have a properly blinking LED. 

 ```blocks
forever(function () {
    led.setled(true)
    pause(1000)
    led.setled(false)
    pause(1000)
})
```
