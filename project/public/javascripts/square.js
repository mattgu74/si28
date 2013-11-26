var Square = function(config, shape) {
  var that = this; 

  this.config = $.extend({
    size: 22,
    shape: "square"
  }, config);

  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: that.config.shape,
      draggable: true
    });

    shape.object = new Kinetic.RegularPolygon({
      x: -1*(that.config.size + 2)/2,
      y: -1*(that.config.size + 2)/2,
      radius : that.config.size,
      sides:4,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+3.5)/2,
      y: -1*(that.config.size+3)/2,
      radius : that.config.size + 16,
      sides:4,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+4.5)/2,
      y: -1*(that.config.size + 4)/2,
      radius : that.config.size + 28,
      sides:4,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    shape.objectGroup.rotate(Math.PI / 4);
  }
}
