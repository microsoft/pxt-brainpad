![BrainPad Pong](/static/cp/games/pong.jpg)
# Pong

This project revives the old classic video game. In our version we have both one & two player mode. We have also added a one player version called TiltPong which takes advantage of the BrainPad's built in accelerometer to control the player's paddle movements

Supplies Needed: 
* BrainPad 
* microUSB cable.


**You can find the complete project's Visual Studio project file here (Add link to file). But if you'd like to build the project yourself you can follow the instructions below, for adding all the files.**

## Start a New C# BrainPad Project
Next open Visual Studio select `File > New > Project` and under `Other Languages` select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Finally change the project name to  `Pong`, and click `OK`.

![Start New Visual C# Project](/static/cp/expansion/start_new_visual_csharp_project.jpg) 

In our version of Pong, we use a `Menu.cs` file to create a menu structure for our BrainPad application. This menu will allow us to select different versions of the game. Each version of the game is stored inside it's own seperate class file
.

First we will need to download the necessary `Menu.cs` file here.
(Add link)  

After downloading the `Menu.cs` file navigate to the files downloaded location. Once there, drag the `Menu.cs` file into the Solution Explorer. As shown in the image below.
(ADD Image) 

Now we are ready to add the code to our `Program.cs` file. 
Select all the code below, copy & paste it over everything in our projects current`Program.cs` file. 
```
using GHIElectronics.TinyCLR.BrainPad;
using System.Runtime.CompilerServices;
using System;

namespace Pong {

    class Program {
        SplashScreen open = new SplashScreen();

        public void BrainPadSetup() {
            open.Splash(" BrainPong");
        }

        public void BrainPadLoop() {
            switch (Menu.Show(new string[] {"One Player", "Two Players"})) {
                case 1:
                    Pong1Player.Run();
                    break;
                case 2:
                    Pong2Player.Run();
                    break;
            }
        }
    }
}
```

The code pasted in our project's `Program.cs` file looks deceptively simple. And has a few errors. This because each version of our game resides in its own class files that we have to add, just like we added the `Menu.cs` file. 
(ADD Image of errors in the code from the missing .cs files)

We need to add the three different versions of the game we have, and a Splash Screen that displays and image when BrainPad first starts. Add these to your project the same way we added the `Menu.cs` file

(Add Link to Pong1Player.cs)

(Add Link to Pong2Player.cs)

(Add Link to TiltPong1Player.cs)

(Add Link to SplashScreen.cs)

**Your program is now ready to run. Connect your BrainPad to your computer using your microUSB. Deploy the program, by selecting the `Start` in Visual Studio**

### Operational Instructions

Use the opening menu to select the game you want to play:

* One Player
* Two Player
* Tilty-Pong

Menu navigation

* Right Button - Selects and starts the indicated game
* Left Button - Navigates up the menu
* Down Button - Navigates down the menu

Once a game has started press you can press `ALL` the buttons on the BrainPad at the same time to exit back to the main menu. 

**One Player Mode**
Use the `Up` and `Down` buttons on the BrainPad to control movement of the paddle.

**Two Player Mode**
Both players use the buttons on the BrainPad to play a two player game.

Player One controls his paddle by using the `Up` and `Left` buttons.

Player Two controls his paddle by using the `Down` and `Right` buttons.

Each players score is indicated by the score displayed on their side. 

**Tilty-Pong**
Is identical to *One Player Mode*, but the BrainPad's accelerometer is used to control the player's paddle movements instead of the BrainPad buttons. 