TinyPath.prototype.drawSquare = {
  init: function (parent) {
    parent.register(":s", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var x = args[0]*this.scale;
    var y = args[1]*this.scale;
    var w = args[2]*this.scale;
    var h = args[3]*this.scale;

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
    this.ctx.fill();
  }
}