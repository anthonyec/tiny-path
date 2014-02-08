//x y x y pattern. 00 is a new line.

w = [
		[110, 134, 
		50, 20, 
		35, 12,
		00,
		12, 93]
	],

	[
		[110, 134, 
		50, 20, 
		35, 12,
		00,
		12, 93]
	];


00 = Path
01 = Square
02 = Circle 
03 = Bezier
04 = Bezier

// Start Path, 1x 1y to 20x 30y
00, 1, 1, 20, 30

// Start Square, 1x 1y to 20w 30h
01, 1, 1, 100, 50

// Start Circle, 1x 1y to 20w 30h - Make a perfect circle by keeping the w and h the same or specifying 1 value
02, 1, 1, 10, 50

// http://www.html5canvastutorials.com/tutorials/html5-canvas-bezier-curves/
03, 140, 10, 388, 10, 388, 170

Tiny Path Format


02, 15, 15, 10, 10, 
02, 12, 12, 1.5, 1.5, 
00, 10, 19, 15, 25, 20, 19

// First char of string is used to define other things
// S = Stroke and F = fill - Look confusing when the string is all Fs
02, "S000", "FFFF", 15, 15, 10, 10, 
02, "S000", "Fededed", 12, 12, 1.5, 1.5, 
00, "S000", "FFFF", 10, 19, 15, 25, 20, 19


// maybe even math functions to repeat stuff
// this would make a grid of a 100 squares with padding of 5
"s", "20*10+5", "10*10+5", 10, 10, 

// This might be better. Do this action 5 times and use the i variable thing
"s", "x5", "10*i+5", "10*i+5", 10, 10, 

// Or to fit in with the current way, it calls an X function that calls another function
// so that you dont have to have all the maths inside your own function OH BOY THIS 
// IS A BETTER WAY
// Multiply/Loop function call the Square Function 5 times
"x", 5, "s", 10*i+5, 10*i+5, 50, 50+i*5, 