TinyPath.prototype.drawRoundedRect = {              // http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
  init: function (parent) {
    parent.register(":r", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var x = args[0]*this.scale;
    var y = args[1]*this.scale;
    var width = args[2]*this.scale;
    var height = args[3]*this.scale;
    var radius = args[4]*this.scale;

    
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }   
}