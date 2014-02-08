function inArray (term, arr) {
	var length = arr.length;

	for (var i = 0; i < length; i++) {
		if (arr[i] == term) return true;
	}
}


var ctx = document.getElementById("tiny-path-canvas").getContext('2d');

// var image = ["p", 1, 1, 600, 400];

var image = ["p", 
				1, 1, 
				600, 400, 
				500, 300, 
				200, 100,
			"p",
				500, 500,
				300, 200,
				100, 100,
				400, 400,
				500, 500,
				550, 550,
				650, 650,
				0, 0,
			"s",
				10, 10,
				300, 200
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

function callDrawFunctions () {

}

// TinyPath.prototype.drawBezier (arr) {

// }

// TinyPath.register("b", TinyPath.drawBezier);

console.log(returnImageSplit(image));