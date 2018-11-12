# Using Servos

## Step 1 @unplugged

Since the BrainPad has two servo ports we will demonstrate how to use both in Microsoft MakeCode. We will show how to use two different kinds of servos.  
 
![BrainPad servo ports](/static/images/servo_ports.jpg)

## Step 2 @unplugged

Servo motors are small DC motors that are controlled using a small circuit and gears to control how it operates. Below is a disassembled view of a simple servo motor. 
 
![BrainPad servo ports](/static/images/servo_parts.jpg)

## Step 3 @unplugged

Two common servos are "Positional Rotation Servos" and "Continuous Rotation Servos", they may look the same but they operate very differently. Continuous servos rotate 360 degrees in either direction. Positional servos turn part of the way in about a half a circle, or from 0 to 180 degrees. 90 degrees would place the positional servo's arm in the middle.
 
![Comparison of Servos](/static/images/servo_motors.gif)
 
## Step 4 @unplugged

Positional servos are often used in radio controlled car steering. Since the motor never has to turn more than 180 degrees a positional servo works great. 
  
![RC Car Servo](/static/images/rc_positional.jpg)

## Step 5 @unplugged

While continuous servos are often used to control the rear wheels since these kind of servos can spin continuously in a circle in either direction.  

![RC Car Servo](/static/images/rc_continuous.jpg)

## Step 6 @unplugged

First let's connect the continuous servo to the BrainPad at the 1st servo port. Connect with the Brown wire down, this is the GND wire. The Red wire is POWER, while the top Yellow wire sends the SIGNAL. 

![Connecting to servo port one](/static/images/servo_port_one.jpg)

## Step 7 @unplugged

Next, let's connect the positional servo to the 2nd servo port on the BrainPad. 

![Connecting to servo port two](/static/images/servo_port_two.jpg)

## Step 8 @fullscreen

Now let's start coding. Under loops, drag in an ``||loops:on start||`` block. Inside this block add a ``||servos:continuous servo||`` block from the side menu. We can keep the default settings. This will start the motor on port 1 at 50%.

```blocks
    servos.servo1.run(50)
```

## Step 9 @fullscreen

Next, we'll program our positional servo.  Add a ``||servos:set servo||`` block to the ``||loops:forever||`` block. Change the default value of the port from 1 to 2, and angle to 0. This will make the servo, plugged in the 2nd servo port, start at 0 degrees.

```blocks
forever(function () {
    servos.servo2.setAngle(0)
})
```

## Step 10 @fullscreen

To move the positional servo let's add another ``||servos:set servo||`` block, but we also need to a ``||loops:pause||`` block add inbetween and after the new block. Set both ``||loops:pause||`` blocks to 1000 ms(1 second). Change the port to 2, this time change set the angle to 90. This makes the servo move from the RIGHT position to the UP position and back again. 

```blocks
forever(function () {
    servos.servo2.setAngle(0)
    pause(1000)
    servos.servo2.setAngle(90)
    pause(1000)
})
```

## Step 11 @fullscreen

Let's add a final angle to our code, this will make the servo move from 0 degrees to 90 degrees, and then to 180 degrees. Finally it goes back to the 0 degree position and starts again. 

```blocks
forever(function () {
    servos.servo2.setAngle(0)
    pause(1000)
    servos.servo2.setAngle(90)
    pause(1000)
    servos.servo2.setAngle(180)
    pause(1000)
})
```
## Step 12 @fullscreen

That's it now download and transfer your code to the Brainpad. The servos will start to move. The continuous servo turning constantly, and the positional servo will move through its various positions.  

![Comparison of Servos](/static/images/servo_motors.gif)