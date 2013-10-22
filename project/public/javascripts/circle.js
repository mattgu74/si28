var Circle = function(config) {
  var that = this; 

  this.config = $.extend({
    x:200,
    y:200,
    color:"#F00",
    radius: 23
  }, config);

  this.createShape = function() {

    var circleGroup = new Kinetic.Group();

    var circle = new Kinetic.Circle({
      x: that.config.x,
      y: that.config.y,
      radius:this.config.radius,
      fill: that.config.color
    });

    var circleBorder = new Kinetic.Circle({
      x: that.config.x,
      y: that.config.y,
      radius:this.config.radius + 9,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    var circleOuterBorder = new Kinetic.Circle({
      x: that.config.x,
      y: that.config.y,
      radius:this.config.radius + 17,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
      // shadowColor: 'white',
      // shadowBlur: that.config.size - 10,
      // shadowOffset: 0,
      // shadowOpacity: 0.8
    });

    circleGroup.add(circleOuterBorder);
    circleGroup.add(circleBorder);
    circleGroup.add(circle);

    layer.add(circleGroup);

  }

  this.init = function() {
    this.createShape();
  }
}