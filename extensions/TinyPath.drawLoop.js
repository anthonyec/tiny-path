TinyPath.prototype.drawLoop = {
  init: function (parent) {
    parent.register(":x", this);
    this.ctx = parent.canvas;
    this.parent = parent;
  },

  draw: function (args) {
    var times = args[0];
    var func = args[1].split(">")[1];
    var params = args.splice(2, args.length);
    var tempArray = [];

    for (var i=0; i<times; i++) {
      tempArray.push(func);

      for (var j=0; j<params.length; j++) {
        var param = params[j];
        var calc = eval(param);
        tempArray.push(calc);
      }

      this.parent.callDrawFunction(tempArray);
      tempArray = [];
    }
  }
}