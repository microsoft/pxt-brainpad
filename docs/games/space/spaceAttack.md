![Space Invasion](/static/cp/games/space_invasion.jpg)
# Space Invasion Game

Supplies Needed: 
* BrainPad
* microUSB cable

In this project we created a simple Space Invasion game. The player has 3 lives and aliens that keep desending faster and faster. 

**You can find the complete Visual Studio project file here (Add link to file). But if you'd like to build the project yourself you can follow the instructions below, for adding all the files needed.**

## Start a New C# BrainPad Project
Open Visual Studio select `File > New > Project` and under `Other Languages` select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Finally change the project name to  `SpaceInvasion`, and click `OK`.

![Start New Visual C# Project](/static/cp/expansion/start_new_visual_csharp_project.jpg) 

## Adding the SplashScreen.cs file
In our project the first thing that you see when BrainPad starts up is the BrainPad splash screen with the game title on it. To add this you will have to download the `SplashScreen.cs` class file and added it to your project. 

**ADD SplashScreen.cs link here**

After downloading the `SplashScreen.cs` file navigate to the files downloaded location. Once there, drag the `SplashScreen.cs` file into the Solution Explorer. As shown in the image below. 

![Start New Visual C# Project](/static/cp/expansion/class_in_solution_explorer.jpg)

Now we are ready to add the code to our `Program.cs` file. 
Select all the code below, copy & paste it over everything in our projects current`Program.cs` file. 

```
using GHIElectronics.TinyCLR.BrainPad;
using System;

namespace BrainPadSpaceInvasion {
    class Program {
        int XShip = 40;
        int YBullet = 20;
        int XBullet = 0;
        bool BulletIsOut = false;
        int XMonster = 0;
        int YMonster = 0;
        int XDMonster = 1;
        int score = 0;
        int lives = 3;
        Random rnd = new Random();
        SplashScreen open = new SplashScreen();


        public void BrainPadSetup() {

            open.Splash();
            
            BrainPad.Display.ClearScreen();

            BrainPad.Display.DrawLine(103, 0, 103, 64);

            XMonster = rnd.Next(85);
        }      

        public void BrainPadLoop() {
            var Bullet = BrainPad.Display.CreatePicture(2, 2, new byte[] {
            1,1,
            1,1,

        });

            var Ship = BrainPad.Display.CreatePicture(8, 5, new byte[] {
            0,0,0,1,1,0,0,0,
            0,0,0,1,1,0,0,0,
            0,1,1,1,1,1,1,0,
            1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,1,
        });

            var Monster = BrainPad.Display.CreatePicture(8, 8, new byte[] {
            0,0,0,1,1,0,0,0,
            0,0,1,1,1,1,0,0,
            0,1,1,1,1,1,1,0,
            1,1,0,1,1,0,1,1,
            1,1,1,1,1,1,1,1,
            0,0,1,0,0,1,0,0,
            0,1,0,1,1,0,1,0,
            1,0,1,0,0,1,0,1,
        });

            for (int i = 0; i < lives; i++) {
                BrainPad.Display.DrawPicture(110, i * 10, Ship);
            }
            BrainPad.Display.DrawSmallText(110, 55, score.ToString());

            // Process the bullets
            if (BulletIsOut) {
                BrainPad.Display.ClearPartOfScreen(XBullet, YBullet, Bullet.Width, Bullet.Height);

                YBullet -= 5;

                if (YBullet < 0) {
                    BulletIsOut = false;

                    BrainPad.Buzzer.StopBuzzing();
                }
                else {
                    BrainPad.Display.DrawPicture(XBullet, YBullet, Bullet);

                    BrainPad.Buzzer.StartBuzzing(YBullet * 100);
                }
                // Did we have a hit?
                if (XBullet >= XMonster && XBullet <= XMonster + 8 &&
                    YBullet >= YMonster && YBullet <= YMonster + 8) {
                    for (int i = 0; i < 3; i++) {
                        for (int f = 1000; f < 6000; f += 500) {
                            BrainPad.Buzzer.StartBuzzing(f);

                            BrainPad.Wait.Minimum();
                        }
                    }
                    BrainPad.Display.ClearPartOfScreen(XBullet, YBullet, Bullet.Width, Bullet.Height);

                    BrainPad.Display.ClearPartOfScreen(XMonster, YMonster, Monster.Width, Monster.Height);

                    YMonster = 0;
                    XMonster = rnd.Next(85);

                    BulletIsOut = false;

                    BrainPad.Buzzer.StopBuzzing();
                    if (Math.Abs(XDMonster) < 8)// limit to 8
                    {
                        if (XDMonster > 0)
                            XDMonster++;//go faster!
                        else
                            XDMonster--;
                    }
                    score++;

                    BrainPad.Display.DrawSmallText(110, 55, score.ToString());
                }
            }
            else {
                if (BrainPad.Buttons.IsDownPressed()) {
                    YBullet = 64 - Ship.Height - Bullet.Height;

                    XBullet = XShip + 3;

                    BulletIsOut = true;
                }
            }
            // Process the monster
            BrainPad.Display.ClearPartOfScreen(XMonster, YMonster, Monster.Width, Monster.Height);

            XMonster += XDMonster;
            if (XMonster < 0 || XMonster > 85) {
                XDMonster *= -1;

                YMonster += 10;
            }
            // Did we lose?
            if (YMonster > 40) {
                if (XShip > XMonster && XShip < XMonster + 10) {
                    for (int f = 2000; f > 200; f -= 200) {
                        BrainPad.Buzzer.StartBuzzing(f);

                        BrainPad.Wait.Minimum();
                    }
                    BrainPad.Wait.Seconds(1);

                    BrainPad.Buzzer.StopBuzzing();

                    YMonster = 0;

                    XMonster = rnd.Next(85);

                    lives--;
                    if (lives == 0) {
                        BrainPad.Display.DrawScaledText(20, 20, "YOU LOSE!", 1, 2);

                        BrainPad.Display.ShowOnScreen();
                        while (!BrainPad.Buttons.IsDownPressed()) {
                            BrainPad.Wait.Minimum();
                        }

                        BrainPad.Display.DrawScaledText(20, 20, "         ", 1, 2);

                        XDMonster = 1;

                        lives = 3;

                        score = 0;

                        BrainPad.Display.DrawSmallText(110, 55, score.ToString());
                    }
                    
                    BrainPad.Display.ClearPartOfScreen(110, 10, Ship.Width, 40);

                    for (int i = 0; i < lives; i++) {
                        BrainPad.Display.DrawPicture(110, i * 10, Ship);
                    }
                }
            }

            BrainPad.Display.DrawPicture(XMonster, YMonster, Monster);

            // Process the ship
            BrainPad.Display.ClearPartOfScreen(XShip, 64 - Ship.Height, Ship.Width, Ship.Height);

            if (BrainPad.Buttons.IsLeftPressed())
                XShip -= 5;

            if (BrainPad.Buttons.IsRightPressed())
                XShip += 5;

            if (XShip < 0) XShip = 0;

            if (XShip > 85) XShip = 85;

            BrainPad.Display.DrawPicture(XShip, 64 - Ship.Height, Ship);

            if (BrainPad.Buttons.IsUpPressed())
                return;

            BrainPad.Display.ShowOnScreen();

            BrainPad.Wait.Minimum();
        }
    }
}
```
**Your program is now ready to run. Connect your BrainPad to your computer using your microUSB. Deploy the program, by selecting the `Start` in Visual Studio**

### Operational Instructions

* Right Button - Moves the player to the right.
* Left Button - Moves the player to the left. 
* Down Button - Shoots 

