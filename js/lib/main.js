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
			"s",
				400, 50,
				50, 50,
			"s",
				600, 60,
				50, 80
			];

var drawFunctions = {
	"p": "drawPath",
	"s": "drawSquare"
}

function returnImageSplit (arr) {
	var splits = [];
	var parts = [];

	for (var i=arr.length-1; i>=0; i--) {
		if (typeof(arr[i]) == "string") {
			splits.push(i);
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
				console.log("Move to: "+x+":"+y);
			} else {
				ctx.lineTo(x, y);
			}
		}

		isX = !isX;
	};

	ctx.stroke();
}

function drawSquare (args) {
	var x = args[0];
	var y = args[1];
	var width = args[2];
	var height = args[3];
	
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.stroke();
}


callDrawFunctions(returnImageSplit(image));


// TinyPath.prototype.drawBezier (arr) {

// }

// TinyPath.register("b", TinyPath.drawBezier);