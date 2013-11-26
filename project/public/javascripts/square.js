var Square = function(config) {
  var that = this; 
  var squareGroup = null;
  var square = null;
  var squareBorder = null;
  var squareOuterBorder = null;

  this.config = $.extend({
    size: 22,
    shape: "square"
  }, config);

  this.createShape = function() {

    squareGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: that.config.shape,
      draggable: true
    });

    square = new Kinetic.RegularPolygon({
      x: -1*(that.config.size + 2)/2,
      y: -1*(that.config.size + 2)/2,
      radius : that.config.size,
      sides:4,
      fill: that.config.color
    });

    squareBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+3.5)/2,
      y: -1*(that.config.size+3)/2,
      radius : that.config.size + 16,
      sides:4,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    squareOuterBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+4.5)/2,
      y: -1*(that.config.size + 4)/2,
      radius : that.config.size + 28,
      sides:4,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    squareGroup.add(squareOuterBorder);
    squareGroup.add(squareBorder);
    squareGroup.add(square);

    squareGroup.rotate(Math.PI / 4);

    layer.add(squareGroup);

  }

  this.createAnimation = function() {
    this.animateElement(square, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(squareBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(squareOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
  }

  this.animateElement = function(elem, speed, effect) {
    elem.setScale(0);
    var tween = new Kinetic.Tween({
      node: elem, 
      duration: speed,
      scaleX: 1,
      scaleY: 1,
      easing: effect
    });
    tween.play();
  }

  this.destroy = function() {
    squareGroup.destroy();
  }

  this.init = function() {
    this.createShape();
  }
    
  this.startDrag = function() {
    squareGroup.startDrag();
  }
}
