# Using Buttons

## Step 1 @unplugged

The BrainPad is equipt with four directional buttons (up, down, left and right) that we can program. In this tutorial we'll use the BrainPad buttons to play a four note song.

![BrainPad buzzer image](/static/images/buttons.jpg)

## Step 2 @unplugged

We use buttons every day to communicate with electronic devices all around us. Even the keyboard on your computer is made up of buttons. 

![BrainPad buzzer image](/static/images/keys.jpg)

## Step 3 @fullscreen

First we need to grab an ``||input:on button||`` event block from the side menu under  ``||input:INPUT||``. 

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
	
})
```

## Step 4 @fullscreen

Since ``||input:Left||`` is the default parameter of our ``||input:on button||`` event block, we will start programming it. Drag in a ``||music:play tone at||`` block, found under the ``||music:MUSIC||`` tab. Change the default parameter of the block to 440(Middle A) note.  
 
```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440, music.beat(BeatFraction.Half))
})
```

## Step 5 @fullscreen

Each Button has it's own ``||input:on button||`` event block, so let's drag the next ``||input:on button||`` event in to our program. We need to set the parameter for this event to use the ``||input:Up||`` button. 

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440,  music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
	
})
```

## Step 6 @fullscreen

Next add a ``||music:play tone at||`` block to this ``||input:on button||`` event block. Set the paramater of this block to 392(Middle G) note.

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440,  music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
    music.playTone(392,  music.beat(BeatFraction.Half))
})
```

## Step 7 @fullscreen

Let's add another ``||input:on button||`` event block to our program, set this blocks parameter to use the ``||input:Right||`` button. 

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440,  music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
    music.playTone(392, music.beat(BeatFraction.Half))
})
input.buttonRight.onEvent(ButtonEvent.Click, function () {
	
})
```

## Step 8 @fullscreen

Add a ``||music:play tone at||`` block to this ``||input:on button||`` event block. Set the note to 349(Middle F) note.

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440, music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
    music.playTone(392,  music.beat(BeatFraction.Half))
})
input.buttonRight.onEvent(ButtonEvent.Click, function () {
    music.playTone(349,  music.beat(BeatFraction.Half))
})
```

## Step 9 @fullscreen

Add the last ``||input:on button||`` event block to our program, set this blocks parameter to use the ``||input:Down||`` button. 

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440, music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
    music.playTone(392,  music.beat(BeatFraction.Half))
})
input.buttonRight.onEvent(ButtonEvent.Click, function () {
    music.playTone(349, music.beat(BeatFraction.Half))
})
input.buttonDown.onEvent(ButtonEvent.Click, function () {
	
})
```

## Step 10 @fullscreen

Finally add a ``||music:play tone at||`` block to the last ``||input:on button||`` event block. Set this note to 523(High C) note.

```blocks
input.buttonDown.onEvent(ButtonEvent.Click, function () {
    music.playTone(523,  music.beat(BeatFraction.Half))
})
```

## Step 11 @fullscreen

Your final program should look like this. Let's play a song using those four buttons.  

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playTone(440,  music.beat(BeatFraction.Half))
})
input.buttonUp.onEvent(ButtonEvent.Click, function () {
    music.playTone(392, music.beat(BeatFraction.Half))
})
input.buttonRight.onEvent(ButtonEvent.Click, function () {
    music.playTone(349,  music.beat(BeatFraction.Half))
})
input.buttonDown.onEvent(ButtonEvent.Click, function () {
    music.playTone(523,  music.beat(BeatFraction.Half))
})
```

## Step 12 @fullscreen

Now let's play a simple song using the BrainPad buttons. 
![BrainPad buzzer image](/static/images/song.jpg)