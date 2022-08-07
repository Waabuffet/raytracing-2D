# Light raytracing in 2D

This is a simple 2D game to showcase raytracing.
The gave has walls and a light source that can move around, which emits rays of light. The rays will stop at the closest wall.

# Controls

We have 3 means of controlling the light source:
- mouse control, simply by setting `followMouse` to `true`
- keyboard control, by setting `followMouse` to `false` and `keyControls` to `true`. Use the `W` `A` `S` `D` keys to move around
- perlin noise, which will allow the light source to move randomly by setting both `followMouse` and `keyControls` to `false`

# Manually drawing walls

By setting `manualWallsMode` to `true`, and after refreshing the page, you will be able to draw your own walls.  
Clicking on the canvas will set the wall's starting point, clicking again will draw the wall.

When done, simply press the `space bar` to exit edit mode and show the light. (the added walls will be printed in console)

**Note: when using keyboard mode, the light is set to emit light only in the direction it is moving and it expands to a certain angle. If you press the `space bar`, it will emit light in all directions.**

# Possible game development
When using keyboard control, you will not be able to pass through walls. Together with the manuall wall editing, you could create a puzzle map for a player to solve 