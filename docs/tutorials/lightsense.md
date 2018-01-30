# Light

## Step 1 @fullscreen
The BrainPad is equipped with an onboard light sensor. We can use this sensor to trigger an action when the light reaches a certain level. 

![BrainPad Temperature Sensor image](/images/light.jpg)

## Step 2 @fullscreen
In this tutorial, we will start using ``||logic:LOGIC||`` blocks. In this case we will use an ``||logic:If-Then||`` block. Drag an ``||logic:If-Then||`` block into the ``||loops:forever||`` block, as demonstrated in the example below. The ``||logic:If-Then||`` block is found under the ``||logic:LOGIC||`` tab.

```blocks
loops.forever(function () {
    if (true) {
    	
    }
})
```

## Step 3 @fullscreen
 ``||logic:Comparison||`` blocks are used to compare two different values. If those values are the same then the ``||logic:If-Then||`` is TRUE, and any BLOCKS inside the ``||logic:If-Then||`` block will run. Next we will drag a ``||logic:Comparison||`` block into the ``||logic:If-Then||`` block. You will find the ``||logic:Comparison||`` block inside the ``||logic:LOGIC||`` tab

```blocks
loops.forever(function () {
    if (0 == 0) {
    	
    }
})
```

## Step 4 @fullscreen
``||logic:Comparison||`` blocks not only compare numbers, but can read the value of a sensor and compare it to a number. Let's drag in the ``||input:light level||`` block, located inside the ``||input:INPUT||`` tab into the first parameter of our 
``||logic:Comparison||`` block. 

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
    	
    }
})
```

## Step 5 @fullscreen
If you look at the BrainPad simulator, you'll noticed that a new highlight is revealled on top of the Light Sensor. This is where we control the virtual light levels, within our simulator using the mouse. 

![BrainPad Temperature Sensor image](/images/lightSensor_Gauge.gif)

## Step 6 @fullscreen
Now, Let's make the BrainPad, light up our Light Blub, when the ``||input:light level||`` = ``||logic:0||``. To accomplish this drag in ``||light bulb:setColor||`` inside our ``||logic:If-Then||`` block. 

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
        lightbulb.setColor(0xFF0000)
    }
})
```

## Step 7 @fullscreen
If you tried the simulator, you may have noticed when the light level reaches 0, the light turns red and stays on. Even if the light level is no longer 0, this is because we never tell the BrainPad to turn off the Light Bulb. With an ``||logic:If-Then||`` we can accomplish easily. Click on the + sign at the bottom of the ``||logic:If-Then||`` block. This will expand the blocky to revel the an 'else' condition with the block. If the condition of the ``||logic:If-Then||`` is TRUE, it will execute the first line, if it's FALSE, it will execute the else. From the ``||light bulb:Light Bulb||`` Tab drag in the ``||light bulb:clear light bulb||``

```blocks
loops.forever(function () {
    if (input.lightLevel() == 0) {
        lightbulb.setColor(0xFF0000)
    } else {
        lightbulb.clear()
    }
})
```