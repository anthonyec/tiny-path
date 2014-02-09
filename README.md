TinyPath
========
TinyPath is very modular by design allowing you to add and remove the functionality that you require for a given project. Give it a try and comment out the drawPath prototype. You wont be able to draw paths after that but oh well.

Using TinyPath
==============
A nice big sample image array is included in the project
```javascript
var imageArray = [":p", 
    			100, 250, 
				250, 100,
				200, 300,
				150, 250,
				200, 220,
			":s",
    			400, 50,
				50, 50
            ];
var canvas = document.getElementById("tiny-path-canvas").getContext('2d');
var newImage = new TinyPath(canvas, imageArray).draw();
```

Extending TinyPath's Tools
=================
TinyPath's toolset is very limited out of the box*. That's not a problem though because you can add your own drawing functions very easily. 

Here are the bare bones of a drawing function:

```javascript
TinyPath.prototype.drawImage = {
    init: function (parent) {
		parent.register(":i", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
        // Insert some image drawing code
	}
}
```
All TinyPath drawing tools require a init and draw function. A refrence (parent) to TinyPaths main function is always passed through as an argument to init.

Use the **register** function to assign unique shortcut for TinyPath to look for in image data. 

```javascript
parent.register(":i", this);
```

Tool shortcuts need a prefix. There are 2 prefixes that you can use (this of course is extendable). Use a **":i"** for a drawing tool and a **":$"** for a tool that defines something. I've used **":i"** here:

```javascript
draw: function (args) {
    var x = args[0];
    var y = args[1];
    // Insert some image drawing code
}
```

Arguments are passed through to the draw function as an array. It may seem clumsy to refer to each element of the array by number but it's fine because you know how your tool data will be formated.

```javascript
var imageData = [":i",
            0, 0,
        	100, 100,
	        "http://cagedmonkey.co.uk/wp-content/uploads/2011/04/ComputerMan.png"
            ];
```
And that's about all there is to it. I've included an completed **drawImage** function for good measure.

```javascript
TinyPath.prototype.drawImage = {
    init: function (parent) {
		parent.register(":i", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var self = this;

		var x = args[0];
		var y = args[1];
		var w = args[2];
		var h = args[3];
		var url = args[4];
		var image = new Image();

		image.src = args[4];

		image.onload = function() {
			self.ctx.drawImage(image, x, y, w, h);
		};
	}
}
```



*If you got TinyPath from a box and/or also exchanged money for it then you have probably been ripped off sorry.