var Shape = function(config) {
  var obj = null;
  this.createdAt = null;

  var thisShape = this;
  
  this.objectGroup = null;
  this.object = null;
  this.objectBorder = null;
  this.objectOuterBorder = null;
  
  this.config = $.extend({
    shape: "square"
  }, config);
  
  this.createShape = function() {
    switch(this.config.shape) {
        case "square":
            obj = new Square(config, this);
            break;
        case "polygon":
            obj = new Polygon(config, this);
            break;
        case "triangle":
            obj = new Triangle(config, this);
            break;
        case "circle":
            obj = new Circle(config, this);
            break;
        default:
            console.log("Shape " + that.config.shape + " unknown");
    }
    obj.createShape();
    
    this.objectGroup.add(this.objectOuterBorder);
    this.objectGroup.add(this.objectBorder);
    this.objectGroup.add(this.object);

    layer.add(this.objectGroup);
  }
  
  this.destroy = function() {
    thisShape.objectGroup.destroy();
  }

  this.createAnimation = function() {
    this.animateElement(this.object, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(this.objectBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(this.objectOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
    this.createdAt = new Date();

    this.loadAnimation();
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

  this.loadAnimation = function() {
    setTimeout(obj.destroyAnimation, 1000);
    /* SQUARE DESTROY ANIMATION */ 
    /* var squareLineTop = new Kinetic.Line({
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
    this.objectGroup.add(squareLineTop);
    this.objectGroup.add(squareLineRight);
    this.objectGroup.add(squareLineBottom);
    this.objectGroup.add(squareLineLeft);

    var tween4 = new Kinetic.Tween({
      node : squareLineLeft,
      points : [-38, 17, -38, -57],
      duration:1,
      //onFinish:thisShape.destroy
    });

    var tween3 = new Kinetic.Tween({
      node : squareLineBottom,
      points : [38, 16, -39, 16],
      duration:1,
      onFinish:function() {
        tween4.play();
      }
    });

    var tween2 = new Kinetic.Tween({
      node : squareLineRight,
      points : [38, -60, 38, 17],
      duration:1,
      onFinish:function() {
        tween3.play();
      }
    });

    var tween = new Kinetic.Tween({
      node : squareLineTop,
      points : [-39, -57, 39, -57],
      duration:1,
      onFinish:function() {
        tween2.play();
      }
    });

      tween.play();
    }, 1000);*/

    /* TRIANGLE DESTROY ANIMATION */ 
    /* var triangleLineRight = new Kinetic.Line({
      points : [0, -48, 0, -48],
      stroke:"#000000",
      lineCap:"round",
      strokeWidth:10
    });
    var triangleLineBottom = new Kinetic.Line({
      points : [42, 24, 42, 24],
      stroke:"#000000",
      lineCap:"round",
      strokeWidth:10
    });
    var triangleLineLeft = new Kinetic.Line({
      points : [-42, 24, -42, 24],
      stroke:"#000000",
      lineCap:"round",
      strokeWidth:10
    });
    this.objectGroup.add(triangleLineLeft);
    this.objectGroup.add(triangleLineBottom);
    this.objectGroup.add(triangleLineRight);

    var tween3 = new Kinetic.Tween({
      node : triangleLineLeft,
      points : [-42, 24, 0, -48],
      duration:1,
      //onFinish:thisShape.destroy
    });

    var tween2 = new Kinetic.Tween({
      node : triangleLineBottom,
      points : [42, 24, -42, 24],
      duration:1,
      onFinish:function() {
        tween3.play();
      }
    });

    var tween = new Kinetic.Tween({
      node : triangleLineRight,
      points : [0, -48, 42, 24],
      duration:1,
      onFinish:function() {
        tween2.play();
      }
    });

    setTimeout(function() {
      tween.play();
    }, 1000);*/

    
  }
  
  this.startDrag = function() {
    this.objectGroup.startDrag();
  }

  this.init = function() {
    this.createShape();
  }
}
