var Polygon = function(config, shape) {
  var that = this;

  this.config = $.extend({
    radius: 23
  }, config);

  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shapeObj: shape,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "polygon",
      draggable: true
    });

    shape.object = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 13,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.RegularPolygon({
      x: 0,
      y: 0,
      sides:6,
      radius:this.config.radius + 22,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });
  }
  
  this.loadAnimation = function(duration) {
    /* POLYGONE DESTROY ANIMATION */ 
    var polygoneLineOne = new Kinetic.Line({
      points : [0, -47, 0, -47],
      stroke:"#000000",
      lineCap:"round",
      strokeWidth:0
    });
    var polygoneLineTwo = new Kinetic.Line({
      points : [40, -23, 40, -23],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    var polygoneLineThree = new Kinetic.Line({
      points : [40, 23, 40, 23],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    var polygoneLineFour = new Kinetic.Line({
      points : [0, 47, 0, 47],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    var polygoneLineFive = new Kinetic.Line({
      points : [-40, 23, -40, 23],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    var polygoneLineSix = new Kinetic.Line({
      points : [-40, -23, -40, -23],
      stroke:"transparent",
      lineCap:"round",
      strokeWidth:10
    });
    shape.objectGroup.add(polygoneLineOne);
    shape.objectGroup.add(polygoneLineTwo);
    shape.objectGroup.add(polygoneLineThree);
    shape.objectGroup.add(polygoneLineFour);
    shape.objectGroup.add(polygoneLineFive);
    shape.objectGroup.add(polygoneLineSix);

    var tween6 = new Kinetic.Tween({
      node : polygoneLineSix,
      points : [-40, -23, 0, -47],
      duration:duration/6,
      onFinish:function() {
        shape.destroyAnimation();
      }
    });

    var tween5 = new Kinetic.Tween({
      node : polygoneLineFive,
      points : [-40, 23, -40, -23],
      duration:duration/6,
      onFinish:function() {
        polygoneLineSix.setStroke("#000000");
        tween6.play();
      }
    });

    var tween4 = new Kinetic.Tween({
      node : polygoneLineFour,
      points : [0, 47, -40, 23],
      duration:duration/6,
      onFinish:function() {
        polygoneLineFive.setStroke("#000000");
        tween5.play();
      }
    });

    var tween3 = new Kinetic.Tween({
      node : polygoneLineThree,
      points : [40, 23, 0 , 47],
      duration:duration/6,
      onFinish:function() {
        polygoneLineFour.setStroke("#000000");
        tween4.play();
      }
    });

    var tween2 = new Kinetic.Tween({
      node : polygoneLineTwo,
      points : [40, -23, 40, 23],
      duration:duration/6,
      onFinish:function() {
        polygoneLineThree.setStroke("#000000");
        tween3.play();
      }
    });

    var tween1 = new Kinetic.Tween({
      node : polygoneLineOne,
      points : [0, -47, 40, -23],
      duration:duration/6,
      onFinish:function() {
        polygoneLineTwo.setStroke("#000000");
        tween2.play();
      }
    });

    var tween = new Kinetic.Tween({
      node : polygoneLineOne,
      strokeWidth : 10,
      duration : 0.5,
      onFinish:function() {
        tween1.play();
      }
    });

    
    shape.tweens = [tween, tween1, tween2, tween3, tween4, tween5, tween6];
  }
}
