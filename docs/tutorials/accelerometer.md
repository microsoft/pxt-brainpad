# Accelerometer

## Step 1 @unplugged

The accelerometer is an input device that measures the force of acceleration in three axes (x, y, and z). Commonly know as g-force. 

![BrainPad Accelerometer Image](/static/images/accelerometer.jpg)

## Step 2 @unplugged

If the BrainPad is laying flat on a the table as shown, the x-axis runs horizontally left and right, the y-axis goes horizontally toward you and away from you, and the z-axis extends vertically straight up and down.

![BrainPad Accelerometer Image](/static/images/axis.jpg)

## Step 3 @fullscreen

We can use the BrainPad's accelerometer by dragging in an ``||input:on shake||`` event block, it's found under the ``||input:INPUT||`` tab. If you click on the blocks parameter you can see all the available options using the accelerometer event. 

```blocks
input.onGesture(Gesture.Shake, function () {
	
})    
```

## Step 4 @fullscreen

Change the parameter from ``||input:on shake||`` to ``||input:on tilt up||``. We will drag a ``||lightbulb:set light bulb to||`` inside our our Accelerometer event. 

```blocks
input.onGesture(Gesture.TiltUp, function () {
    lightbulb.setColor(0xff0000)
})
```

## Step 5 @fullscreen

Now you'll notice in the simulator we can move the BrainPad around with our mouse. Try tilting the BrainPad Up and watch the Red Light turn on. 
![BrainPad Accelerometer Image](/static/images/accel_sim_demo.gif)

## Step 6 @fullscreen

You should also notice, that once our light turns on it doesn't turn off or change color. Let's add another ``||input:on shake||`` event block. Change the parameter on this one to ``||input:on tilt down||`` and drag in ``||lightbulb:set light bulb to||`` set this one to a different color. 

```blocks
input.onGesture(Gesture.TiltUp, function () {
    lightbulb.setColor(0xff0000)
})
input.onGesture(Gesture.TiltDown, function () {
    lightbulb.setColor(0x007fff)
})
```

## Step 7 @unplugged

Now when we tilt the board back and forth, the Light Bulb changes color to red when we Tilt-Up and blue when we Tilt-Down

![BrainPad Accelerometer Image](/static/images/accel_lightbulb.gif)

## Step 8 @fullscreen

Now that you know how to use an ``||input:on shake||`` block to read an accelerometer event, trying playing around with the other parameters and see what the results are. When you're done deploy your program and see how it acts on the actual BrainPad. 

![BrainPad Accelerometer Image](/static/images/accelerometer.jpg)