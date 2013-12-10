var Shape = function(config) {
  var obj = null;
  var animationLength = 10000;
  this.createdAt = null;

  var thisShape = this;
  
  this.objectGroup = null;
  this.object = null;
  this.objectBorder = null;
  this.objectOuterBorder = null;
  this.tweens = [];
  
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
    obj.loadAnimation(animationLength / 1000);
    
    this.seek(config.anim);
    this.objectGroup.status = this.status;
    
    this.objectGroup.on('dblclick', this.destroy);
  }
  
  // Obtenir le status des tweens (etat du loadAnimation)
  this.status = function() {
        var c = 1000;
        for (var i=0;i<thisShape.tweens.length;i++)
        {
            var step = animationLength / thisShape.tweens.length;
            c += thisShape.tweens[i].tween.getPosition() * step;
        }
        return c;
  }
  
  // Retablir les tweens dans l'état de l'écran d'avant (etat du loadAnimation)
  this.seek = function(count) {
    setTimeout(function() { thisShape.tweens[0].play(); }, 1000 - count);
    if(count <= 1000) {
        setTimeout(function() { thisShape.tweens[0].play(); }, 1000 - count);
    } else {
        count -= 1000;
        var step = animationLength / thisShape.tweens.length;
        for (var i=0;i<thisShape.tweens.length;i++)
        {
            if(count > step) {
                thisShape.tweens[i].seek(step / 1000);
                thisShape.tweens[i].play();
                count -= step;
            } else if(count > 0) {
                thisShape.tweens[i].seek(count / 1000);
                thisShape.tweens[i].play();
                count = 0;
            }
        }
    }
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
