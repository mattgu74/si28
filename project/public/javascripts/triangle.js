var Triangle = function(config) {
  var that = this; 

  this.config = $.extend({
    radius: 20,
    shape: "triangle"
  }, config);

  this.createShape = function() {

    var triangleGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "triangle",
      draggable: true
    });

    var triangle = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius,
      fill: that.config.color
    });

    var triangleBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius + 14,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var triangleOuterBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius + 28,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    triangleGroup.add(triangleOuterBorder);
    triangleGroup.add(triangleBorder);
    triangleGroup.add(triangle);

    layer.add(triangleGroup);

    this.createAnimation(triangle, triangleBorder, triangleOuterBorder);

  }

  this.createAnimation = function(object, objectBorder, objectOuterBorder) {
    this.animateElement(object, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(objectBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(objectOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
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
}
