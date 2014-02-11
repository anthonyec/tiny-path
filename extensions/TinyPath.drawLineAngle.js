TinyPath.prototype.drawLineAngle = {
  init: function (parent) {
    parent.register(":l", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var x = args[0]*this.scale;
    var y = args[1]*this.scale;
    var length = args[2]*this.scale;
    var angle = args[3];

    angle = -angle-180;
    radians = angle*Math.PI /180;
    endX = x + length * Math.sin(radians);
    endY = y + length * Math.cos(radians);

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
    this.ctx.fill();
  }   
}