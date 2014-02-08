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
			];

var drawFunctions = {
	"#f": "defineFill",
	"#s": "defineStroke",
	"p"	: "drawPath",
	"s"	: "drawSquare",
	"c"	: "drawCircle",
	"e"	: "drawEllipse"
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

				console.log(drawFunctions[key]);
			}
		}
	};
}

var ctx = document.getElementById("tiny-path-canvas").getContext('2d');

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


// TinyPath.prototype.drawBezier (arr) {

// }

// TinyPath.register("b", TinyPath.drawBezier);