# Light Bulb

## Step 1 @unplugged

Let's start by doing something simple. Let's light up the Light Bulb on the BrainPad.
 
## Step 2 @fullscreen

You'll notice the project begins with a ``||loops:forever||`` block. Anything we place inside this block will keep running forever in the program.

 ```blocks
loops.forever(function () {
   
})
```

## Step 3 @fullscreen

Let's drag a new block into the ``||loops:forever||`` block. In our block menu under Light Bulb, grab the ``||lightbulb:set light bulb to||`` block and drag it into the ``||loops:forever||`` block.

 ```blocks
forever(function () {
    lightbulb.setColor(0xFF0000)
})
```

## Step 4 @fullscreen

If you look in the simulator, you'll see that our Light Bulb is now RED. Click on the RED bubble inside the block we just added. Here you'll be able to change the color of the Light Bulb to any of the colors available on the color pallette. 

```blocks
forever(function () {
    lightbulb.setColor(0xFF0000)
})
```

## Step 5 @fullscreen

But what if the exact color you want isn't on the pallette? We can add parameters to change values, and create our own color. To accomplish this we need to drag a ``||lightbulb:red green blue||`` block inside of the  ``||lightbulb:set light bulb to||``.

```blocks
forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 255, 255))
})
```

## Step 6 @fullscreen

Let's suppose we wanted to make our LED blink every second. To do this we will need to add a ``||loops:pause||`` inside our ``||loops:forever||`` block. We'll also need to change the parameters value inside the block to 1000 ms, but the Light Bulb still won't blink. Can you guess why?

```blocks
forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 255, 255))
    pause(1000)
})
```

## Step 7 @fullscreen

Our Light Bulb doesn't blink because we never turn off the Light Bulb anywhere in our ``||loops:forever||`` block. We can accomplish this by adding a ``||lightbulb:set brightness||`` block right after our ``||loops:pause||`` block. It defauts to a value of 15, we need to change this to 0. This will turn off the Light Bulb.

```blocks
forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 255, 255))
    pause(1000)
    lightbulb.setBrightness(15)
})
```

## Step 8 @fullscreen

But Our Light Bulb still doesn't blink properly. That's because we never tell the BrainPad how long to leave the Light Bulb off. So right after ``||lightbulb:set brightness||`` block. We need to add another ``||loops:pause||`` block

```blocks
forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 255, 255))
    pause(1000)
    lightbulb.setBrightness(0)
    pause(1000)
})
```

## Step 9 @fullscreen

We still need to turn the brightness back up. So we'll add another ``||lightbulb:set brightness||`` block to complete the task, and set it all the way up to 255 (100%). The Light Bulb on the simulator should be blinking, whatever color we created. 

```blocks
forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 255, 255))
    pause(1000)
    lightbulb.setBrightness(0)
    pause(1000)
    lightbulb.setBrightness(100)
})
```

