var Polygon = function(config) {
  var that = this; 

  this.config = $.extend({
    x:200,
    y:200,
    last_x:200,
    last_y:200,
    color:"#F00",
    radius: 21,
    shape: "polygon"
  }, config);

  this.createShape = function() {

    var polygonGroup = new Kinetic.Group();

    var polygon = new Kinetic.RegularPolygon({
      x: that.config.x,
      y: that.config.y,
      sides:6,
      radius:this.config.radius,
      fill: that.config.color
    });

    var polygonBorder = new Kinetic.RegularPolygon({
      x: that.config.x,
      y: that.config.y,
      sides:6,
      radius:this.config.radius + 11,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var polygonOuterBorder = new Kinetic.RegularPolygon({
   
      x: that.config.x,
      y: that.config.y,
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
