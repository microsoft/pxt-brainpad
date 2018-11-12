# Buzzer Song

## Step 1 @unplugged

The BrainPad is equipped with a buzzer that is capable of playing many different notes. It can even be programmed to play a song. We will use it make a simple 5 note melody, that's out of this world. 
 
![BrainPad buzzer image](/static/images/buzzer.jpg)

## Step 2 @fullscreen

We only want the song to play once. To do this we remove the ``||loops:forever||`` block and replace it with an ``||loops:on Start||`` block. It's located under the ``||loops:LOOPS||`` menu. You can DRAG the ``||loops:forever||`` block towards the side MENU to delete it. 

```blocks
loops.forever(function () {
    
})
```

## Step 3 @fullscreen

Next we will need to drag our first note into the ``||loops:on Start||`` block. You'll find it under the ``||music:music||`` tab. 

```blocks
music.playTone(262, music.beat(BeatFraction.Half))
```

## Step 4 @fullscreen
 
Change the parameters of the note, by clicking on the value inside the ``||music:play tone at||`` block. Change, by entering a new value or playing a note on the virtual keyboard that appears. We will change the value to 392(Middle G) and the beat to 1.

```blocks
music.playTone(392, music.beat(BeatFraction.Whole))
```

## Step 5 @fullscreen

Now let's add more notes to our song. Drag another ``||music:play tone at||`` block into the ``||loops:on start||`` block. This 2nd note in our song we'll set to 440(Middle A) and the beat to 1.
 
```blocks
music.playTone(392, music.beat(BeatFraction.Whole))
music.playTone(440, music.beat(BeatFraction.Whole))
```

## Step 6 @fullscreen
 
It's still not quite a melody, we need to add more notes. Just below the last ``||music:play tone at||`` block, drag another ``||music:play tone at||`` block in. This one we'll set to 349(Middle F) and the beat to 1/2 this time.

```blocks
music.playTone(392, music.beat(BeatFraction.Whole))
music.playTone(440, music.beat(BeatFraction.Whole))
music.playTone(349, music.beat(BeatFraction.Half))
```

## Step 7 @fullscreen
 
We still have more notes to add drag another ``||music:play tone at||`` block in. Set it to 175(Low F), set the beat to 1/2 too.

```blocks
music.playTone(392, music.beat(BeatFraction.Whole))
music.playTone(440, music.beat(BeatFraction.Whole))
music.playTone(349, music.beat(BeatFraction.Half))
music.playTone(175, music.beat(BeatFraction.Half))
```

## Step 8 @fullscreen
 
Finally we will add one last note to our song. Drag one more ``||music:play tone at||`` block in. Set it to 262(Middle C), set the beat to 2. See if you can find someone that recognizes the melody, like a parent or teacher.

```blocks
music.playTone(392, music.beat(BeatFraction.Whole))
music.playTone(440, music.beat(BeatFraction.Whole))
music.playTone(349, music.beat(BeatFraction.Half))
music.playTone(175, music.beat(BeatFraction.Half))
music.playTone(262, music.beat(BeatFraction.Double))
```

