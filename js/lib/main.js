var image = ["p", 
				100, 250, 
				250, 100,
				200, 300,
				150, 250,
				200, 220,
			"p", 
				280, 250, 
				380, 400,
				400, 300,
				250, 250,
				400, 220,
			"x", 
				50, "-s", 
				"400+5*i", "390+0", 
				"2", "Math.sin(i/10)*100-100", 
			"#f",
				"red",
			"x", 
				20, "-s", 
				"400+15*i", "400+-i*10", 
				"10", "10+i*10", 
			"#f",
				"orange",
			"#s",
				"black", 2,
			"s",
				400, 50,
				50, 50,
			"s",
				600, 60,
				50, 80,
			"#f",
				"blue",
			"#s",
				"red", 10,
			"e",
				50, 50,
				100, 100,
			"e",
				100, 20,
				200, 50,
			"c",
				100, 20,
				10,
			"x", 
				5, "-s", 
				"10+5*i", "10+60*i", 
				"50", "50", 
			];

var drawFunctions = {
	"#f": "defineFill",
	"#s": "defineStroke",
	"p"	: "drawPath",
	"s"	: "drawSquare",
	"c"	: "drawCircle",
	"e"	: "drawEllipse",
	"x"	: "drawLoop"
}

function returnImageSplit (arr) {
	var splits = [];
	var parts = [];

	for (var i=arr.length-1; i>=0; i--) {
		for (var key in drawFunctions) {
			if (arr[i] == key) {
				splits.push(i);
			}
		}
	};

	for (var j=splits.length-1; j>=0; j--) {
		parts.push( arr.slice(splits[j], splits[j-1]) );
	};

	return parts;
}

function callDrawFunctions (arr) {
	for (var i=arr.length-1; i>=0; i--) {
		for (var key in drawFunctions) {
			if (key == arr[i][0]) {
				argArray = arr[i].slice(1, arr.length[i]);
				func = drawFunctions[key];
				window[func](argArray);
			}
		}
	};
}

var ctx = document.getElementById("tiny-path-canvas").getContext('2d');

function drawLoop (args) {
	var times = args[0];
	var func = args[1].split("-")[1];
	var params = args.splice(2, args.length);

	var temp = params[1];
	var number = temp.split("+");
	var offset = number[1].split("*")[0];

	// for (var i=0; i<times; i++) {
	// 	// console.log(parseFloat(number)+parseFloat(offset)*i);
	// 	console.log(eval(temp));
	// }
	var tempArray = [];

	for (var i=0; i<times; i++) {
		for (var j=0; j<params.length; j++) {
			var param = params[j];
			var calc = eval(param);
			tempArray.push(calc);

			// if (j == params.length) {
			// 	tempArray = [];
			// }
			// // calc = eval(param);
			// // console.log(calc);
			// // console.log(j +": "+eval(param));
			// // console.log(param);
			// // drawSquare(calc);
			// // console.log(calc);
		}

		// console.log(tempArray);

		drawSquare(tempArray);

		tempArray = [];
	}
}

function defineFill (args) {
	var colour = args[0];

	ctx.fillStyle = colour;
}

function defineStroke (args) {
	var colour = args[0];
	var width = args[1];

	ctx.strokeStyle = colour;
	ctx.lineWidth = width;
}

function drawPath (args) {
	var isX = true;
	var x;
	var y;

	ctx.beginPath();

	for (var i=args.length-1; i>=0; i--) {

		if (!isX) {
			x = args[i];
		} else {
			y = args[i];
		}

		if (!isX) { // Only want to draw after it has recieved the 2 values
			if (i > args.length-3 && i < args.length-1) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}

		isX = !isX;
	};

	ctx.stroke();
	ctx.fill();
}

function drawSquare (args) {
	var x = args[0];
	var y = args[1];
	var w = args[2];
	var h = args[3];

	// console.log(args);

	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.stroke();
	ctx.fill();
}

function drawCircle (args) {
	var x = args[0];
	var y = args[1];
	var r = args[2];

	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();
}

function drawEllipse (args) { 	// http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
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

	  ctx.beginPath();
	  ctx.moveTo(x, ym);
	  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	  ctx.closePath();
	  ctx.stroke();
	  ctx.fill();
}

ctx.fillStyle = "rgba(0, 0, 0, 0)";
ctx.strokeStyle = "rgba(0, 0, 0, 1)";

callDrawFunctions(returnImageSplit(image));

// var TinyPath = function (func) {
// 	this.drawFunctions = {}

// 	this.test = "YEP";

// 	this.register = function (shortcut, func) {
// 		this.drawFunctions[shortcut] = func;
// 	}

// 	this.initialise = function () {
// 		var prototypes = Object.getPrototypeOf(this);

// 		for (var proto in prototypes) {
// 			// this[proto].init();
// 			// this[proto].render();

// 			this[proto]();
// 			this[proto];

// 			console.log(proto);
// 			// console.log(this[proto].properties);
// 		}	
// 	}

// 	this.initialise();
// 	// console.log(this.drawFunctions);
// }


// TinyPath.prototype.path = function () {
// 	console.log(this.test);

// 	this.draw = function () {
// 		console.log("I AM DRAW");
// 	}
// }
// // TinyPath.prototype.path = {
// 	self: this,
// 	arguments: [],

// 	init: function (ctx, args) {
// 		console.log(this.test);
// 	},

// 	render: function () {
// 		console.log("Render this!");
// 	}
// };


// var tp = new TinyPath();

// console.log(tp);

// tp.init();

var GameObject = function(width, height) {
    this.x = Math.floor((Math.random() * 800) + 1);
    this.y = Math.floor((Math.random() * 450) + 1);
    this.width = width;
    this.height = height;
    return this;
};
 
// (re)define the GameObject prototype object
GameObject.prototype = {
    x: 0,
    y: 0,
    width: 5,
    width: 5,
    draw: function() {
        console.log(this.x);
    }
};

// var go = new GameObject();

// go.draw();



// TinyPath.register("b", "bezier");

// var TinyPath = function (ctx, arr) {

// 	this.returnImageSplit = function (arr) {
// 		var splits = [];
// 		var parts = [];

// 		for (var i=arr.length-1; i>=0; i--) {
// 			for (var key in drawFunctions) {
// 				if (arr[i] == key) {
// 					splits.push(i);
// 				}
// 			}
// 		};

// 		for (var j=splits.length-1; j>=0; j--) {
// 			parts.push( arr.slice(splits[j], splits[j-1]) );
// 		};

// 		return parts;
// 	}

// 	this.callDrawFunctions = function (arr) {
// 		for (var i=arr.length-1; i>=0; i--) {
// 			for (var key in drawFunctions) {
// 				if (key == arr[i][0]) {
// 					argArray = arr[i].slice(1, arr.length[i]);
// 					func = drawFunctions[key];
// 					this[func](argArray);
// 				}
// 			}
// 		};
// 	}
// }

// var tinyImage = new TinyPath(ctx, image);

// console.log(tinyImage);


// TinyPath.prototype.drawBezier (arr) {

// }

// TinyPath.register("b", TinyPath.drawBezier);