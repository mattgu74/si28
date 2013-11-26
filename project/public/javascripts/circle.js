var Circle = function(config, shape) {
  var that = this;

  this.config = $.extend({
    radius: 23
  }, config);
  
  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "circle",
      draggable: true
    });

    shape.object = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 9,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 17,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });
  }
}
