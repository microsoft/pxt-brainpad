![BrainPad ClassicFootball](/static/cp/games/classic_football.jpg)
#  Classic Football
This project revives an old vintage classic handheld game. In our version of game, we use the BrainPad's buttons to control the player and avoid contact with the defensive players while we move across the field to score a touchdown.  

Supplies Needed:
 
* Set-up to program using Visual Studio 2017 (Add link to Setup here)
* BrainPad 
* microUSB cable.

**You can find the complete project's Visual Studio project file here (Add link to file). But if you'd like to build the project yourself you can follow the instructions below, for adding all the files.**

## Start a New C# BrainPad Project
Open Visual Studio select `File > New > Project` and under `Other Languages` select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Finally change the project name to  `ClassicFootball`, and click `OK`.

![Start New Visual C# Project](/static/cp/games/start_new_visual_csharp_project.jpg)

### Add Menu.cs and SplashScreen.cs

We will need to add two class files to our project, both the `Menu.cs` file and the `SplashScreen.cs` file.

You can download both files here:
(ADD LINK to files)

After downloading both files navigate to the files downloaded location. Once there, drag the `Menu.cs` file into the Solution Explorer of our project. As shown in the image below. 

![Start New Visual C# Project](/static/cp/games/class_in_solution_explorer.jpg)

Next, do the same with the `SplashScreen.cs` class file. 

### Add Football.cs and QuietFootball.cs
We have two versions of the game in our program, both are identical except one plays sounds, while the other does not. 

Download both files here:

(ADD LINK to files)

Drag them into the project, just like we did with the `Menu.cs` and the `SplashScreen.cs` files. 

### Adding code to the Program.cs 
Now we are ready to add the code to our `Program.cs` file. 
Select all the code below, copy & paste it over everything in our projects current `Program.cs` file. 

```
using GHIElectronics.TinyCLR.BrainPad;

namespace ClassicFootball {
    class Program {
        SplashScreen open = new SplashScreen();
        public void BrainPadSetup() {
            open.Splash(" Football");

        }

        public void BrainPadLoop() {
            //Put your program code here.It runs repeatedly after the BrainPad starts up.

            switch (Menu.Show(new string[] { "Football", "No Sound" })) {
                case 1:
                    BrainPad.Display.ClearScreen();

                    BrainPad.Display.ShowOnScreen();

                    Football.Run();
                    break;
                case 2:
                    BrainPad.Display.ClearScreen();

                    BrainPad.Display.ShowOnScreen();

                    QuietFootball.Run();
                    break;
            }
        }
    }
}
```

The code pasted in our project's `Program.cs` file looks deceptively simple, that's because the core of our game is inside the `Football.cs` and `QuietFootball.cs` files. 

**Your program is now ready to run. Connect your BrainPad to your computer using your microUSB. Deploy the program, by selecting the `Start` in Visual Studio**

### Operational Instructions
Use the opening menu to select the game you want to play:

* Football
* No Sound

Menu navigation

* Right Button - Selects and starts the indicated game
* Left Button - Exits the game and brings the user back to the Main Menu
* Up Button - Navigates up the menu
* Down Button - Navigates down the menu



Once a game is selected Player 1 begins 1st and 10 at their own 20 yard line. 

In the image below all the information you will need on the display, during the game, is labelled. 

![Start New Visual C# Project](/static/cp/games/football_display.jpg)

Once the game starts the Player's icon is represented by a circle at the far left of the screen. Defensive players begin moving randomly at the start of the play. The object is to move around the Defensive players without touching or occupying the same space, when this happens the Player is tackled. 

Once you reach the end of the field on the display, the Player picks up at the same spot but back on the left side again. This continues until you're either tackled or you score a touchdown. 

The field on the display only shows 10 yard incriments.  

Standard Football rules apply. You need 10 yards to reset the Down indicator to 1. On 4th down, you have to option to either Punt, Kick or Run. Punt kicks the ball to your opponent who then starts at a random new Field Position. Kick, attempts a fieldgoal, the farther away you from the goalline, decreases your chances of making the Field Goal and get 3 points. If you miss a Field Goal the other player takes possesion of the ball at the exact location where the kicking player missed the Field Goal. Run just continues the play on 4th down. If you gain enough yards, you'll get a new set of downs, otherwise the other player will take over at the same field position, but heading towards their goal. 

Field Position indicator shows where you are on the field. Once you cross the 50 yardline the Indicator will switch sides and the number will start to count down. Reaching the 0 yardline scores a touchdown. 
 
