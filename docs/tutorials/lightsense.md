# Light

## Step 1 @unplugged

The BrainPad is equipped with an onboard light sensor. We can use this sensor to trigger an action when the light reaches a certain level. 

![BrainPad Temperature Sensor image](/static/images/light.jpg)

## Step 2 @fullscreen

In this tutorial, we will start using ``||logic:LOGIC||`` blocks. In this case we will use an ``||logic:if then||`` block. Drag an ``||logic:if then||`` block into the ``||loops:forever||`` block. The ``||logic:if then||`` block is found under the ``||logic:LOGIC||`` tab.

```blocks
loops.forever(function () {
    if (true) {
    	
    }
})
```

## Step 3 @fullscreen

 ``||logic:Comparison||`` blocks are used to compare values. Let's check to see if two values are the same. Change the "LOGICAL OPERATOR" to an equal sign (=). If both values are equal, then code we put inside the ``||logic:if then||`` block will run. 

```blocks
loops.forever(function () {
    if (0 == 0) {
    	
    }
})
```

## Step 4 @fullscreen

``||logic:Comparison||`` blocks not only compare numbers, but can read the value of a sensor and compare it to a number. Let's drag in the ``||input:light level||`` block, located inside the ``||input:INPUT||`` tab into the first parameter of our ``||logic:Comparison||`` block. 

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
    	
    }
})
```

## Step 5 @fullscreen

If you look at the BrainPad simulator, you'll noticed that a new highlight is revealled on top of the Light Sensor. This is where we control the virtual light levels, within our simulator using the mouse. 

![BrainPad Temperature Sensor image](/static/images/lightSensor_Gauge.gif)

## Step 6 @fullscreen

Now, Let's make the BrainPad, light up our Light Blub, when the ``||input:light level||`` = ``||logic:0||``. To accomplish this drag in ``||lightbulb:setColor||`` inside our ``||logic:if then||`` block. 

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
        lightbulb.setColor(0xFF0000)
    }
})
```

## Step 7 @fullscreen

If light level reaches 0, the light turns on and stays on. We never tell the BrainPad to turn off the light. Click the + sign at the bottom of the ``||logic:if then||`` block. An 'else' condition is revealed.  Drag a ``||light bulb:set brightness||`` inside the 'else' and set to 0.

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
        lightbulb.setColor(0xFF0000)
    } else {
        lightbulb.setBrightness(0)
    }
})
```

## Step 8 @fullscreen

Experiment with changing the "LOGICAL OPERATOR" inside our ``||logic:Comparison||`` block. You can change it to LESS THAN(<) or GREATER THAN(>) or any of the other options available. Also try changing the value we compare with the Light Sensor too. 

```blocks
loops.forever(function () {
    if (input.lightLevel() > 10) {
        lightbulb.setColor(0xFF0000)
    } else {
        lightbulb.setBrightness(0)
    }
})
```
