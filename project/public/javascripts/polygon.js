var Polygon = function(config, shape) {
  var that = this;

  this.config = $.extend({
    radius: 23
  }, config);

  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "polygon",
      draggable: true
    });

    shape.object = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 13,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 22,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });
  }
}
