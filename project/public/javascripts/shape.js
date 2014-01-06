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
  
  this.destroyed = false;
  
  this.config = $.extend({
    shape: "square",
    countScreen: 0
  }, config);
  
  this.createShape = function() {
    this.objectGroup = new Kinetic.Group({
      shapeObj: thisShape,
      x: thisShape.config.x,
      y: thisShape.config.y,
      last_x: thisShape.config.last_x,
      last_y: thisShape.config.last_y,
      speed_x: thisShape.config.speed_x,
      speed_y: thisShape.config.speed_y,
      color: thisShape.config.color,
      shape: thisShape.config.shape,
      draggable: true
    });
  
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
    
    this.objectGroup.on('dblclick dbltap', function() { thisShape.destroyAnimation("good"); } );
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
    try {
        try {
            for (var i=0;i<thisShape.tweens.length;i++) {
                thisShape.tweens[i].destroy();
            }
        } catch (f) {
            
        }
        thisShape.objectGroup.destroy();
    }
    catch (e) {
        
    }
  }

  this.destroyAnimation = function(snd) {
    if(thisShape.destroyed) { return; }
    if(snd) {
        createjs.Sound.play(snd);
        notify_score(1, thisShape.config.countScreen, thisShape.objectGroup.getAttr('color')); 
    } else {
        createjs.Sound.play("bad");
        notify_score(2, thisShape.config.countScreen, thisShape.objectGroup.getAttr('color')); 
    }
    thisShape.destroyed = true;
    thisShape.animateElement(thisShape.object, 1, Kinetic.Easings.BounceEaseIn, 1, 0);
    thisShape.animateElement(thisShape.objectBorder, 0.8, Kinetic.Easings.EaseIn, 1, 0);
    thisShape.animateElement(thisShape.objectOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut, 1, 0);
    setTimeout(function() {
      thisShape.destroy();
    }, 2000);
  }

  this.createAnimation = function() {
    thisShape.animateElement(thisShape.object, 0.8, Kinetic.Easings.BounceEaseIn, 0, 1);
    thisShape.animateElement(thisShape.objectBorder, 1, Kinetic.Easings.EaseIn, 0, 1);
    thisShape.animateElement(thisShape.objectOuterBorder, 0.6, Kinetic.Easings.ElasticEaseOut, 0, 1);
    this.createdAt = new Date();
  }

  this.animateElement = function(elem, speed, effect, start, end) {
    try {
        elem.setScale(start);
        var tween = new Kinetic.Tween({
          node: elem, 
          duration: speed,
          scaleX: end,
          scaleY: end,
          easing: effect
        });
        tween.play();
     } catch (e) {
        
     }
  }
  
  this.startDrag = function() {
    this.objectGroup.startDrag();
  }

  this.init = function() {
    this.createShape();
  }
}
