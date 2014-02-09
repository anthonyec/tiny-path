var TinyPath = function (canvas, array) {
	this.canvas = canvas;
	this.arr = array;
	this.prefixes = ":$";
	this.drawFunctions = {};

	this.initialise = function () {
		var prototypes = Object.getPrototypeOf(this);

		for (var proto in prototypes) {						// loop through all avaible prototypes
			if (this[proto].init) {							// check all prototypes for init()
				this[proto].init(this);						// if init exists run the function. It's a tool!
			}
		}
	}

	this.draw = function () {
		this.canvas.fillStyle = "rgba(255, 255, 255, 0)";	// Defaults for now
		this.canvas.strokeStyle = "black";
		this.canvas.lineWidth = 1;

		this.renderScene(this.returnImageSplit());
	}

	this.initialise();
	console.log(this.drawFunctions);
}

TinyPath.prototype.register = function (code, func) {
	this.drawFunctions[code] = func;
}

TinyPath.prototype.isPrefix = function (value) {
	var prefixes = this.prefixes;

	if (prefixes.indexOf(value) != -1) {
		return true;
	} else {
		return false;
	}
}

TinyPath.prototype.isDrawFunction = function (value) {
	var drawFunctions = this.drawFunctions;

	for (var key in drawFunctions) {
		if (value == key) {
			return true;
		}
	}

	return false;
}

TinyPath.prototype.returnImageSplit = function () {
	var arr = this.arr;
	var drawFunctions = this.drawFunctions;
	var splits = [];
	var parts = [];

	for (var i=0; i<arr.length; i++) {
		var value = arr[i];
		var valuePrefix;

		if (value.length == 2 && typeof value == "string") {
			valuePrefix = value.substring(0, 1);

			if (this.isPrefix(valuePrefix)) {
				splits.push(i);
			}
		}
	};

	for (var j=0; j<splits.length; j++) {
		parts.push( arr.slice(splits[j], splits[j+1]) );
	};

	return parts;
}


TinyPath.prototype.callDrawFunction = function (singleArray) {
	var targetFunction = singleArray[0];
	var argArray = singleArray.slice(1, singleArray.length);

	if (this.isDrawFunction(targetFunction)) {
		var func = this.drawFunctions[targetFunction];

		func.draw(argArray);
	}
}

TinyPath.prototype.renderScene = function (imageSplitArray) {
	var imageArray = imageSplitArray;

	for (var i=0; i<imageArray.length; i++) {
		var singleArray = imageArray[i];

		this.callDrawFunction(singleArray);
	}
}




// Draw Tools

TinyPath.prototype.drawPath = {
	init: function (parent) {
		parent.register(":p", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var isX = true;
		var x;
		var y;

		this.ctx.beginPath();

		for (var i=args.length-1; i>=0; i--) {

			if (!isX) {
				x = args[i];
			} else {
				y = args[i];
			}

			if (!isX) { 												// Only want to draw after it has recieved the 2 values
				if (i > args.length-3 && i < args.length-1) {
					this.ctx.moveTo(x, y);
				} else {
					this.ctx.lineTo(x, y);
				}
			}

			isX = !isX;
		};

		this.ctx.stroke();
		this.ctx.fill();
	}
}

TinyPath.prototype.drawSquare = {
	init: function (parent) {
		parent.register(":s", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var x = args[0];
		var y = args[1];
		var w = args[2];
		var h = args[3];

		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.stroke();
		this.ctx.fill();
	}
}

TinyPath.prototype.drawCircle = {
	init: function (parent) {
		parent.register(":c", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var x = args[0];
		var y = args[1];
		var r = args[2];

		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.fill();
	}
}

TinyPath.prototype.drawEclipse = {						// http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
	init: function (parent) {
		parent.register(":e", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var x = args[0];
		var y = args[1];
		var w = args[2];
		var h = args[3];

		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle

		this.ctx.beginPath();
		this.ctx.moveTo(x, ym);
		this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}
}

TinyPath.prototype.defineFill = {
	init: function (parent) {
		parent.register("$f", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var colour = args[0];

		this.ctx.fillStyle = colour;
	}
}

TinyPath.prototype.defineStroke = {
	init: function (parent) {
		parent.register("$s", this);
		this.ctx = parent.canvas;
	},

	draw: function (args) {
		var colour = args[0];
		var width = args[1];

		this.ctx.strokeStyle = colour;
		this.ctx.lineWidth = width;
	}
}