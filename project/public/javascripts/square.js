var Square = function(config, shape) {
  var that = this;

  this.config = $.extend({
    size: 27,
    shape: "square"
  }, config);

  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: that.config.shape,
      draggable: true
    });

    shape.object = new Kinetic.RegularPolygon({
      x: -1*(that.config.size + 2)/2,
      y: -1*(that.config.size + 2)/2,
      radius : that.config.size,
      sides:4,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+3.5)/2,
      y: -1*(that.config.size+3)/2,
      radius : that.config.size + 14,
      sides:4,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.RegularPolygon({
      x: -1*(that.config.size+4.5)/2,
      y: -1*(that.config.size + 4)/2,
      radius : that.config.size + 24,
      sides:4,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });

    shape.objectGroup.rotate(Math.PI / 4);
  }
  
  this.loadAnimation = function(duration) {
    /* SQUARE DESTROY ANIMATION */ 
    var squareLineTop = new Kinetic.Line({
      points : [-39, -57, -39, -57],
      stroke:"#000000",
      strokeWidth:10,
      rotationDeg:-45
    });
    var squareLineRight = new Kinetic.Line({
      points : [38, -60, 38, -60],
      stroke:"#000000",
      strokeWidth:10,
      rotationDeg:-45
    });
    var squareLineBottom = new Kinetic.Line({
      points : [38, 16, 38, 16],
      stroke:"#000000",
      strokeWidth:10,
      rotationDeg:-45
    });
    var squareLineLeft = new Kinetic.Line({
      points : [-38, 17, -38, 17],
      stroke:"#000000",
      strokeWidth:10,
      rotationDeg:-45
    });
    shape.objectGroup.add(squareLineTop);
    shape.objectGroup.add(squareLineRight);
    shape.objectGroup.add(squareLineBottom);
    shape.objectGroup.add(squareLineLeft);

    var tween4 = new Kinetic.Tween({
      node : squareLineLeft,
      points : [-38, 17, -38, -57],
      duration:duration/4,
      onFinish:shape.destroy
    });

    var tween3 = new Kinetic.Tween({
      node : squareLineBottom,
      points : [38, 16, -39, 16],
      duration:duration/4,
      onFinish:function() {
        tween4.play();
      }
    });

    var tween2 = new Kinetic.Tween({
      node : squareLineRight,
      points : [38, -60, 38, 17],
      duration:duration/4,
      onFinish:function() {
        tween3.play();
      }
    });

    var tween = new Kinetic.Tween({
      node : squareLineTop,
      points : [-39, -57, 39, -57],
      duration:duration/4,
      onFinish:function() {
        tween2.play();
      }
    });
    
    shape.tweens = [tween, tween2, tween3, tween4];
  }
  
}
