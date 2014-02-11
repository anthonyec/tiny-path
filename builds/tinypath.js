var TinyPath = function (canvas, array) {
	this.canvas = canvas;
	this.arr = array;
	this.scale = 1;
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
		this.canvas.lineWidth = 1*this.scale;

		this.renderScene(this.returnImageSplit());
	}

	this.initialise();
	// console.log(this.drawFunctions);
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