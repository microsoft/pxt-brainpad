# Temperature

## Step 1 @fullscreen
The BrainPad is equipped with an onboard temperature sensor. We can use this sensor to trigger an action when the temperature reaches a certain level. We will use the ``||input:on temperature||`` block in our program to achieve this.

![BrainPad Temperature Sensor image](/images/temperature.jpg)

## Step 2 @fullscreen
The ``||input:on temperature||`` block stands alone, and doesn't go inside the ``||loops:on start||`` or the ``||loops:forever||`` blocks. This is because our BrainPad will always be checking the temperature sensor in the background, while our program is running. 

![on temperature block](/images/ontemperature.jpg)

## Step 3 @fullscreen
We will make the LightBulb turn Red when the Temperature is High and Blue when the temperature is lower. First we need to grab the ``||input:on temperature||`` block, and drag it into the staging area. It is located under the INPUT tab. 

![Drag on temperature block](/images/onTemperature.gif)


## Step 4 @fullscreen
Next we will add ``||lightbulb:setColor||`` block to our ``||input:on temperature||`` block. Grab the ``||lightbulb:setColor||`` block and drag it inside our ``||input:on temperature||`` block. We can leave the parameters alone for a minute. 

![Drag on temperature block](/images/onTemp_setColor.gif)

## Step 5 @fullscreen
After adding the ``||input:on temperature||`` block to the staging area, take note of the temperature sensor in our simulator. It now has a red bar indicating the virtual temperature inside the simulator. We can slide this bar using the mouse to adjust the temperature within the simulator. Try sliding the red bar inside the temperature sensor. You'll also notice the temperature is listed at the top of the sensor.   

## Step 6 @fullscreen
One thing you may have noticed, when the virtual temperature triggers our lightbulb, it always stays on even if we continue to change the temperature. This is because we only have set a condition for it to turn on. We never tell it turn off or change. Drag another  ``||input:on temperature||`` block just below the first one. 

## Step 7 @fullscreen
Now, let's drag a ``||lightbulb:setColor||`` block, into the new block we just added. This time let's make the color of the Light Bulb blue. We still have a problem within our block. It's all SHADED in and can't be used in our program.  

## Step 8 @fullscreen
Because the ``||input:on temperature||`` is looking for the same condition as the one above it, The program doesn't know which block to use. So it SHADES OUT out the last one we added. We can fix this by changing the parameters inside the ``||input:on temperature||`` block. Let's change the click down box inside our ``||input:on temperature||`` block. Let's change the value from hot to cold. This will UNSHADE our block and allow us to use it in our program. 

## Step 9 @fullscreen
Now, go back to the temperture bar in our simulator. Slide the bar up and down to change the temperature. You should notice that temperatures above 15 Celsius, turn the Light Bulb red. Temperatures below 15 Celsius turn the Light Bulb blue. You can easily change the parameter at the end of the ``||input:on temperature||`` block to use either Celsius or Fahrenheit. 
 

