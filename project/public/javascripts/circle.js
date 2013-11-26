var Circle = function(config) {
  var that = this;
  var circleGroup = null;
  var circle = null;
  var circleBorder = null;
  var circleOuterBorder = null;

  this.config = $.extend({
    radius: 23
  }, config);

  this.createShape = function() {

    circleGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "circle",
      draggable: true
    });

    circle = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius,
      fill: that.config.color
    });

    circleBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 9,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    circleOuterBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 17,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    circleGroup.add(circleOuterBorder);
    circleGroup.add(circleBorder);
    circleGroup.add(circle);

    layer.add(circleGroup);

  }

  this.createAnimation = function() {
    this.animateElement(circle, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(circleBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(circleOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
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
    circleGroup.destroy();
  }

  this.init = function() {
    this.createShape();
  }
}
