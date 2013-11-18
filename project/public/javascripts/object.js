var Object = function(config) {
  var that = this; 

  this.config = $.extend({
    x:200,
    y:200,
    color:"#F00",
    size: 40
  }, config);

  this.createShape = function() {

    var squareGroup = new Kinetic.Group();

    var square = new Kinetic.Rect({
      x: that.config.x,
      y: that.config.y,
      width: that.config.size,
      height: that.config.size,
      fill: that.config.color
    });

    var squareBorder = new Kinetic.Rect({
      x: that.config.x - 7.5,
      y: that.config.y - 7.5,
      width: that.config.size + 15,
      height: that.config.size + 15,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var squareOuterBorder = new Kinetic.Rect({
      x: that.config.x - 15,
      y: that.config.y - 15,
      width: that.config.size + 30,
      height: that.config.size + 30,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
      // shadowColor: 'white',
      // shadowBlur: that.config.size - 10,
      // shadowOffset: 0,
      // shadowOpacity: 0.8
    });

    squareGroup.add(squareOuterBorder);
    squareGroup.add(squareBorder);
    squareGroup.add(square);

    layer.add(squareGroup);

  }

  this.init = function() {
    this.createShape();
  }
}
