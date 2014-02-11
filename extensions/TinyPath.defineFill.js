TinyPath.prototype.defineFill = {
  init: function (parent) {
    parent.register("$f", this);
    this.ctx = parent.canvas;
  },

  draw: function (args) {
    var colour = args[0];

    this.ctx.fillStyle = colour;
  }
}