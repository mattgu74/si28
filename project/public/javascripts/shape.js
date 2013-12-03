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
    var arc = new Kinetic.Shape({
      drawFunc: function(context) {
          var x = 0;
          var y = 0;
          var radius = 39;
          var startAngle = -0.5 * Math.PI;
          var endAngle = this.getAttr('pourcent') * Math.PI;
          context.beginPath();
          context.arc(x, y, radius, startAngle, endAngle, false);
          context.fillStrokeShape(this);
      },
      stroke:"#000000",
      strokeWidth:9,
      pourcent:-0.49,
      draggable:true
    });
    this.objectGroup.add(arc);

    var tween = new Kinetic.Tween({
      node:arc,
      duration:3,
      pourcent:1.5,
      onFinish:thisShape.destroy
    });

    setTimeout(function() {
      tween.play();
    }, 1000);
    
  }
  
  this.startDrag = function() {
    this.objectGroup.startDrag();
  }

  this.init = function() {
    this.createShape();
  }
}
