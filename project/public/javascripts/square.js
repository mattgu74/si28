var Square = function(config) {
  var that = this; 

  this.config = $.extend({
    size: 40,
    shape: "square"
  }, config);

  this.createShape = function() {

    var squareGroup = new Kinetic.Group({
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: that.config.shape,
      draggable: true
    });

    var square = new Kinetic.Rect({
      x: -1*(that.config.size)/2,
      y: -1*(that.config.size)/2,
      width: that.config.size,
      height: that.config.size,
      fill: that.config.color
    });

    var squareBorder = new Kinetic.Rect({
      x: -1*(that.config.size+15)/2,
      y: -1*(that.config.size+15)/2,
      width: that.config.size + 15,
      height: that.config.size + 15,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var squareOuterBorder = new Kinetic.Rect({
      x: -1*(that.config.size+30)/2,
      y: -1*(that.config.size+30)/2,
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

    this.animateElement(square, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(squareBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(squareOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
  }

  this.animateElement = function(elem, speed, effect) {
    elem.setScale(0);
    console.log(elem.attrs.width / 20);
    var tween = new Kinetic.Tween({
      node: elem, 
      duration: speed,
      // x: (elem.attrs.width / 2),
      // y:elem.attrs.height,
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
