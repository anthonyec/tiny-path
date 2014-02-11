TinyPath.prototype.drawWave = {
  init: function (parent) {
    parent.register(":w", this);
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

    this.ctx.beginPath();

    for (i=0; i<length; i+=0.5) {

      if (i==0) {
        this.ctx.moveTo(x, y);
      }
      endX = x + i * Math.sin(radians);
      endY = y + i * Math.cos(radians);

      this.ctx.lineTo(endX, endY);
    }

    this.ctx.stroke();
    this.ctx.fill();
  }   
}