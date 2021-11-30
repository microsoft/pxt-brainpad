```template

enum SpriteKind {

    Player,

    Enemy

}

 

let Jumper: Sprite = null

Jumper = sprites.create(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`, SpriteKind.Player)

```

# Animation

 

## Step 1 @unplugged

We've created sprites but they just sit there. Let's create an animation and add frames to it. To make it more fun!

![BrainPad buzzer image](../static/images/animate.gif)


## Step 2 @fullscreen

We need to set the timing of our animation and create a name for that animation we're going to create. To do this we can need to select the block called ``||animation:set anim to||`` block. Drag it into the ``||loops:on start||`` just under our JUMPER sprite. Rename 'anim' to something like 'running', change the interval to 200ms. This is how fast our animation will change between the frames.

```blocks

enum SpriteKind {

    Player,

    Enemy

}

enum ActionKind {

    Walking,

    Idle,

    Jumping

}

let myAnimation: animation.Animation = null

let Jumper: Sprite = null

Jumper = sprites.create(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`, SpriteKind.Player)

myAnimation = animation.createAnimation(ActionKind.Walking, 200)

```

 

## Step 3 @fullscreen

 

Next, we need to drag in the ``||animation:add frame||`` block. Click on the grey box in the center inside the block. Add the first Jumper image to the ``||animation:add frame||`` block.  Drag in another ``||animation:add frame||`` block followed by the next Jumper image from the gallery. Do this until all 4 Jumper images are created like the blocks below.

 

```blocks

enum SpriteKind {

    Player,

    Enemy

}

enum ActionKind {

    Walking,

    Idle,

    Jumping

}

let myAnimation: animation.Animation = null

let Jumper: Sprite = null

Jumper = sprites.create(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`, SpriteKind.Player)

myAnimation = animation.createAnimation(ActionKind.Walking, 200)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . . 1 1 1 1 . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . . . . 1 1 1 1 1 1 . . .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . 1 1 1 1 1 1 1 1 1 1 1 1

. . . 1 1 1 1 1 1 1 1 1 1 1 . .

. . . 1 1 . . . . . . . . 1 . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . 1 1 1 1 1 . 1 1 1 1 . . .

. . . 1 1 . . . . 1 1 1 . . . .

. . . . . . . . . 1 1 1 1 . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . . . . 1 . . . .

. . . 1 . 1 1 1 1 . 1 . . . . .

. . . . 1 1 1 . 1 1 1 1 1 . . .

. . . . . 1 1 . . 1 1 1 1 . . .

. . . . . 1 1 1 1 . . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 1 .

. . . . 1 1 1 . . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . 1 1 1 1 1 1 1 1 1 1 . . .

. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

. 1 1 1 1 . 1 1 1 1 1 1 1 1 1 1

. 1 1 . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 . . . . . . . 1 . 1 1

. . . 1 1 . 1 1 1 1 1 . . 1 1 1

. . . 1 1 1 1 1 . . . 1 1 1 1 1

. . . 1 1 . . . . . . . . . . .

. . . 1 1 1 1 . . . . . . . . .

`)

 

```

 

## Step 4 @fullscreen

 

In this step we need to attach 'myAnimation' to the 'Jumper' sprite. We can find the ``||animation:attach animation||`` block under 'ANIMATION' once dragged in change the selections to 'myAnimation' and to sprite 'Jumper'

 

```blocks

enum SpriteKind {

    Player,

    Enemy

}

enum ActionKind {

    Walking,

    Idle,

    Jumping

}

let myAnimation: animation.Animation = null

let Jumper: Sprite = null

Jumper = sprites.create(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`, SpriteKind.Player)

myAnimation = animation.createAnimation(ActionKind.Walking, 200)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . . 1 1 1 1 . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . . . . 1 1 1 1 1 1 . . .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . 1 1 1 1 1 1 1 1 1 1 1 1

. . . 1 1 1 1 1 1 1 1 1 1 1 . .

. . . 1 1 . . . . . . . . 1 . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . 1 1 1 1 1 . 1 1 1 1 . . .

. . . 1 1 . . . . 1 1 1 . . . .

. . . . . . . . . 1 1 1 1 . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . . . . 1 . . . .

. . . 1 . 1 1 1 1 . 1 . . . . .

. . . . 1 1 1 . 1 1 1 1 1 . . .

. . . . . 1 1 . . 1 1 1 1 . . .

. . . . . 1 1 1 1 . . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 1 .

. . . . 1 1 1 . . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . 1 1 1 1 1 1 1 1 1 1 . . .

. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

. 1 1 1 1 . 1 1 1 1 1 1 1 1 1 1

. 1 1 . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 . . . . . . . 1 . 1 1

. . . 1 1 . 1 1 1 1 1 . . 1 1 1

. . . 1 1 1 1 1 . . . 1 1 1 1 1

. . . 1 1 . . . . . . . . . . .

. . . 1 1 1 1 . . . . . . . . .

`)

animation.attachAnimation(Jumper, myAnimation)

```

 

## Step 5 @fullscreen

 

Once we've attached the animation to the sprite we just need to activate the animation using the ``||animation:activate animation||`` block. This may seem like an unnecessary step but we can activate different animations from different places in our code. In our sample though we do it all inside the ``||loops:on start||`` block just to show you all the necessary components of animation.

 

```blocks

enum SpriteKind {

    Player,

    Enemy

}

enum ActionKind {

    Walking,

    Idle,

    Jumping

}

let myAnimation: animation.Animation = null

let Jumper: Sprite = null

Jumper = sprites.create(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`, SpriteKind.Player)

myAnimation = animation.createAnimation(ActionKind.Walking, 200)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . 1 1 . . 1 1 1 1 1 . . . .

. . . . 1 1 . 1 1 . 1 . . . . .

. . . . . 1 1 1 . 1 1 1 . . . .

. . . . . 1 1 1 1 1 . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . . 1 1 1 1 . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . . . . 1 1 1 1 1 1 . . .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . . 1 1 1 1 1 1 1 1 1 1 1 1

. . . 1 1 1 1 1 1 1 1 1 1 1 . .

. . . 1 1 . . . . . . . . 1 . .

. . . . 1 1 1 . 1 1 1 . 1 1 . .

. . . 1 1 1 1 1 . 1 1 1 1 . . .

. . . 1 1 . . . . 1 1 1 . . . .

. . . . . . . . . 1 1 1 1 . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . . . . . . . . . . .

. . . . . 1 1 1 1 1 1 . . . . .

. . . . 1 1 1 1 1 1 1 1 1 1 . .

. . . . . . . . 1 1 . 1 . . . .

. . . 1 1 1 . 1 1 1 . 1 1 1 . .

. . . 1 1 1 . . 1 1 1 . 1 1 1 .

. . . 1 1 1 1 1 1 1 . . . 1 . .

. . . . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 1 1 1 1 1 1 . . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 1 1 1 1 1 1 1 . . . .

. . . 1 1 . . . . . . 1 . . . .

. . . 1 . 1 1 1 1 . 1 . . . . .

. . . . 1 1 1 . 1 1 1 1 1 . . .

. . . . . 1 1 . . 1 1 1 1 . . .

. . . . . 1 1 1 1 . . . . . . .

`)

myAnimation.addAnimationFrame(img`

. . . . . . 1 1 1 1 1 1 . . . .

. . . . . 1 1 1 1 1 1 1 1 1 1 .

. . . . . . . . . 1 1 . 1 . . .

. . . . 1 1 1 . 1 1 1 . 1 1 1 .

. . . . 1 1 1 . . 1 1 1 . 1 1 1

. . . . 1 1 1 1 1 1 1 . . . 1 .

. . . . . . 1 1 1 1 1 1 1 1 . .

. . . 1 1 1 1 1 1 1 1 1 1 . . .

. 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

. 1 1 1 1 . 1 1 1 1 1 1 1 1 1 1

. 1 1 . . 1 1 1 1 1 1 1 1 . . .

. . . . 1 . . . . . . . 1 . 1 1

. . . 1 1 . 1 1 1 1 1 . . 1 1 1

. . . 1 1 1 1 1 . . . 1 1 1 1 1

. . . 1 1 . . . . . . . . . . .

. . . 1 1 1 1 . . . . . . . . .

`)

animation.attachAnimation(Jumper, myAnimation)

animation.setAction(Jumper, ActionKind.Walking)

```

 

## Step 6 @fullscreen

 

Congratulations!! You've completed your first animated sprite. Try creating your own animated sprite using as many or few frames as you like. A game can contain many different animations attached to the same sprite. Say for example when standing still, jumping, or ducking, could all be different animations. With each animation attached to the same sprite. When we want to use that animation we just use the ``||animation:activate animation||`` block, say when a button is pressed or not pressed.

 

![BrainPad buzzer image](../static/images/animate.gif)


