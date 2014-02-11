TinyPath.prototype.drawPath = {
  init: function (parent) {
    parent.register(":p", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var isX = true;
    var x;
    var y;

    this.ctx.beginPath();

    for (var i=args.length-1; i>=0; i--) {

      if (!isX) {
        x = args[i]*this.scale;
      } else {
        y = args[i]*this.scale;
      }

      if (!isX) {                         // Only want to draw after it has recieved the 2 values
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