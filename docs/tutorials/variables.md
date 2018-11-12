# Creating and Using Variables

## Step 1 @unplugged

A ``||variables:variable||`` is a value that can change depending on conditions or information in our code. In this tutorial, we will create and manipulate the data inside a ``||variables:variable||``.

## Step 2 @fullscreen

Under menu, select ``||variables:VARIABLES||``. Then select ``||variables:Make a Variable...||``
We try to give ``||variables:variables||`` meaningful names that will make the code easier to read. Let's name ours count.  

![on Start and forever blocks](/static/images/variable_menu.jpg)

## Step 3 @fullscreen

After naming our count variable. We now see NEW blocks inside the ``||variables:VARIABLES||`` menu that contain our newly created count variable.

![drag in on start block](/static/images/variable_count.jpg)
 
## Step 4 @fullscreen

We need to set the our new count variable. Drag the ``||variables:set count to||`` block into the ``||loops:onstart||`` block. We can leave the parameter at zero. 

```blocks
let count = 0
count = 0
```

## Step 5 @fullscreen

Next, let's add 1 to our count variable, by dragging in the ``||variables:change count by||`` block. We can leave it's parameter set to 1 
 
```blocks
let count = 0
count = 0
count += 1
```

## Step 6 @fullscreen

1 has now been added to our count variable, but we can't see it anywhere. Let's display it on screen by dragging in a ``||display:show number at line||``block. 

```blocks
let count = 0
count = 0
count += 1
display.showNumber(0, 1)
```
## Step 7 @fullscreen

Our ``||variables:variable||`` won't show on screen until we add it to our ``||display:show number at line||``block. Under the ``||variables:VARIABLES||`` menu select the oval holding our ``||variables:count variable||`` and drag it into ``||display:show number at line||`` block where the first parameter is.

```blocks
let count = 0
count = 0
count += 1
display.showNumber(count, 1)
```

## Step 8 @fullscreen

You may have noticed the ``||display:display||`` just shows one. This is lot of code just to show the number 1 on screen. Right? Next we'll demonstrate the real benefit of using variables. 

```blocks
let count = 0
count = 0
count += 1
display.showNumber(count, 1)
```

## Step 9 @fullscreen

Drag the ``||variables:change count by||`` block and the ``||display:show number at line||`` block into the ``||loops:forever||`` block. What number or numbers now show on the ``||display:display||``? Now we see the real power of variables. 

```blocks
let count = 0
count = 0
forever(function () {
    count += 1
    display.showNumber(count, 1)
})
```

## Step 10 @fullscreen

As you can see the count increased by 1 and continues to count up on the ``||display:display||``. This is because the ``||variables: change count by||`` block is now inside the ``||loops:forever||`` block. Finally try changing the ``||variables:change count by||`` 5. What happens now?

```blocks
let count = 0
count = 0
forever(function () {
    count += 5
    display.showNumber(count, 1)
})
```

## Step 11 @fullscreen

In this quick lesson we learned that ``||variables:variables||`` can be set, changed and used inside of code. ``||variables:Variables||`` are an import tool in the programmers tool kit for manipulating and managing data. 





