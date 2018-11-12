# Display

## Step 1 @unplugged

The BrainPad has an onboard display capable of displaying images, shapes, and text. In this tutorial, we will display several images in a simple animation of a character walking. 

![BrainPad buzzer image](/static/images/display.jpg)

## Step 2 @unplugged

Since we're creating an animation, we will want our images to keep playing in a loop, so we'll use the  ``||loops:forever||`` loop already in our project. 

```blocks
loops.forever(function () {
    
})
```
## Step 3 @unplugged

Let's drag in our first image. We can accomplish this by adding a ``||display:show image||`` block. The Butterfly is the default image.

```blocks
forever(function () {
    display.showImage(images.butterfly1)
})
```

## Step 4 @fullscreen

To make our character animate, we have to select the first image frame of the animation. Click on the Butterfly image and change it to the 'walker1' image.

![BrainPad buzzer image](/static/images/selectframe1.jpg)

## Step 5 @fullscreen

Next, let's add the 2nd frame of our animation. Drag in a second ``||display:show image||`` block. Change this one's image to the 'walker2' image. 

![BrainPad buzzer image](/static/images/selectframe2.jpg)

## Step 6 @fullscreen

Drag in a third ``||display:show image||`` block. Change this one's image to the 'walker3' image. 

When we add the third frame of our animation. You'll notice in the simulator, our character is starting to move more naturally 

![BrainPad buzzer image](/static/images/animation.gif)

## Step 7 @fullscreen

Finally, we need to add the last frame of our animation, which when complete loops back to the first image in our code, and completes the animation process. In future tutorials we'll use the BrainPad's inputs to control a simple animation. 

```blocks
forever(function () {
    display.showImage(images.walker1)
    display.showImage(images.walker2)
    display.showImage(images.walker3)
    display.showImage(images.walker4)
})
```

