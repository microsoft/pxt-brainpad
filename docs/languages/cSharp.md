# Introduction to C# on the BrainPad 
It is not a secret that C and C++ are the most popular programming languages among professionals. This is particularly true for programmers that work with small digital systems.

C# (pronounced see-sharp) and a modern cousin of the C and C++ family. Its syntax is very close to Java, another very popular programming language.

---

## Overview
Students will learn how to create projects in Visual Studio along with programming logic. Applications in this lesson will be limited to the `BrainPad` object, `If` statements, a `While` loop and the template methods.

## Install Visual Studio and TinyCLR OS extension
Skip this step if you have Visual Studio 2017 and the TinyCLR OS extension installed:

[Setting Up Visual Studio for the BrainPad](/static/cp/languages/setup_visual_studio.md)

## Guidelines 
* Prerequisites: None
* Ages 6 and up
* PC setup with Visual Studio 2017 and TinyCLR OS extension installed. [Click Here](/static/cp/languages/setup_visual_studio.md)
* Supplies: BrainPad and microUSB cable.

## Starting a New C# BrainPad Project
Next Open Visual Studio select `File > New > Project` and under Other Languages select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Change the Location to  `C:\Users\<YourUsername>\Desktop\` then name the project `BrainPad_Project`.


From Visual Studio, select File > New > Project:

![Start New Visual C# Project](/static/cp/languages/start_new_visual_csharp_project.jpg) 

Once created, you'll be presented with a `Program.cs` tab.

![Program Contents Shown](/static/cp/languages/program_contents_shown.jpg)  

This file contains the default code when you first create a project. The lines in green that begin with ``//`` are called comments, and they generally describe what the code does. Take a moment to review them. You can create your own comments in the code by typing ``//`` before any notes you like to add. Comments don't affect how your program runs. 

Comments are a great place to keep notes about how a piece of code might work. They are helpful if another programmer looks at your code, or you return to look at your own code at a later date, to help you understand what the code is doing behind the scenes. 

Let's run the code to see these comments' descriptions come to life. Connect the BrainPad and press the `F5` function key or the Start button in Visual Studio's toolbar.

![F5 Key and Start Button](/static/cp/languages/start_key_button.jpg)

Visual Studio will now run the code, a few things will happen and the display will now have the text `"Hello!"`.

![Using IntellSense LightBulb](/static/cp/languages/display_hello.jpg)

## The BrainPad Object
The world around us is full of objects. Every person, table or circuit board is an object. If we were to ask a person to say "hello," we'd be asking an object to perform a task. The same concept can be applied to code, specifically object-oriented programming. Like in the previous application we ran, the BrainPad was asked to control the `Display` through the `BrainPad` object.

The `BrainPad` object itself, is a piece of code that is contained in one file. This was developed by GHI Electronics to cover the internals of the BrainPad. This enables students like you, with an easy way to control the BrainPad circuit board.

After typing `BrainPad`, press the period key to get a list of all available options for this object, like LightBulb. As shown in the image below.

![Using IntelliSense](/static/cp/languages/using_intellisense.jpg)

Now we can use the arrow keys to go up and down in the list to find the LightBulb, and then press the period key again to see what options are the available for the LightBulb.

![Using IntelliSense with the LightBulb](/static/cp/languages/using_intellsense_lightbulb.jpg)

Visual Studio does a great deal of simplifying the programming process by automatically listing available options for an object. They call this neat option built into Visual Studio, _IntelliSense_
Now that we know how to use the `BrainPad` object, let's learn about controlling the `LightBulb`.

## The BrainPad LightBulb
LED lights are used in many different electronic devices. Here we will test the *LightBulb* by turning it green, then on, then off. 
Copy and paste the code from the example below into your project's `BrainPadSetup()`, between its two curly braces ``{ }``. You'll also notice every line of code **must** ends with a semicolon `;`

> [!Tip]
> Parentheses `( )` and curly braces `{ }` are used differently in C# programming, do not confuse them?


```
BrainPad.LightBulb.TurnOff();
BrainPad.LightBulb.TurnGreen();
BrainPad.LightBulb.TurnOff();
BrainPad.LightBulb.TurnGreen();
```
Now, press `F5` on the keyboard or the `Start` button in Visual Studio to run the code and you'll see the *LightBulb* turn green come on and stay on. 

This happens because our code is executed faster than we can see. So we never see the *LightBulb* actually blink.

## Problem Solving
Since applications execute extremely fast, we need to slow them down to figure out the problem. This way we can see what is happening or if the results are as expected. We will start by running the code one line at a time, this is called stepping in code to see what the application does at a slow speed.

## Stepping in Code
With Visual Studio we can "step" through the code executing each line separately one at a time. 
This will help when you're trying to debug a problem. To do this we need to add what is called a **breakpoint** or (stop point).

A breakpoint is a spot in your program where the code will execute until it reaches the breakpoint, then Visual Studio will wait for further instructions. 
 
To add a breakpoint at the first line of code inside of `BrainPadSetup()` moving the cursor to that line and pressing the `F9` key as shown below. A red circle will appear to the left of your code. This is where your code will stop and wait. 

You can also click in the grey area where the breakpoints appear to either remove or create new breakpoints. Your program can have as many breakpoints as you feel necessary to diagnose any programming issues. 

![Adding a Breakpoint](/static/cp/languages/adding_breakpoint.jpg)

Press `F5` key or `Start` button in Visual Studio to run the application. The project will be built and deployed but then the execution will stop at the breakpoint as shown below.

![Stopping at the Breakpoint](/static/cp/languages/stop_breakpoint.jpg)

Once a program reaches a breakpoint it pauses the program, right where it is in the code,
as noted by the yellow arrow now in the red circle. You have several options to continue or step through you code line by line, while the program is still running. 

If you press the `Continue` button in the top tool bar of Visual Studio as shown below. Your program will continue, to the end of the code or the next breakpoint.

  ![Stopping at the Breakpoint](/static/cp/languages/continue_button.jpg) 

To the right of the `Continue` button are more buttons for navigating the code while the program is running. Unlike the `Continue` button, the `Step Into` button or `F11` key advances your program one line of code at a time. This can be very useful when trying to diagnose programming errors.

  ![Stepping into code](/static/cp/languages/stepping_into.jpg) 



## Adding Delays to Code
In order to see what's going on we need to add some delays in the program code. This is done by telling the BrainPad to `Wait` between tasks.
Copy and paste the code from below into your project's `BrainPadSetup()`, between the two curly braces `{ }`. 

```
BrainPad.LightBulb.TurnOff();
BrainPad.Wait.Seconds(1);
BrainPad.LightBulb.TurnGreen();
BrainPad.Wait.Seconds(1);
BrainPad.LightBulb.TurnOff();
BrainPad.Wait.Seconds(1);
BrainPad.LightBulb.TurnGreen();
```
Run the code by pressing `F5` key or `Start` button in Visual Studo and observe the LightBulb again. You should now see it turn green, then on and off twice.

## Change the LightBulb Color
This works great if you only want the LightBulb green. But what if you want a different color?   The LED inside the LightBulb is capable of showing more colors than just green. LED TV's use many tiny LEDS lined up in rows and columns to make up the picture you see. Like the LED lights in a TV they are capable of showing many different colors inside just one LED.  First let's use code similar to the last example, only this time will change the LightBulb from green to red to blue, using built-in methods already created.  
Copy and paste the code from below into your project's `BrainPadSetup()`, between the two curly braces `{ }`. 

```
BrainPad.LightBulb.TurnOff();
BrainPad.LightBulb.TurnGreen();
BrainPad.Wait.Seconds(1);
BrainPad.LightBulb.TurnOff();
BrainPad.LightBulb.TurnRed();
BrainPad.Wait.Seconds(1);
BrainPad.LightBulb.TurnOff();
BrainPad.LightBulb.TurnBlue();
BrainPad.Wait.Seconds(1);
```

## Even more LightBulb Colors.
Under the `BrainPad.LightBulb object` you'll find the method `BrainPad.LightBulb.TurnColor()`.   The `TurnColor(r,g,b)` method takes three arguments which describe the color of the light bulb. The first argument tells the light bulb how much red to use, the second how much green, and the third how much blue. Each number is a percentage, or a number from 0 to 100 with 0 being off and 100 being full brightness.
```
BrainPad.LightBulb.TurnColor(100, 100, 100);
```
We'll now redo the code above that turns the light from Green to Red to Blue. But this time we'll use the `TurnColor()` method to achieve the exact same results. 

Copy and paste the code from below into your project's `BrainPadSetup()`, between the two curly braces `{ }`. 

```
BrainPad.Display.DrawTextAndShowOnScreen(45, 0, "Red");
BrainPad.LightBulb.TurnColor(1, 0, 0);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(35, 8, "Green");
BrainPad.LightBulb.TurnColor(0, 2, 0);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(40, 16, "Blue");
BrainPad.LightBulb.TurnColor(0, 0, 5);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(29, 24, "Yellow");
BrainPad.LightBulb.TurnColor(10, 10, 0);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(41, 32, "Cyan");
BrainPad.LightBulb.TurnColor(0, 20, 20);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(25, 40, "Magenta");
BrainPad.LightBulb.TurnColor(50, 0, 50);
BrainPad.Wait.Seconds(2);

BrainPad.Display.DrawTextAndShowOnScreen(37, 48, "White");
BrainPad.LightBulb.TurnColor(100, 100, 100);
BrainPad.Wait.Seconds(2);
```

## BrainPad Buzzer
Included on your BrainPad is a **Buzzer**. You can use this Buzzer to program different sounds you'd like to use in your program.  Like the `BrainPad.LightBulb` object, you'll also have to tell the `Buzzer` object to `Beep`, `StartBuzzing` and `StopBuzzing`. Will also tell the BrainPad to `Wait` in between playing and not playing as sound. When you tell the BrainPad to `Wait`, the sound will play for that duration.

Copy and paste the following code into your `BrainPadSetUp()` between the curly braces `{}`. Press `F5` key or `Start` button in Visual Studio.
```
 BrainPad.Buzzer.StartBuzzing(100);
 BrainPad.Wait.Seconds(1);
 BrainPad.Buzzer.StopBuzzing();
```
You should hear a very low tone, that plays for one(1) second and stops. 

Inside the `BrainPad.Buzzer.StartBuzzing(100)` method you'll see that in the code we've added the value of 100. This is the frequency of the sound that will be played by the Buzzer. You can change this value to create a bunch of different sounds. Let's try changing it.

Copy and paste the following code into your `BrainPadSetUp()` between the curly braces `{}`. Press `F5` on the keyboard or `Start` on the Visual Studio toolbar.
```
BrainPad.Buzzer.StartBuzzing(400);
BrainPad.Wait.Seconds(1);
BrainPad.Buzzer.StartBuzzing(100);
BrainPad.Wait.Seconds(1);
BrainPad.Buzzer.StopBuzzing();
```
First you'll hear the Buzzer make a very high sound, then a very low sound. This is what changing the frequency does to the Buzzer. 

Try changing the frequency to different values and see what kind of sounds the Buzzer makes. 

## BrainPad Buttons
![Buttons on the BrainPad](/static/cp/languages/buttons_.jpg)

The BrainPad comes with four buttons (Up, Down, Left & Right) that can be programmed to do different things. Such as when a button is pressed the LightBulb turns on or the Buzzer makes a sound.  

To accomplish this we need to use what is called an "if statement"

An "if statement" will check and see if our buttons are being pressed and then execute a piece of code when they are. 

## If Statement
```
if (condition) {
   Execute this code;
}
else {
   Execute this code;
}
 ```
An if statement (or conditional statement) checks to see if a statement is true or false and then does one of two things depending on the result. The example above shows the framework of the if statement. 

You'll also notice that the if statement is one of the few lines of code that **DOES NOT** require a semicolon `;` at the end of the line. Although the code within the if statement still require an ending semicolon `;`

Now we'll use the same structure in our code to detect the LEFT button being pressed. 
```
public void BrainPadSetup() {

     BrainPad.LightBulb.TurnOff();

     if (BrainPad.Buttons.IsLeftPressed()) {
         BrainPad.LightBulb.TurnGreen();
     }
}

public void BrainPadLoop() {   
}
```
For the above code to work properly, you have to be holding the button down at the time the program starts. This is because the code within the `BrainPadSetup()` method only executes once. When the program is first started. Holding down the Left button when the program starts is impractical and not very useful to a program. We need to be able to press & read the button anytime the program is running. To do this we will move the button checking "if statement" inside the `BrainPadLoop()` method instead of the `BrainPadSetup()`
```
public void BrainPadSetup() {
      BrainPad.LightBulb.TurnOff();
}
         
public void BrainPadLoop() {
     if (BrainPad.Buttons.IsLeftPressed()) {
         BrainPad.LightBulb.TurnGreen();
     }
}
```
The above code first makes sure the Light Bulb is OFF and then it falls into an infinite loop, called the `BrainpadLoop()`. However, this program still has an operational bug. Run the program and test it. The green light will be off when the program runs and then once the LEFT button is pressed the green light will turn on. That is all good so far, but when the button is released, the green light stays on. Can you guess why? Try stepping in the code to see what happens when the button is pressed and when it is not pressed.

Computers are strict at following orders. In the previous examples, the Light Bulb never turned off because we actually never told the program to turn the green light off. This means we have to tell the program to turn the light on when the button is pressed and we also have to tell it to turn the light off when the button is not pressed

```
public void BrainPadSetup() {
    BrainPad.LightBulb.TurnOff();
}
         
public void BrainPadLoop() {
    if (BrainPad.Buttons.IsLeftPressed()) {
        BrainPad.LightBulb.TurnGreen();
    }

    if (!BrainPad.Buttons.IsLeftPressed()) {
        BrainPad.LightBulb.TurnOff();
    }
}
```
The `!` symbol represents the opposite. While the BrainPad doesn't have a method called `BrainPad.Button.IsLeftNotPressed()` we can continue to use `BrainPad.Button.IsLeftPressed()` but with a `!` before it, to represent if the button is not pressed.  Now when you run it, not pressing the button will turn/keep the *LightBulb* off.

## Logical Operators -- Or & And -- || and &&
![Keyboard Location ](/static/cp/languages/or_and_keys.jpg)

The **Or** operator is found by holding the shift key and pressing the `||` key  twice, the **And** operator can be found by holding the shift key and pressing `&&` twice

These are typically used within the **if statement**. Let's assume in our previous example you wanted to press the *Left* button to make the *LightBulb* Green and when you press the *Right* button you want to make the *LightBulb* Red. If neither button is pressed the *LightBulb* is off. 
To accomplish this you'll need to use the **And** operator `&&` to check and make sure both buttons are **Not** (!) pressed, and turn off the *LightBulb*. 
In the code example below, in our third **if statement**, you can see where we ask the question, "Is the *Right* button pressed **And** is the *Left* button pressed?" 
Both of these condition must be met in order to execute the code in its curly braces`{ }`. When using the **Or** operator `||`, only one of the conditions need to be met to run the code within the curly braces `{}`. 
```
public void BrainPadSetup() {
    BrainPad.LightBulb.TurnOff();
}
         
public void BrainPadLoop() {
    if (BrainPad.Buttons.IsLeftPressed()) {
        BrainPad.LightBulb.TurnGreen();
    }

    if (BrainPad.Buttons.IsRightPressed()) {
        BrainPad.LightBulb.TurnRed();
    }

    if (!BrainPad.Buttons.IsLeftPressed() && !BrainPad.Buttons.IsRightPressed()) {
        BrainPad.LightBulb.TurnOff();
    }
}
```

## The Else Statement
The **else statement** is always used with the **if statement** and has a very useful purpose that would be perfect for the last example. In the previous code example, we needed to check if the *Left* button was being pressed or not. We can simplify this by catching when an **if statement** isn't true using **else** as shown in the code below.
```
public void BrainPadSetup() {
    BrainPad.LightBulb.TurnOff();
}
         
public void BrainPadLoop() {
    if (BrainPad.Buttons.IsLeftPressed()) {
     BrainPad.LightBulb.TurnGreen(); // If TRUE    
    }

    else {
      BrainPad.LightBulb.TurnOff(); // Else FALSE

    }
}
```

## The Else-If Statement
The **else-if statement** closely resembles the **else statement** but works like both an **if statement** and an **else statement** together. Unlike the **else statement** by itself, the **else-if statement** checks to make sure its condition is true before executing the code inside it's curly braces `{}` rather then just executing it by default. 

An example of the similar code as earlier but using an "else-if statement" instead.
```
public void BrainPadSetup() {
     BrainPad.LightBulb.TurnOff();
}

public void BrainPadLoop() {
    if (BrainPad.Buttons.IsLeftPressed()) {
        BrainPad.LightBulb.TurnGreen();
    }

    else if (BrainPad.Buttons.IsRightPressed()) {
             BrainPad.LightBulb.TurnRed();
    }
    else {
        BrainPad.LightBulb.TurnOff();
    }
}
```

## Whitespace
Spaces and lines are used to make our code more readable to humans. C# programs completely ignore **whitespace** as shown in the code example below. It will execute correctly, but without whitespace it can be very difficult to read and debug. 
``` 
public void BrainPadSetup(){BrainPad.TrafficLight.TurnGreenLightOff();}public void BrainPadLoop(){if (BrainPad.Button.IsUpPressed() && BrainPad.Button.IsDownPressed()){BrainPad.Buzzer.PlayFrequency(5000);}else{BrainPad.Buzzer.Stop();}} 
```

# Threading and Events

## Methods
The `BrainPad` object (or class) includes methods to control many aspects of the BrainPad's hardware. A method is a set of instructions grouped together. If a student is asked to speak, the command may look like `Student.Say("Hello")`. The `Say()` method is simple, but speaking requires many things like taking in air and moving your vocal cords. In the same sense, activating the LightBulb and Turning it green is a simple request but internally it does many small tasks to reach the final goal.
Methods can also take arguments. For example, you could have a method called `Student.Run()` to order a student to run or `Student.Run(slow)` to order them to run slow. Methods can also return a value, like `Student.GetAge()` which returns the student's age.

In the code example below, we show how a method we create called `Add` can be used to add 5 + 2 and print the total integer to the Output window. We've also added an additional line to display the result on the BrainPad's own display too. 
```
public class Program {
    public void BrainPadSetup() {
        int total = Add(5, 2);
        BrainPad.WriteToComputer(total);
        BrainPad.Display.DrawNumberAndShowOnScreen(1, 1, total);
    }

    public void BrainPadLoop() {
        // Declared but not used
    }

    public int Add(int a, int b) {
        return a + b;
    }
}
```
The above example creates a simple method that takes two integer arguments and returns an integer. The method will add the two arguments and return the results. 

Method names are like variable names, only certain things are allowed. Method names cannot start with a number, contain a symbol besides the underscore "_" or have a space in them.
The following examples show proper and improper use of method names.

Valid Method Names
```
bool AreAll4ButtonsPressed()
string Add(int a, int b)
```
Poorly named Methods
```
bool areallbuttonspressed()
int method34from94handler()
```
Note: Method names should always be easy to read and meaningful. This allows a programmer to easily discern what it does.

Invalid Method Names
```
bool Are All Buttons Pressed()
bool AreAllButtonsPressed?()
```
Methods are not required to return anything. To fill that case of not returning a value the keyword void is used.
```
void ActivateAlarm()
```
Finally, methods can also be private or public and static or non-static. This is beyond the scope of this course and `public static` will always be used.

## Overloading Methods
The same method name can have one or more argument types. Depending on the argument passed to the method, the system will determine which method to call as shown in in the code sample below we create a method called `Test` which can handle both an integer or a double. 

```
public class Program {
    public void BrainPadSetup() {
        Test(5);
        Test(5.0);
    }

    public void BrainPadLoop() {
        // Declared but not used
    }

    public void Test(int x) {
        BrainPad.WriteToComputer("integer");
        BrainPad.Display.DrawSmallText(1,1,"integer");
        BrainPad.Display.ShowOnScreen();
    }

    public void Test(double x) {
        BrainPad.WriteToComputer("double");
        BrainPad.Display.DrawSmallText(1, 20, "double");
        BrainPad.Display.ShowOnScreen();
    }
}
```
In the code above, you'll notice in the `BrainPadSetup()` we use the `Test()` method twice, once with a integer`(5)` and then with a double`(5.0)`. When the `Test()` method is called the computer determines what the data type is and routes to the appropriate method. This is what is meant by overloading a method. 

## Boolean Variables
In programming we use `true` or `false` to represent the truth values of logic. These values are known as `Boolean` or `bool` when coding. For example, let's say we need to check if the up and down buttons are pressed in multiple spots throughout our program. We could check each button in each spot or we could create a reusable method that returns true if both are pressed or false otherwise, as shown in the code examples below. 
```
public class Program {
    public void BrainPadSetup() {
        // Declared but not used
    }

    public void BrainPadLoop() {
        if (UpAndDownPressed()) {
            BrainPad.LightBulb.TurnGreen();
        }
        else {
            rainPad.LightBulb.TurnOff();
        }
    }

    public bool UpAndDownPressed() {
        if (BrainPad.Buttons.IsUpPressed() && BrainPad.Buttons.IsDownPressed()) {
            return true;
        }
        else {
            return false;
       }
    }
}
```
## The new Keyword
In the examples used so far, the BrainPad object has been used directly. This will not work for all object types. Remember the `Student.Say("Hello")` example? This statement is not completely valid because we don't know which student is going to say "Hello". To access a specific student, you need to create a variable named `mike` to hold the Student object as shown in the code sample below.
```
Student mike = new Student();
```
## Threading
Threading in the programming world is a way to describe multitasking. Each task is a thread that runs separately. The threading support in TinyCLR OS on the BrainPad is easy to work with. 

First, we need to inform the system that the threading library needs to be imported. We do this by adding the code below to the very top of our program, where other libraries are also imported. Like the `using GHIElectronics.TinyCLR.BrainPad;` library,  that allows us to program using the `BrainPad` object.
```
using System.Threading;
```
Before adding a thread, we need a method for it to use as shown in the code below. 
```
public class Program {
    public void BrainPadSetup() {
        Thread blinkerThread = new Thread(Blinker);
        blinkerThread.Start();

        while (true) {
            BrainPad.LightBulb.TurnRed();
            BrainPad.Wait.Seconds(0.1);
            BrainPad.LightBulb.TurnOff();
            BrainPad.Wait.Seconds(1);
        }
    }

    public void BrainPadLoop() {
        // Declared but not used
    }

    public void Blinker() {
        while (true) {
            BrainPad.LightBulb.TurnGreen();
            BrainPad.Wait.Seconds(0.2);
            BrainPad.LightBulb.TurnOff();
            BrainPad.Wait.Seconds(0.2);
        }
    }
}
```
The previous program will blink the light green Stepping through code, we can easily see how the Blinker method never returns execution to BrainPadSetup(). The program keeps looping infinitely inside the Blinker method. But most programs would probably need to blink the light while doing something else. This is where threads come in very handy.
First, we need to construct a Thread object as shown below. This object has special internal control over the program flow.
```
Thread blinkerThread = new Thread(Blinker);
```
Note how the names easily identify what they represent. The `blinkerThread()` method is a thread that handles the `Blinker()` method. All we need to do is `Start()` the thread and the `Blinker()` method will be executed. However, there is still an issue. The `BrainPadSetup()` method will reach the end, which will cause the program and all its threads to terminate. A temporary solution is to make the `BrainPadSetup()` method wait indefinitely is by using -1 milliseconds as shown in the code example below. 
```
public class Program {
    public void BrainPadSetup() {
        Thread blinkerThread = new Thread(Blinker);
         blinkerThread.Start();
        BrainPad.Wait.Milliseconds(-1);
    }
     
    public void BrainPadLoop() {
        // Declared but not used
    }

    public void Blinker() {
        while (true) {
            BrainPad.LightBulb.TurnGreen();
            BrainPad.Wait.Seconds(0.2);
            BrainPad.LightBulb.TurnOff();
            BrainPad.Wait.Seconds(0.2);
        }
    }
}
```
In code example below, while the red light is blinking in its own thread, the system can now go do other things like incrementing our `count` variable and showing the results on the display. 
```
public class Program {
    int count = 0;

    public void BrainPadSetup() {
        Thread blinkerThread = new Thread(Blinker);
        blinkerThread.Start();

        while (true) {
             BrainPad.LightBulb.TurnRed();
             BrainPad.Wait.Seconds(0.1);
             BrainPad.LightBulb.TurnOff();
             BrainPad.Wait.Seconds(1);
        }
    }

    public void BrainPadLoop() {
         // Declared but not used
    }

    public void Blinker() {
        while (true) {
             count = count + 1;
             BrainPad.Display.DrawTextAndShowOnScreen(40,25," "+ count);
         }
    }
}
```
## Events
If a program needs to turn a light on via a button press, that program will need to check the button's state indefinitely. How often should we check the button? What if the button was pressed and released before the check? If we check too fast the system cannot enter low power mode.

This is important for battery operated devices like circuit boards or mobile phones. If the phone was always fully on, the battery would not last more than a few minutes. The only way a mobile phone can last an entire day on a charged battery is by shutting off unneeded components (like turning the screen off).

The proper way to handle the button is to subscribe to an event that is fired when the button is pressed or released. The BrainPad's `BrainPad.Buttons.WhenUpButtonPressed` event allows us to subscribe using the `+=` symbols. Now every time the `Up` button is pressed the `Buttons_WhenUpButtonPressed()` method is called. In the example below we've created event handlers for all the buttons on the BrainPad. There is a handler to also check when the button is released as shown in the code below. 
```
public class Program {
    public void BrainPadSetup() {

        BrainPad.Buttons.WhenUpButtonPressed += Buttons_WhenUpButtonPressed;
        BrainPad.Buttons.WhenDownButtonPressed += Buttons_WhenDownButtonPressed;
        BrainPad.Buttons.WhenRightButtonPressed += Buttons_WhenRightButtonPressed;
        BrainPad.Buttons.WhenLeftButtonPressed += Buttons_WhenLeftButtonPressed;

        BrainPad.Buttons.WhenUpButtonReleased += Buttons_WhenUpButtonReleased;
        BrainPad.Buttons.WhenDownButtonReleased += Buttons_WhenDownButtonReleased;
        BrainPad.Buttons.WhenRightButtonReleased += Buttons_WhenRightButtonReleased;
        BrainPad.Buttons.WhenLeftButtonReleased += Buttons_WhenLeftButtonReleased;
    }
    private void Buttons_WhenUpButtonPressed() {
        BrainPad.LightBulb.TurnRed();
    }
    private void Buttons_WhenDownButtonPressed() {
        BrainPad.LightBulb.TurnGreen();
    }
    private void Buttons_WhenRightButtonPressed() {
        BrainPad.LightBulb.TurnBlue();
    }
    private void Buttons_WhenLeftButtonPressed() {
        BrainPad.LightBulb.TurnWhite();
    }
    private void Buttons_WhenUpButtonReleased() {
        BrainPad.LightBulb.TurnOff();
    }
    private void Buttons_WhenDownButtonReleased() {
        BrainPad.LightBulb.TurnOff();
    }
    private void Buttons_WhenRightButtonReleased() {
        BrainPad.LightBulb.TurnOff();
    }
    private void Buttons_WhenLeftButtonReleased() {
        BrainPad.LightBulb.TurnOff();
    }

    public void BrainPadLoop() {
            
    }
}
```
When typing, after you enter the += symbols, Visual Studio will instruct you to press TAB to insert a pre-named event handler. After doing so, you'll want to press TAB again to generate the actual handler inside the class.

Activating a light on a button press can be done in a loop but then the system is always running. Using events in this example, the system is mostly sleeping (in low power mode). The first thing it does is subscribe to the button event. The system sleeps until one of the buttons is pressed or released, at which point it wakes up and runs the appropriate Button method. But the code above can be simplified a bit more. Since each ButtonReleased method in our program does the same thing we can share a single event as demonstrated in the code below. 
```
public class Program {
    public void BrainPadSetup() {
        BrainPad.Buttons.WhenUpButtonPressed += Buttons_WhenUpButtonPressed;
        BrainPad.Buttons.WhenDownButtonPressed += Buttons_WhenDownButtonPressed;
        BrainPad.Buttons.WhenRightButtonPressed += Buttons_WhenRightButtonPressed;
        BrainPad.Buttons.WhenLeftButtonPressed += Buttons_WhenLeftButtonPressed;

        BrainPad.Buttons.WhenUpButtonReleased += Buttons_WhenButtonReleased;
        BrainPad.Buttons.WhenDownButtonReleased += Buttons_WhenButtonReleased;
        BrainPad.Buttons.WhenRightButtonReleased += Buttons_WhenButtonReleased;
        BrainPad.Buttons.WhenLeftButtonReleased += Buttons_WhenButtonReleased;
    }
    private void Buttons_WhenUpButtonPressed() {
        BrainPad.LightBulb.TurnRed();
    }
    private void Buttons_WhenDownButtonPressed() {
        BrainPad.LightBulb.TurnGreen();
    }
    private void Buttons_WhenRightButtonPressed() {
        BrainPad.LightBulb.TurnBlue();
    }
    private void Buttons_WhenLeftButtonPressed() {
        BrainPad.LightBulb.TurnWhite();
    }
    private void Buttons_WhenButtonReleased() {
        BrainPad.LightBulb.TurnOff();
    }

    public void BrainPadLoop() {
            
    }
}
```
In the above code, we've accomplish the same thing as before using a few less lines of code. This might not always be the case. But since each button release does the same thing we can simplify our code by sharing the `Buttons_WhenButtonReleased()` method with all our Button Release events. 

# Variables and Nested Statements
---

## Calling Methods & Arguments
We've already talked a bit about methods like `BrainPadSetup()` and `BrainPadLoop()`. A **Method Call** is nothing more then when the method is used or called in your program.

**Arguments** are values passed into these methods. The following examples list the different ways arguments can be used inside a method call.
```
BrainPad.Buzzer.StartBuzzing(3000);
```
The above example is used to play a sound on the Buzzer. We pass the argument 3000 to the `BrainPad.Buzzer.StartBuzzing()` method call. The 3000 represents the frequency to play. 
```
BrainPad.Wait.Seconds(0.5);
```
The above example is a method that makes the BrainPad wait 0.5 seconds before executing the next line of code. The 0.5 is the argument.`BrainPad.Wait.Seconds()` is called the method call the argument goes inside the method call between the parenthesis `()` of the method.

## The Integer Variable
A **variable** is a location in memory that is reserved for us to use. Instead having to know where the memory is, the system gives us access to that memory using a name we choose as shown in the example below

The type tells the system how much memory to reserve for that one variable. The most widely used variable is an **Integer**, defined by the `int` before the variable name, which is 4 bytes and can hold large numbers and negative numbers. For now, we suggest using Integers for everything, except when fractions are needed (more on that later).
```
int count;
```
The above line instructs the system to reserve a variable as an that is named `count` and the variable type is an Integer, or `int` when coding.

A variable name can use any letters and numbers but it cannot start with a number or contain spaces. Using the underscore symbol is allowed.

Valid variable names:
```
int count123;
int count_me_in;
int count2var;
```
In-valid variables names:
```
int count me;
int count#;
int 2count;
```
Variables in small programs can use any names. It could even be just "x". However, using a meaningful name is very important when writing programs, as there maybe hundreds of variables in a large program.

One of the benefits of variables, is they can be used to store numbers as shown in the example below. 
```
int count;
count = 10;
...
count = 123;
```
In the above example, the `count` variable is stored with the a value of 10. Later in the code, the same varible is used to store a new number, 123. 

Varibles can also be used in equation as shown below
```
int count = 5;
int result;
result = 5 + count;
```
In the above example, we create two variables one named `count`, which is initilazed with the value of 10, and one named `result` which is empty. The last line of code, takes the `count` variable and adds `5` then stores the total in the variable we created named `result`

You can also use the same variable in an equation to increment that variable. Like in the code below.
```
count = count + 1;
```
The code example above takes the current value of `count` adds `1` to it then stores the result back into the same `count` variable. This is handy when incrementing a number like the score in a game or counting the number of times something happens in a program. 

> [!Tip]
> You can shorten the above code to just `count++;` It means the same as `count = count + 1;`

## Using Variables to Change Buzzer Tones
In the example below, we create two variables and use them to change the tone of the buzzer, each time a certian button is pressed. 
```
public class Program {
    int frequency;
    int increment;

    public void BrainPadSetup() {
        frequency = 0;
        increment = 0;
    }

    public void BrainPadLoop() {
        if (BrainPad.Buttons.IsUpPressed()) {
            increment = 100;
        }
        if (BrainPad.Buttons.IsDownPressed()) {
            increment = -100;
        }
        if (increment != 0) {
            frequency = frequency + increment;
            increment = 0;

            BrainPad.Buzzer.StartBuzzing(frequency);
            BrainPad.WriteToComputer(frequency);
            BrainPad.Wait.Seconds(0.2);
            BrainPad.Buzzer.StopBuzzing();
        }
    }
}
```
As we use the up and down buttons to change the frequency, the value held by the frequency variable is printed in the Output Window. Using the code above, can we determine the highest frequency a person can hear?

## The if-statement with Variables
The same way the **if statement** was used to check if a button was pressed, it can be used with variables. In the code below we show that if the frequency is larger than 6,000 turn the red light on, otherwise turn it off. Add the code shown below to the `BrainPadLoop()` in the example above, right above the `BrainPad.Wait.Seconds(0.2)` line.
```
if (frequency > 6000) {
     BrainPad.LightBulb.TurnRed();
}
else {
    BrainPad.LightBulb.TurnOff();
}
```
Pressing the up button will increase the frequency. Once the frequency is greater than 6,000 the red light will turn on.

## Inspecting Variables
Printing the variable value worked well for small programs with a single variable. It is not practical to continuously print every variable out when it comes to larger programs. Instead, we can use the debugger feature to pause the code and inspect variables.

```
public class Program {
    int count;

    public void BrainPadSetup() {
        count = 0;
    }

    public void BrainPadLoop() {
        count = count + 1;
        BrainPad.WriteToComputer(count);
        BrainPad.Wait.Seconds(0.2);
    }
}
```
Add a breakpoint to the loop as shown below, then Press `F5` key or `Start` button to start your program and step through the code. Move the mouse over the `count` variable in your code and wait a second. A pop up window will come up showing the value of the count variable as pictured below.

![Inspecting a variable](/static/cp/languages/breakpoint_count.jpg) 

If you press the `Continue` button the code will continue until the end of the code or it reaches another breakpoint. Since our code is in the `BrainPadLoop` it will circle around and stop at the same breakpoint, only this time the `count` variable will be incremented by one.

## Double Variable
While an Integer can hold large numbers, it can't hold fractions. For example, there is no way to set an integer to 0.5 or 123.8. The variable type **double** should be used whenever fractions are needed. If a double can hold large numbers and fractions, why not just use it for everything? You certainly can but double type variables require more memory and processing. Fractions are not always desirable in the programming world as shown below.

```
public class Program {
    double frequency;
    int increment;

    public void BrainPadSetup() {
        frequency = 0;
        increment = 0;
    }

    public void BrainPadLoop() {
         if (BrainPad.Buttons.IsUpPressed()) {
             increment = 100;
         }

         if (BrainPad.Buttons.IsDownPressed()) {
             increment = -100;
         }

         if (increment != 0) {
             frequency = frequency + increment;
             increment = 0;

              BrainPad.Buzzer.StartBuzzing((int)frequency);
              BrainPad.WriteToComputer(frequency);
              BrainPad.Wait.Seconds(0.2);
              BrainPad.Buzzer.StopBuzzing();
         }
     }
}
```
The code above shows how a double isn't always the best variable type choice. Instead of simply passing an integer into `StartBuzzing` method we have to cast it as an integer first. This is done by placing (int) before the variable, which requires additional un-needed processing.


Time to go back to our favorite green light! In the code below, we will turn the green light on and off for a specified amount of time, set by a variable called delay. The up and down buttons control the delay variable, causing the light to be on and off longer or shorter. The variable is also printed out using `WriteToComputer()` method with our`delay` variable as its argument.

```
public class Program {
    double delay;

    public void BrainPadSetup() {
        delay = 0.20;
    }

    public void BrainPadLoop() {
        if (BrainPad.Buttons.IsUpPressed()) {
            delay = delay + 0.10;
        }

        if (BrainPad.Buttons.IsDownPressed()) {
            delay = delay - 0.10;
            if (delay < 0)
                 delay = 0;
        }
        BrainPad.WriteToComputer(delay);

        BrainPad.LightBulb.TurnGreen();
        BrainPad.Wait.Seconds(delay);

        BrainPad.LightBulb.TurnOff();
        BrainPad.Wait.Seconds(delay);
    }
}
```
## Returned Values
Some methods return a value, like when reading the light sensor. This value can be placed into a variable and this variable can be used with if statements. We have lightbulb and light sensor on the BrainPad. Let's turn the light on when it's dark as shown in Example 15.
```
public class Program {
        double level;

        public void BrainPadSetup() {
            level = 0;
        }

        public void BrainPadLoop() {
            level = BrainPad.LightSensor.ReadLightLevel();
            BrainPad.WriteToComputer(level);

            if (level < 0.5) {
                BrainPad.LightBulb.TurnWhite();
            }
            else {
                BrainPad.LightBulb.TurnOff();
            }
        }
    }
```
How can we determine what threshold to use to turn the lightbulb on? This is a perfect example of when inspecting variables is needed. Run the program and test it by placing a finger over the light sensor to block the light. You may need to adjust the threshold from 0.5 to something else. Take a look at the Output Window to see the light levels to determine what value works best for you.

## Strings
A **string** is a type of variable that holds text as shown in the code example below. The text "Hello World!" is considered a string variable. String variables are always surrounded by quotation marks `""`. 
```
BrainPad.WriteToComputer("Hello World!");
```

It's important to remember that the value `2` and the string `"2"` are not the same thing. They may be the same to us but internally in the system they are very different. When `x` is an integer adding 2 + 2 means `x` equals 4, as you would expect.

```
x = 2 + 2;
```

Let's assume `str` is a string variable in the example below, what is the value of str?

```
str = "2" + "2";
```
The plus sign symbol `+` means something different when dealing with strings. Using the plus sign `+` to connect strings is called *concatenation*. Which means a series of interconnected things.
When concatenating strings in the example above, the result is "22". This will make more sense if you try the code below.

```
str = "Hello number " + "2";
```
The result is `"Hello number 2"`. Note how even a space makes a difference with in the string.

## ToString()
One of the important built-in methods for variables is the ToString() method. This method will take the value from count and convert it to a string as shown in the code below.

```
public class Program {
    double count;

    public void BrainPadSetup() {
        count = 0;
    }

    public void BrainPadLoop() {
        count = count + 1;
        BrainPad.WriteToComputer("Count: " + count.ToString());
    }
}
```
The code above continiously increase the `count` variable and display it as a string.

The variable `count` an integer that starts at zero and increments by one in every loop. The string "Count: " is concatenated before the value to give us these results. It then prints the variable's value in the Output Window, as seen in the image below.

![Inspecting a variable](/static/cp/languages/output_window.png) 

> [!Tip]
> `BrainPad.WriteToComputer()` method is an excellent way to send messages to Visual Studio about things happening in your program while you're debugging. Messages here are only shown in Visual Studio's Output window and don't effect what's displayed on your BrainPad. 

C# is smart when it comes to concatenation. Try changing code `count.ToString()` to just `count`. Concatenating numbers and other objects with strings will automatically call the ToString() method as shown below.
```
BrainPad.WriteToComputer("Count: " + count);
```

## While loops
A **while loop** statement in C# repeatedly executes the code within its curly braces `{}` as long as a given condition is true. The example below shows the structure of the while loop. 

```
while(as long as this condition is true){
     This code is executed
}
```
You can make a while loop run forever by making it's condition always return true. As shown in the example below. 1 equals 1 is always true. 
```
 public class Program {
     public void BrainPadSetup() {
         int count = 0;

         while (1 == 1) {
             count = count + 1;
             BrainPad.WriteToComputer("Count: " + count);

             BrainPad.Wait.Seconds(0.2);
         }
     }

     public void BrainPadLoop() {
         //Put your program code here. It runs repeatedly after the BrainPad starts up.
     }
}
```
It should be noted clearly that we used == and not = in the while statement. The single = is used to set a value, not compare them.

The code below sets `count` to the value of 10.
```
int count = 10;
``` 
While this code below compares `count` to the value of 10 to see if it's equal.
```
if (count == 10)
```
The Boolean type `true` can also be used as shown in the example below.
```
 public class Program {
     public void BrainPadSetup() {
         int count = 0;

         while (true) {
             count = count + 1;
             BrainPad.WriteToComputer("Count: " + count);

             BrainPad.Wait.Seconds(0.2);
         }
     }

     public void BrainPadLoop() {
         //Put your program code here. It runs repeatedly after the BrainPad starts up.
     }
}
```

## Finite while loops
Both of the examples above create while loops that never end. So any code below the infinte while loop will never execute. Sometimes we might want to loop until a condition reaches a certain point or value. The code example demonstrates the use of a finite while loop, meaning it will stop looping at some point. 
```
public class Program {
    public void BrainPadSetup() {
        int count = 0;

        while (count < 10) {
            count = count + 1;
            BrainPad.WriteToComputer("Count: " + count);
            BrainPad.Wait.Seconds(0.2);
        }
    }

    public void BrainPadLoop() {
        //Put your program code here. It runs repeatedly after the BrainPad starts up.
    }
}
```
 The above code counts up to 10 before the while loop stops. 

However, the count started at zero, and not one. Why didn't it show the zero? If we look at the code above carefully you'll notice that the first line of code in our while loop increase the `count` variable by one. This happens before it is displayed to the Output window. So by the time we reach the line 
```
BrainPad.WriteToComputer("Count: " + count);
``` 
the `count` variable is already equal to `1`. To fix this we can move the line:
```
count = count + 1
```
To the bottom of the while loop. This means the entire contents of the while loop will execute before the `count` variable is incremented by `1`


There is another possible issue in our code. If we want it to count to 10. The program never prints the value 10 to the Output window. 
 
In plain English, our program says: run the following code as long as count is less than 10. Since 10 is not less than 10, then 10 will not be printed. The while loop can be easily modified so 10 is printed too. The code example below checks if `count` is less than or equal to 10. 
```
while (count <= 10)
```

## Nesting 
Any reasonably sized program will have loops inside loops, or if statements inside loops, maybe even inside other if statements and loops! This is called nesting. While programmers should try to keep this simple to understand, nesting is sometimes required.
How do we write a program that prints one to 10 repeatedly forever? This is accomplished by having two nested while loops. One that counts one to 10, which goes inside another loop that loops indefinitely as shown in code example below. 
```
public class Program {
    public void BrainPadSetup() {
        int count = 0;

        while (true) {
            while (count <= 10) {
                BrainPad.WriteToComputer("Count: " + count);
                count = count + 1;
                BrainPad.Wait.Seconds(0.2);
            }
        }
    }

    public void BrainPadLoop() {
        // Declared but not used
    }
}
```
The above program still will not work the way we want. It will print 1 to 10 only once. Then the program will continue to loop but will not print anything after `count` is greater then 10. Can you fix the code without looking at the solution below?

```
public class Program {
    public void BrainPadSetup() {
        int count;

        while (true) {
            count = 0;

            while (count <= 10) {
                BrainPad.WriteToComputer("Count: " + count);
                count = count + 1;
                BrainPad.Wait.Seconds(0.2);
            }
        }
    }

    public void BrainPadLoop() {
        // Declared but not used
    }
}
```
Instead of intializing the `count` variable to 0 at the beginning of our code, we do it inside while loop instead. This means after the nested while loop finishs counting to 10, the first while loop goes back to the top and resets our `count` variable to 0. Which is less than 10, starting our nested while loop to begin printing again.  

## The For Loop
The **For Loop** executes a block of statements, those between its `{}` curly braces, repeatedly until the specified condition returns false. *For loops* are handy for actions where you have to do a specific task a specific number of times. The syntax of the *for loop* always starts with the keyword `for` As noted in the example below.

```
for (intializer; condition; iterator) {

} 
```

```
for (int i = 1; i <= 5; i++) {

} 
```
 
There are 3 parameters inside each *for loop*, each parameter is sepearted by a `;` semicolon. 

First, the variable `i` is initialized, in our example we set it to `1`. This step happens only once, regardless of how many times the loop repeats. 

The second part of the parameter is the condition part. While our `i` variable is less than or equal to `5` the conditon evaluates to `true`, so the loop continues.  

The last parameter in the *for loop* is the iterator. Ours says that everytime we reach the end of our loop the `i` variable is increased by `1` and then starts back at the top of the loop again. This repeats itself until the condition part of the for loop returns `false`. 

In the example below we use a *for loop* to count to 10 and display the value on the BrainPad's display. After the for loop is done, we then display the words "finished"

```
public void BrainPadSetup() {
    for(int i = 1; i <= 10; i++) {
        BrainPad.Display.DrawNumberAndShowOnScreen(10, 10, i);

        //Pauses the BrainPad 1 second before contining the loop
        BrainPad.Wait.Seconds(1);
     }
     
     BrainPad.Display.DrawTextAndShowOnScreen(10, 10, "Finished");
}
```
## Arrays
Arrays are an excellent way to store many of the same data type into a single named varible. The array works well with *for loops* like we just learned previously. In the code examples below we show you how an array is declared and how it's intialized with values. 

An array of integers:

```
int[] nummbers = { 4, 88, 34, 32, 23 };
```

An array of strings:

```
string[] names = { "Tom", "Bill", "Sally", "Greg", "Allen" };
```
The syntax for creating an array, like the ones above, always begin with the data type of the array, followed by `[]` brackets. Next we give our array a name. Just like our variable names, make the array names meaningful. After naming the array we follow with an `=` equal sign. After the equal sign and inbetween the two `{}` curly braces is the data we want to store in the array seperated by commas. 

Let's now demonstrate how we access the data from within our array, using the *for loop* we learned earlier. In the code example below we will use our array of strings to display each name stored in the array on the BrainPad display.

```
class Program {
    string[] names = { "Tom", "Bill", "Sally", "Greg", "Allen" };

    public void BrainPadSetup() {
        for(int i = 0; i < names.Length; i++) {
            BrainPad.Display.DrawTextAndShowOnScreen(10, 10, names[i]);

            BrainPad.Wait.Seconds(1);
        }
        
        BrainPad.Display.DrawTextAndShowOnScreen(10, 10, "Finished");
    }

    public void BrainPadLoop() {
            
    }
}
```

If you look closely in our *for loop* you'll notice in the parameter of our `BrainPad.Display.DrawTextAndShowOnScreen()` function, you will see the `names[]` array. The elements of an array are stored as shown in the image below. 

![Inspecting a variable](/static/cp/languages/array_example.jpg)

You'll notice that our array `names` contains 5 elements. But the actual location value inside our array starts at `0`, and ends at `4`. Because all arrays start counting at `0`. So the first element of any array, ours as an example will be `names[0]` which contains the string `"Tom"`. You'll also notice instead of a using a hard coded value in our for loop parameter. We can find out the length of our array, by using the `Length` property of `names` like this `names.Length`. This is something built into the code that returns the length of the array. 

Let's show in our previous code example how we can use two arrays together within our *for loop*, to hold two different values. Using two arrays together in this fashion is often referred to as using *parrallel arrays*

```
class Program {
        string[] names = { "Tom", "Bill", "Sally", "Greg", "Allen" };
        int[] ages = { 15, 21, 36, 50, 17 };

        public void BrainPadSetup() {
            for (int i = 0; i < names.Length; i++) {
                BrainPad.Display.DrawText(10, 10, names[i]);

                BrainPad.Display.DrawText(20, 40, ages[i].ToString());

                BrainPad.Display.ShowOnScreen();

                BrainPad.Wait.Seconds(1);

                BrainPad.Display.ClearScreen();
            }
            
            BrainPad.Display.DrawTextAndShowOnScreen(10, 10, "Finished");
        }

        public void BrainPadLoop() {

        }
    }
```
## Foreach loop
We showed how you can access an array using the for loop. Now we'll show you how to use the **foreach loop**. The *foreach loop* is perfect when you have to cycle through only one array at a time. Unlike the previous example where we used parallel arrays, and accessed two different array elements. 

In the code below, you'll notice the parameters required for the *foreach loop* are different then the for loop and don't require 3 parameters. The *foreach* loop below first creates a string variable called `name` within it's parameters. Each time through the *foreach loop* advances to the next element of the array called `names[]` and sets our newly created `name` variable to its value. The *foreach loop* is a good example of why we pick meanful variable names in our code. 

```
foreach(string name in names){
}
```

Here is a code sample that uses the *foreach loop* and the `names[]` array

```
class Program {
        string[] names = { "Tom", "Bill", "Sally", "Greg", "Allen" };
        int[] age = { 15, 21, 36, 50, 17 };

        public void BrainPadSetup() {
            foreach (string name in names) {
                BrainPad.Display.DrawTextAndShowOnScreen(10, 10, name);              
            }

            BrainPad.Display.DrawTextAndShowOnScreen(10, 10, "Finished");
        }

        public void BrainPadLoop() {

        }
}
```
