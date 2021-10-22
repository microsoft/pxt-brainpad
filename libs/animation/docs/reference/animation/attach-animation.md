# attach Animation

Attach an animation to a sprite.

```sig
animation.attachAnimation(null, null)
```

An animation must attach to a sprite before it can activate. The animation plays inside the image area of the sprite. When a sprite moves, the animation moves with the sprite and shows wherever the sprite is at.

You can attach several animations to a sprite. Only one is active and at a time when its [action](/reference/animation/set-action) is set on the sprite.

## Example #example

Create an walking aninamtion with four frames.

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
let anim: animation.Animation = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
anim = animation.createAnimation(ActionKind.Walking, 1000)
anim.addAnimationFrame(img`
d d d d d d f f f f d d d d d d 
d d d d f f f 2 2 f f f d d d d 
d d d f f f 2 2 2 2 f f f d d d 
d d f f f e e e e e e f f f d d 
d d f f e 2 2 2 2 2 2 e e f d d 
d d f e 2 f f f f f f 2 e f d d 
d d f f f f e e e e f f f f d d 
d f f e f b f 4 4 f b f e f f d 
d f e e 4 1 f d d f 1 4 e e f d 
d d f e e d d d d d d e e f d d 
d d d f e e 4 4 4 4 e e f d d d 
d d e 4 f 2 2 2 2 2 2 f 4 e d d 
d d 4 d f 2 2 2 2 2 2 f d 4 d d 
d d 4 4 f 4 4 5 5 4 4 f 4 4 d d 
d d d d d f f f f f f d d d d d 
d d d d d f f d d f f d d d d d 
`)
anim.addAnimationFrame(img`
d d d d d d d d d d d d d d d d 
d d d d d d f f f f d d d d d d 
d d d d f f f 2 2 f f f d d d d 
d d d f f f 2 2 2 2 f f f d d d 
d d f f f e e e e e e f f f d d 
d d f f e 2 2 2 2 2 2 e e f d d 
d f f e 2 f f f f f f 2 e f f d 
d f f f f f e e e e f f f f f d 
d d f e f b f 4 4 f b f e f d d 
d d f e 4 1 f d d f 1 4 e f d d 
d d d f e 4 d d d d 4 e f e d d 
d d f e f 2 2 2 2 e d d 4 e d d 
d d e 4 f 2 2 2 2 e d d e d d d 
d d d d f 4 4 5 5 f e e d d d d 
d d d d f f f f f f f d d d d d 
d d d d f f f d d d d d d d d d 
`)
anim.addAnimationFrame(img`
d d d d d d f f f f d d d d d d 
d d d d f f f 2 2 f f f d d d d 
d d d f f f 2 2 2 2 f f f d d d 
d d f f f e e e e e e f f f d d 
d d f f e 2 2 2 2 2 2 e e f d d 
d d f e 2 f f f f f f 2 e f d d 
d d f f f f e e e e f f f f d d 
d f f e f b f 4 4 f b f e f f d 
d f e e 4 1 f d d f 1 4 e e f d 
d d f e e d d d d d d e e f d d 
d d d f e e 4 4 4 4 e e f d d d 
d d e 4 f 2 2 2 2 2 2 f 4 e d d 
d d 4 d f 2 2 2 2 2 2 f d 4 d d 
d d 4 4 f 4 4 5 5 4 4 f 4 4 d d 
d d d d d f f f f f f d d d d d 
d d d d d f f d d f f d d d d d 
`)
anim.addAnimationFrame(img`
d d d d d d d d d d d d d d d d 
d d d d d d f f f f d d d d d d 
d d d d f f f 2 2 f f f d d d d 
d d d f f f 2 2 2 2 f f f d d d 
d d f f f e e e e e e f f f d d 
d d f e e 2 2 2 2 2 2 e f f d d 
d f f e 2 f f f f f f 2 e f f d 
d f f f f f e e e e f f f f f d 
d d f e f b f 4 4 f b f e f d d 
d d f e 4 1 f d d f 1 4 e f d d 
d d e f e 4 d d d d 4 e f d d d 
d d e 4 d d e 2 2 2 2 f e f d d 
d d d e d d e 2 2 2 2 f 4 e d d 
d d d d e e f 5 5 4 4 f d d d d 
d d d d d f f f f f f f d d d d 
d d d d d d d d d f f f d d d d 
`)
animation.attachAnimation(mySprite, anim)
animation.setAction(mySprite, ActionKind.Walking)
```

## See also #seealso

[create animation](/reference/animation/add-animation-frame),
[add animation frame](/reference/animation/add-animation-frame),
[set-action](/reference/animation/set-action)

```package
animation
```
