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
    
    setTimeout(obj.loadAnimation, 1000);
    this.objectGroup.on('dblclick', this.destroy);
  }
  
  this.destroy = function() {
    thisShape.objectGroup.destroy();
  }

  this.createAnimation = function() {
    this.animateElement(this.object, 0.8, Kinetic.Easings.BounceEaseIn);
    this.animateElement(this.objectBorder, 1, Kinetic.Easings.EaseIn);
    this.animateElement(this.objectOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut);
    this.createdAt = new Date();
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
  
  this.startDrag = function() {
    this.objectGroup.startDrag();
  }

  this.init = function() {
    this.createShape();
  }
}
