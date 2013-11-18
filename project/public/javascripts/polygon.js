var Polygon = function(config) {
  var that = this; 

  this.config = $.extend({
    radius: 21
  }, config);

  this.createShape = function() {

    var polygonGroup = new Kinetic.Group({
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "polygon",
      draggable: true
    });

    var polygon = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius,
      fill: that.config.color
    });

    var polygonBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 11,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var polygonOuterBorder = new Kinetic.RegularPolygon({
   
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 20,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
      // shadowColor: 'white',
      // shadowBlur: that.config.size - 10,
      // shadowOffset: 0,
      // shadowOpacity: 0.8
    });

    polygonGroup.add(polygonOuterBorder);
    polygonGroup.add(polygonBorder);
    polygonGroup.add(polygon);

    layer.add(polygonGroup);

  }

  this.destroy = function() {
    squareGroup.destroy();
  }
  
  this.init = function() {
    this.createShape();
  }
}
