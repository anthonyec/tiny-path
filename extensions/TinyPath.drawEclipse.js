TinyPath.prototype.drawEclipse = {            // http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
  init: function (parent) {
    parent.register(":e", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var x = args[0]*this.scale;
    var y = args[1]*this.scale;
    var w = args[2]*this.scale;
    var h = args[3]*this.scale;

    var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

    this.ctx.beginPath();
    this.ctx.moveTo(x, ym);
    this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }
}