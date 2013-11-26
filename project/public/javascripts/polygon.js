var Polygon = function(config) {
  var that = this;
  var polygonGroup = null;
  var polygon = null;
  var polygonBorder = null;
  var polygonOuterBorder = null;

  this.config = $.extend({
    radius: 21
  }, config);

  this.createShape = function() {

    polygonGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "polygon",
      draggable: true
    });

    polygon = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius,
      fill: that.config.color
    });

    polygonBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 11,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    polygonOuterBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 20,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    polygonGroup.add(polygonOuterBorder);
    polygonGroup.add(polygonBorder);
    polygonGroup.add(polygon);

    layer.add(polygonGroup);

  }

  this.createAnimation = function() {
    this.animateElement(polygon, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(polygonBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(polygonOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
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
    polygonGroup.destroy();
  }
  
  this.init = function() {
    this.createShape();
  }
  
  this.startDrag = function() {
    polygonGroup.startDrag();
  }
}
