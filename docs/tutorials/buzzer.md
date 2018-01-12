# Buzzer Song

## Step 1 @fullscreen

The Brain Pad is equipped with a buzzer that is capable of playing many different notes. It can even be programmed to play a song. 
 
![BrainPad buzzer image](/images/buzzer.jpg)


## Step 2 @fullscreen
In this demo, we only want the song to play once. To do this we'll remove the ``||loops:forever||`` block and replace it with the ``||loops:on Start||`` block.

![Remove Forever block](/images/swapForeverBlockwithOnstart.gif)

## Step 3 @fullscreen

Next we will need to drag our first note into the ``||loops:on Start||`` block. You'll find it under the ``||music:music||`` tab. 

```block
music.playTone(262, music.beat(BeatFraction.Half))
```

## Step 4 @fullscreen
Now, we will change the value of first note in our song. Do this by clicking on the 'Middle C' parameter inside the block. We will change the value to 392 (Middle G) and the beat to 1 whole beat. 

![Changing a note](/images/changeNote.gif)

## Step 5 @fullscreen
Now let's add more notes and play a song. Drag another ``||music:play tone||`` block into the ``||loops:on Start||`` block. This 2nd note in our song we'll set to 440 (Middle A) and the beat to 1 whole beat

![Adding notes](/images/addingNotes.gif)

## Step 6 @fullscreen 
Drag in three more ``||music:play tone||`` blocks, just below our last block. We will change each note in the new blocks. Change to 349(Middle F), 175(Low F) and 262(Middle C), in that order. Set the beat to 1 on all except 262(Middle C) the last note in our song, set this to 2 beats.
 
```block
music.playTone(392, music.beat(BeatFraction.Whole))
music.playTone(440, music.beat(BeatFraction.Whole))
music.playTone(262, music.beat(BeatFraction.Half))
music.playTone(262, music.beat(BeatFraction.Half))
music.playTone(262, music.beat(BeatFraction.Half))
```

## Step 7 @fullscreen 
Your final project should look like this and play the melody once. If you wanted to continuiuosly play the song, you could put it inside a ``||loops:forever||`` block.

![Adding notes](/images/finalSong.jpg)