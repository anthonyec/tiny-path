var TinyPath = function (canvas, array) {
	this.ctx = canvas;
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
		console.log(this.returnImageSplit());
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

			if (this.isPrefix(valuePrefix) && this.isDrawFunction(value)) {
				splits.push(i);
			}
		}
	};

	for (var j=0; j<splits.length; j++) {
		parts.push( arr.slice(splits[j], splits[j+1]) );
	};

	return parts;
}


TinyPath.prototype.callDrawFunction = function () {

}

// TinyPath.prototype.callAllDrawFunctions = function () {
// 	var arr = this.arr;

// 	for (var i=arr.length-1; i>=0; i--) {
// 		for (var key in drawFunctions) {
// 			if (key == arr[i][0]) {
// 				argArray = arr[i].slice(1, arr.length[i]);
// 				func = drawFunctions[key];
// 				// window[func](argArray);
// 			}
// 		}
// 	};
// }

TinyPath.prototype.drawPath = {
	init: function (parent) {
		parent.register(":p", this);
	},

	draw: function () {
		// Draw Code
	}
}

TinyPath.prototype.drawSquare = {
	init: function (parent) {
		parent.register(":s", this);
	},

	draw: function () {
		//console.log("IM DRAWING");
	}
}

TinyPath.prototype.drawCircle = {
	init: function (parent) {
		parent.register(":c", this);
	},

	draw: function () {
		// Draw Code
	}
}

TinyPath.prototype.drawEclipse = {
	init: function (parent) {
		parent.register(":e", this);
	},

	draw: function () {
		// Draw Code
	}
}





var image = [":p", 
				100, 250, 
				250, 100,
				200, 300,
				150, 250,
				200, 220,
			":p", 
				280, 250, 
				380, 400,
				400, 300,
				250, 250,
				400, 220,
			":x", 
				50, ">s", 
				"400+5*i", "390+0", 
				"2", "Math.sin(i/10)*100-100", 
			"$f",
				"red",
			":x", 
				20, ">s", 
				"400+15*i", "400+-i*10", 
				"10", "10+i*10", 
			"$f",
				"orange",
			"$s",
				"black", 2,
			":s",
				400, 50,
				50, 50,
			":s",
				600, 60,
				50, 80,
			"$f",
				"blue",
			"$s",
				"red", 10,
			":e",
				50, 50,
				100, 100,
			":e",
				100, 20,
				200, 50,
			":c",
				100, 20,
				10,
			":x", 
				5, ">s", 
				"10+5*i", "10+60*i", 
				"50", "50", 
			];

var canvas = document.getElementById("tiny-path-canvas").getContext('2d');
var newImage = new TinyPath(canvas, image).draw();

// console.log(newImage);