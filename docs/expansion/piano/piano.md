![BrainPad Pong](/static/cp/expansion/touch_piano.jpg)
# BrainPad Touch Piano

This project demonstrates how we used a TouchClamp Module connected to the BrainPad to use ordinary objects to play a tune. In our project, you can select the notes from several blues scales. When you touch an object or the contacts on TouchClamp Module, the notes in that key are played. In addition on the display is a graphical representation of the keys as they would be played on a piano. 


Supplies Needed 
* BrainPad 
* [TouchClamp Module](https://www.mikroe.com/touchclamp-click)  
* microUSB cable
* 7 - wires with Alligator clips (optional used to connect TouchClamp to objects)
* 7 - conductive objects (ex: fruit, glass jars w/lids or silverware)


**You can find the complete project's Visual Studio project file here (Add link to file). But if you'd like to build the program yourself you can follow the instructions below**

## Start a New C# BrainPad Project
Next open Visual Studio select `File > New > Project` and under `Other Languages` select `Visual C# > TinyCLR` and choose the `BrainPad Application`. Finally change the project name to  `BrainTouchPiano`, and click `OK`.

![Start New Visual C# Project](/static/cp/expansion/start_new_visual_csharp_project.jpg) 


### Attach the TouchClamp Click Module

Next we carefully attach the TouchClamp Click Module to the BrainPad's expansion slot as shown here. Then connect the BrainPad to your computer using a microUSB cable. 

(Image of TouchClamp Click being inserted in expansion slot)



### Add TouchClampClick.cs, SplashScreen.cs and Menu.cs files

Next, we have to add the `TouchClampClick.cs` file to our BrainPad project. This class file contains all the necessary drivers to access the TouchClamp Click module from our BrainPad code. First down the the file you will need here:

In addition, the BrainPad Touch Piano requires several class files, since each Blues key has it's own. We also have to add the `Menu.cs` class file and the `SplashScreen.cs` file to our project. 

You can download all the classfiles you will need for this project here:

(ADD link to zipped class file)


After downloading the zipped file navigate to the files downloaded location. Once there, open the zipped file and drag **ALL** the .cs files into the Solution Explorer of our project. As shown in the image below. 

![Start New Visual C# Project](/static/cp/expansion/class_in_solution_explorer.jpg) 

### ADDING NUGET PACKAGES

If you click on and look at the contents of `TouchClampClick.cs` file in Visual Studio. You will notice we already have errors in our code, as shown below. 

![Reference Missing](/static/cp/expansion/reference_missing.jpg)

This tells us we are missing a needed reference file. We need this package to access the pins on the BrainPad's expansion port. We will use NuGet to add the package we need. NuGet is a way of sharing and adding libraries to your project. 

If you are not familar with how to add Nuget packages to your BrainPad project, follow this link and instructions. 

(add local hosting Nuget demo)

Once we have the correct NuGet Package installed, our error will disappear and we're ready to add the code to our `Program.cs` file. 
Select all the code below, copy & paste it over everything in our projects current`Program.cs` file. 

```
using GHIElectronics.TinyCLR.BrainPad;

namespace BrainTouchPiano {
    class Program {
        SplashScreen open = new SplashScreen();
        public void BrainPadSetup() {
            open.Splash("BrainPiano");
        }

        public void BrainPadLoop() {
            switch (Menu.Show(new string[] { "Cm Blues Scale", "C#m Blues Scale", "Dm Blues Scale", "D#m Blues Scale", "Em Blues Scale", "more..." })) {
                case 1:
                    keyC.Run();
                    break;
                case 2:
                    keyCSharp.Run();
                    break;
                case 3:
                    keyDm.Run();
                    break;
                case 4:
                    keyDSharp.Run();
                    break;
                case 5:
                    keyEm.Run();
                    break;
                case 6: 
                        BrainPad.Display.ClearScreen();
                        switch (Menu.Show(new string[] { "Fm Blues Scale", "F#m Blues Scale ", "Gm Blues Scale", "Am Blues Scale", "Bm Blues Scale", "back" })) {
                            case 1:
                                keyFm.Run();
                                break;
                            case 2:
                                keyFSharp.Run();
                                break;
                            case 3:
                                keyGm.Run();
                                break;
                            case 4:
                                keyAm.Run();
                                break;
                            case 5:
                                keyBm.Run();
                                break;
                            case 6:
                                break;
                        }
                        break;                 
            }
        }
    }
}
```
**Your program is now ready to run. Connect your BrainPad to your computer using a microUSB cable. Deploy the program, by selecting `Start` in Visual Studio**

### Operational Instructions

The TouchClamp click module requires a certain set-up sequence to work properly. This is because the TouchClamp module intializes the capacitive touch sensors when the user powers up the BrainPad. Just reseting the BrainPad won't re-intialize the sensors. So all the items you want to use as the objects to play the sounds **MUST** be hooked before powering up the BrainPad.

If you just want to use your finger to play the notes, you can just touch the pads directly on the TouchClamp module. 

If you want to connect the sensor to an object, connect an alligator clip to the pad, then connect the other end to object you want to use. 

Remember to you'll have re-intialize the sensor, by removing power from your BrainPad and then reconnecting it. 

Use the opening menu to select the Blues Scale Key you want to play sounds in:

* Cm Blues Scale
* C#m Blues Scale
* Dm Blues Scale
* D#m Blues Scale
* Em Blues Scale
* more...

Menu navigation

* Right Button - Selects and runs program using the Blues Scale you selected
* Left Button - Returns back to the Main Menu, from any of the Scales you selected

Once selected and running you can either touch the sensors directly or the objects you connected with the alligator clips, to play a note. When you touch the object or sensor the key and it's location on the piano are displayed on the BrainPad display. As shown in the image below. 

![Screen Image](/static/cp/expansion/touch_piano_screenshot.jpg)
