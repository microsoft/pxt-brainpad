# Light Bulb

## Step 1  @fullscreen

Let's start by doing something simple. Let's light up the Light Bulb on the BrainPad. You'll notice the project begins with a
``||loops:forever||`` block. Anything we place inside this block will keep running forever in our program.

```blocks
loops.forever(function () {
   
})
```

## Step 2  @fullscreen

Let's drag a new block into the ``||loops:forever||`` block. Under Light Bulb, grab the ``||lightbulb:setColor||`` block and drag it into the ``||loops:forever||`` block.

```block
lightbulb.setColor(0xFF0000)
```

## Step 4 @fullscreen
If you look in the simulator, you'll see that our Light Bulb is now RED.

Click on the RED bubble inside the block we just added. Here you'll be able to change the color of the Light Bulb to any of the colors available on the pallette. 

![Set color](/images/setColorMakeCode.gif)

## Step 1a @fullscreen
But what if the exact color you want isn't on the pallette? We can add parameters to change the values. To accomplish this task, we will use two different blocks.
 The ``||lightbulb:setColor||`` block and the ``||lightbulb:rgb||`` block

```cards

lightbulb.rgb(255, 0, 0)
lightbulb.setColor(0xFF0000)
```
![Set color](/images/setColorRGB.gif)


## Step 6  @fullscreen
Let's suppose we wanted to make our LED blink every second. To do this we will need to add a ``||loops:pause||`` inside our ``||loops:forever||`` block. We'll also need to change the parameters value inside the block to 1000 ms, but the Light Bulb still won't blink. Can you guess why?

```block
 
loops.pause(1000)
```

## Step 7 @fullscreen
Our Light Bulb doesn't blink because we never turn off the Light Bulb anywhere in our ``||loops:forever||`` block. We can accomplish this by adding a ``||lightbulb:clear light bulb||`` block right after our ``||loops:pause||`` block.

```block
 
lightbulb.clear()
```

## Step 8 @fullscreen
Our Light Bulb still doesn't blink properly. That's because we never tell the BrainPad how long to leave the light off. So right after ``||lightbulb:clear light bulb||`` block. We need to add another ``||loops:pause||`` block

```block
 
loops.pause(1000)
```

## Step 9 @fullscreen
Depending on the color parameters you selected, our final program should look something like this. We can add our Light Bulb to many different code examples or use it to work with other sensors or inputs found on the BrainPad. 

```block
loops.forever(function () {
    lightbulb.setColor(lightbulb.rgb(255, 0, 0))
    loops.pause(1000)
    lightbulb.clear()
    loops.pause(1000)
})
```