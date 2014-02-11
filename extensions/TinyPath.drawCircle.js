TinyPath.prototype.drawCircle = {
  init: function (parent) {
    parent.register(":c", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var x = args[0]*this.scale;
    var y = args[1]*this.scale;
    var r = args[2]*this.scale;

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}