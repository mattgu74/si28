var Triangle = function(config) {
  var that = this; 

  this.config = $.extend({
    x:200,
    y:200,
    color:"#F00",
    radius: 20
  }, config);

  this.createShape = function() {

    var triangleGroup = new Kinetic.Group();

    var triangle = new Kinetic.RegularPolygon({
      x: that.config.x,
      y: that.config.y,
      sides:3,
      radius:this.config.radius,
      fill: that.config.color
    });

    var triangleBorder = new Kinetic.RegularPolygon({
      x: that.config.x,
      y: that.config.y,
      sides:3,
      radius:this.config.radius + 14,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var triangleOuterBorder = new Kinetic.RegularPolygon({
      x: that.config.x,
      y: that.config.y,
      sides:3,
      radius:this.config.radius + 28,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
      // shadowColor: 'white',
      // shadowBlur: that.config.size - 10,
      // shadowOffset: 0,
      // shadowOpacity: 0.8
    });

    triangleGroup.add(triangleOuterBorder);
    triangleGroup.add(triangleBorder);
    triangleGroup.add(triangle);

    layer.add(triangleGroup);

  }

  this.init = function() {
    this.createShape();
  }
}