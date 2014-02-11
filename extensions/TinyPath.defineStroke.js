TinyPath.prototype.defineStroke = {
  init: function (parent) {
    parent.register("$s", this);
    this.ctx = parent.canvas;
    this.scale = parent.scale;
  },

  draw: function (args) {
    var colour = args[0];
    var width = args[1]*this.scale;

    this.ctx.strokeStyle = colour;
    this.ctx.lineWidth = width;
  }
}