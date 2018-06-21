# Code

Now we'll use Microsoft MakeCode to program the BrainPad and launch our Helicopter

Open @homeurl@ in your web browser.

## Step 1: Create Button Event
We will use a button to start our program, first drag a ``||input: on button||`` event block into code block area. 

```blocks
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
	
})
```

## Step 2: Create a Variable to Count
First we need to create a ``||variable: variable||``. We'll name it count and set it 10, so we can use this number to countdown from. 

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
})
```

## Step 3: Adding a while-loop
Next, we will need to add a ``||loops: while loop||`` to handle our countdown. 

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (true) {
    	
    }
})
```

## Step 4: Comparison block inside our while-loop
By default the ``||loops: while loop||`` start with it's parameter set to ``||logic: TRUE||``. We will need to drag in a ``||logic: Comparision||``block into our ``||loops: while loop||``

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (0 > 0) {
    	
    }
})
```

## Step 5: Setting the values to compare
Inside the ``||logic: Comparision||``block we need to drag in our ``||variable: count||`` from the side menu into the first parameter of the ``||logic: Comparision||``block. We also have to set our LOGICAL OPERATOR to > or equal. 


```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (count >= 0) {
    	
    }
})
```

## Step 6: Adding a decrementor to our while-loop
Right now our ``||loops: while loop||`` will just continue to loop because we don't decrease the value of our ``||variable: count||`` variable by -1 each time it goes through our loop. We need to add a block that will subtract 1 from count each time we loop. We can accomplish this by draging in ``||variable: change 'count' by||`` block inside the ``||loops: while loop||`` . Finally we have to set it's parameter to -1.

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (count >= 0) {
        count += -1
    }
})
```

## Step 7: Displaying the value of our count variable
Our ``||loops: while loop||`` works but it doesn't do anything. We need to add something in the ``||loops: while loop||`` so we can see the loop working. We do this by adding a ``||display:show number||`` block to show the value of count on the BrainPad display. We need to place the  ``||display:show number||`` block just above our ``||variable: change 'count' by||`` block.

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (count >= 0) {
        display.showNumber(0, 1)
        count += -1
    }
})
```

## Step 8: Slowing down the count
The code within our ``||loops: while loop||`` executes very quickly, so quickly you might not see anything happen. We need to add a ``||loops: pause||`` block to the end our ``||loops: while loop||`` and set it to 500 milliseconds. Now we should see the display in the simulator counting down. 

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    count = 10
    while (count >= 0) {
        display.showNumber(0, 1)
        count += -1
        pause(500)
    }
})
```

## Step 9: Starting our Helicopter Motor
To get our SnapCircuit Helicopter motor to actually work, we need to set the AN pin our BrainPad to HIGH, this will turn on the AN pin and send voltage to the motor. We do this by clicking on the ADVANCED dropdown on the side menu under PINS drag in the ``||pins: digital write pin||`` inside our ``||input: on button||`` block at the very top. This will start the Helicopter motor as soon as the ``||input: Left||`` button is pressed. We also need to change the pin from the default ``||pins: SCL||`` pin to the  ``||pins: AN||``. We also need to set the last parameter to ``||pins: HIGH||``.

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    pins.SCL.digitalWrite(true)
    count = 10
    while (count >= 0) {
        display.showNumber(0, 1)
        count += -1
        pause(500)
    }
})
```

## Step 10: Launching the Helicopter
To launch the Helicopter we have to set our ``||pins: AN||`` pin low after our ``||loops: while loop||`` is finished counting. We do this by dragging in another ``||pins: digital write pin||`` block at the very bottom of our ``||input: on button||`` event. We set it from ``||pins: SCL||`` pin to the ``||pins: AN||``. This time we set last parameter to ``||pins: LOW||``. This will stop the motor and launch our Helicopter into the air. 


```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    pins.SCL.digitalWrite(true)
    count = 10
    while (count >= 0) {
        display.showNumber(0, 1)
        count += -1
        pause(500)
    }
})
```

## Step 11: Spicing up our Project with Sound Effects. 
Finally lets add a couple sound effects to make our project more interesting. Add the following blocks to our code this will add a starting sound and the ``||music: play tone||`` block inside our ``||loops: while loop||`` will make a sound every countdown number. 

```blocks
let count = 0
input.buttonLeft.onEvent(ButtonEvent.Click, function () {
    music.playSound(music.sounds(Sounds.JumpUp))
    pins.SCL.digitalWrite(true)
    count = 10
    while (count >= 0) {
        display.showNumber(0, 1)
        count += -1
        music.playTone(262, music.beat(music.beat(BeatFraction.Half)))
        pause(500)
    }
})
```

## Good work!
Now connect your @boardname@ to your computer's USB port and click **`Download`**.
Follow the instructions to move the code to your @boardname@, press the LEFT button and watch the FUN.