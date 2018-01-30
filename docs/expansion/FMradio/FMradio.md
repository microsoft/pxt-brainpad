 ![BrainPad FM Radio](/static/cp/expansion/fm_radio.jpg)
# FM Radio
This project turns the BrainPad into it's own fully functioning and tunable FM radio. To achieve this we will use a FM Click Module in the BrainPad's expansion slot. 


Supplies Needed: 
* [FM Click Module](https://www.mikroe.com/fm-click) 
* BrainPad 
* microUSB cable
* headphone/earbuds or speakers

**You can find the complete project's Visual Studio project file here (Add link to file). But if you'd like to build the project yourself you can follow the instructions below, for adding all the files.**

## Start a New C# BrainPad Project
Open Visual Studio select `File > New > Project` and under `Other Languages` select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Finally change the project name to  `BrainRadio`, and click `OK`.

![Start New Visual C# Project](/static/cp/expansion/start_new_visual_csharp_project.jpg) 

### Attach the FM Click Module

Next we carefully attach the FM Click Module to the BrainPad's expansion slot as shown here. Then connect the BrainPad to your computer using a microUSB cable. 

![Attach FM Click](/static/cp/expansion/start_new_visual_csharp_project.jpg)

### Add FM_Click.cs and SplashScreen.cs

Next, we have to add the `FM_Click.cs` file to our BrainPad project. This class file contains all the necessary drivers to access the FM Click module from our BrainPad code. First down the the file you will need here:
(add download link)



After downloading the `FM_Click.cs` file navigate to the files downloaded location. Once there, drag the `FM_Click.cs` file into the Solution Explorer of our project. As shown in the image below. 

![Start New Visual C# Project](/static/cp/expansion/class_in_solution_explorer.jpg)

Next, do the same with the `SplashScreen.cs` class file. 

### ADDING NUGET PACKAGES

If you click on and look at the contents of `FM_Click.cs` file in Visual Studio. You will notice we already have an error in our code, as shown below. 

![Reference Missing](/static/cp/expansion/reference_missing.jpg)

This tells us we are missing a needed reference file. We need this package to access the pins on the BrainPad's expansion port. We will use NuGet to add the package we need. NuGet is a way ofsharing and adding libraries to your project. 

If you are not familar with how to add Nuget packages to your BrainPad project, follow this link and instructions. 

(add local hosting Nuget demo)


Once we have the correct NuGet Package installed, our error will disappear and we're ready to add the code to our `Program.cs` file. 
Select all the code below, copy & paste it over everything in our projects current`Program.cs` file. 

```
using System;
using System.Threading;
using GHIElectronics.TinyCLR.Pins;
using GHIElectronics.TinyCLR.Devices.I2c;
using GHIElectronics.TinyCLR.Devices.Gpio;

namespace BrainRadio {
    class Program {
        Click.Radio.RadioFM1 radio = new Click.Radio.RadioFM1();

        double currentStation = 101.1;
        double selectedStation = 101.1;
        int volume = 0;
        int volumeGraph = 0;

        public void BrainPadSetup() {
            radio.Channel = currentStation;

            radio.Volume = volume;

            BrainPad.Display.ClearScreen();

            BrainPad.Display.DrawSmallText(20, 3, "BrainPad Radio");

            BrainPad.Display.DrawText(30, 25, currentStation.ToString("F1"));

            BrainPad.Display.DrawSmallText(2, 55, "Volume:");

            BrainPad.Display.ShowOnScreen();
        }

        public void BrainPadLoop() {

            if (BrainPad.Buttons.IsUpPressed()) {
                currentStation = currentStation + 0.2;

                BrainPad.Display.ClearPartOfScreen(13, 18, 128, 16);

                BrainPad.Display.DrawText(30, 25, currentStation.ToString("F1"));

                BrainPad.Display.ShowOnScreen();
            }
            if (BrainPad.Buttons.IsDownPressed()) {
                currentStation = currentStation - 0.2;

                BrainPad.Display.ClearPartOfScreen(13, 18, 128, 16);

                BrainPad.Display.DrawText(30, 25, currentStation.ToString("F1"));

                BrainPad.Display.ShowOnScreen();
            }
            if (BrainPad.Buttons.IsRightPressed()) {
                if (volume >= 15) {
                    volume = 15;
                }
                else {
                    volume = volume + 1;

                    volumeGraph = volumeGraph + 5;

                    BrainPad.Display.ClearPartOfScreen(2, 55, 128, 8);

                    BrainPad.Display.DrawSmallText(2, 55, "Volume:");

                    for (int i = 55; i < 62; i++)
                        BrainPad.Display.DrawLine(44, i, 44 + volumeGraph, i);//Volume Bar

                    BrainPad.Display.ShowOnScreen();
                }
            }
            if (BrainPad.Buttons.IsLeftPressed()) {
                if (volume <= 0) {
                    volume = 0;
                }
                else {
                    volume = volume - 1;

                    volumeGraph = volumeGraph - 5;

                    BrainPad.Display.ClearPartOfScreen(2, 55, 128, 8);

                    BrainPad.Display.DrawSmallText(2, 55, "Volume:");

                    for (int i = 55; i < 62; i++)
                        BrainPad.Display.DrawLine(44, i, 44 + volumeGraph, i);//Volume Bar

                    BrainPad.Display.ShowOnScreen();
                }
            }
            if (currentStation == selectedStation) {
                //Does nothing if they match, so radio channel changes only if the user changes the channel. Prevents clicking everytime loops
            }
            else {
                radio.Channel = currentStation;

                selectedStation = currentStation;
            }
            radio.Volume = volume;
        }
    }
}
```
**Your program is now ready to run. Connect your BrainPad to your computer using your microUSB. Deploy the program, by selecting the `Start` in Visual Studio**

### Operational Instructions
* Right Button - Turns up the volume
* Left Button - Turns down the volume
* Up Button - Changes the radio station upwards
* Down Button - Changes the radio station downwards.

