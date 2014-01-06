var Triangle = function(config, shape) {
  var that = this;

  this.config = $.extend({
    radius: 20
  }, config);

  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shapeObj: shape,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "triangle",
      draggable: true
    });

    shape.object = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius + 14,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:3,
      radius:this.config.radius + 28,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });
  }
  
  this.loadAnimation = function(duration) {
    /* TRIANGLE DESTROY ANIMATION */ 
    var triangleLineRight = new Kinetic.Line({
      points : [0, -48, 0, -48],
      stroke:"#000000",
      lineCap:"round",
      strokeWidth:0
    });
    var triangleLineBottom = new Kinetic.Line({
      points : [42, 24, 42, 24],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    var triangleLineLeft = new Kinetic.Line({
      points : [-42, 24, -42, 24],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    shape.objectGroup.add(triangleLineLeft);
    shape.objectGroup.add(triangleLineBottom);
    shape.objectGroup.add(triangleLineRight);

    var tween3 = new Kinetic.Tween({
      node : triangleLineLeft,
      points : [-42, 24, 0, -48],
      duration:duration/3,
      onFinish:function() {
        shape.destroyAnimation();
      }
    });

    var tween2 = new Kinetic.Tween({
      node : triangleLineBottom,
      points : [42, 24, -42, 24],
      duration:duration/3,
      onFinish:function() {
        triangleLineLeft.setStroke('#000000');
        tween3.play();
      }
    });

    var tween1 = new Kinetic.Tween({
      node : triangleLineRight,
      points : [0, -48, 42, 24],
      strokeWidth : 10,
      duration:duration/3,
      onFinish:function() {
        triangleLineBottom.setStroke('#000000');
        tween2.play();
      }
    });

    var tween = new Kinetic.Tween({
      node : triangleLineRight,
      strokeWidth : 10,
      duration : 0.5,
      onFinish:function() {
        tween1.play();
      }
    });

    shape.tweens = [tween, tween1, tween2, tween3];
  }
  
}
