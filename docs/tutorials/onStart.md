# On Start vs Forever Blocks

## Step 1 @fullscreen
In this tutorial we will explain the difference and uses of the ``||loops:onStart||`` and ``||loops:forever||`` blocks

![on Start and forever blocks](/images/onstartCard.jpg)

## Step 2 @fullscreen
The ``||loops:onStart||`` block runs when the Brain Pad is first powered up. Any code placed inside the ``||loops:onStart||`` block runs only once, at the beginning of your program. 


## Step 3 @fullscreen
Let's drag the ``||loops:onStart||`` block from the LOOPS section into our staging area.

![on Start and forever blocks](/images/onstart.gif)
 

## Step 4 @fullscreen
Let's demonstrate how the ``||loops:onStart||`` block works. Let's start by dragging in our ``||lightbulb:setColor||`` block into the ``||loops:onStart||`` block



## Step 5 @fullscreen
Next will add the``||loops:pause||`` block, followed by the ``||lightbulb:clear light bulb||`` block into the ``||loops:onStart||`` block. Just below the first ``||lightbulb:setColor||`` block we just added. 

## Step 6 @fullscreen
If you notice in our simulator, the Light Bulb turns on then off after 1/2 a second. If you missed it happening, refresh the simulator and note the Light Bulb's change. 

## Step 6 @fullscreen
Next will put the exact same blocks inside the ``||loops:forever||`` block. Except will change the LightBulb Color to Blue. 

## Step 7 @fullscreen
If you notice in the simulator, the ``||loops:onStart||`` block runs first. Immediately followed by the ``||loops:forever||`` block, which continues to blink the LED Blue, until we turn off the device. 

## Step 8 @fullscreen
These two very useful blocks serve an important purpose when programming embedded devices. We can use the ``||loops:onStart||`` block to set up things in our program on startup. The program we want to run continuously goes inside the ``||loops:forever||`` block.