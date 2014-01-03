function min(a,b) {if(a<b) {return a;} else {return b;}}
function max(a,b) {if(a>b) {return a;} else {return b;}}
function abs(a) {if(a<0) {return -a;} else {return a;}}

var lastDist = 0;
var startScale = 1;
var activeShape = null;

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
    x: 286,
    y: 100,
    offset: [289, 100]
});
  
var background = new Kinetic.Rect({
    x: 0, 
    y: 0,
    // Set lastx and lasty to avoid movement
    last_x: 0,
    last_y: 0, 
    width: stage.getWidth(),
    height: stage.getHeight(),
    fill: "black"
});

window.onresize = function() {
    stage.setWidth(window.innerWidth);
    stage.setHeight(window.innerHeight);
    background.setWidth(window.innerWidth);
    background.setHeight(window.innerHeight);
};

var layer = new Kinetic.Layer();
stage.add(layer);
layer.add(background);


// Lors d'un appui sur le background on génére un élément
var newShape = null;
background.on('mousedown touchstart', function() {
    var mousePos = stage.getMousePosition();
    var touchPos = stage.getTouchPosition();
    if(!mousePos.x && !mousePos.y) {
        pos = touchPos;
    } else {
        pos = mousePos;
    }
    var shapeConfig = {
      x: pos.x,
      y: pos.y,
      last_x: pos.x,
      last_y: pos.y,
      color: choose(colors),
      shape: choose(shapes),
      anim: 0
    }
    newShape = new Shape(shapeConfig);
    newShape.init();
    newShape.createAnimation();
    newShape.startDrag();
});

layer.on('mouseup touchend', function() {
    diff = new Date().getTime() - newShape.createdAt.getTime();
    if(diff < 500) {
        newShape.destroy();
    }
});


  var anim = new Kinetic.Animation(function(frame) {
    for (var i=0;i<layer.children.length;i++) {   
      obj = layer.children[i];
    
      var speed_x = (obj.getAttr('x') - obj.getAttr('last_x')) / frame.timeDiff;
      var speed_y = (obj.getAttr('y') - obj.getAttr('last_y')) / frame.timeDiff;
      obj.setAttr('last_x', obj.getAttr('x'));
      obj.setAttr('last_y', obj.getAttr('y'));

      
      if(speed_x > 0.8) { 
        speed_y = speed_y * 0.8 / speed_x;
        speed_x = 0.8;
      }
      
      if(speed_y > 0.8) {
        speed_x = speed_x * 0.8 / speed_y;
        speed_y = 0.8;
      }
      
      if(speed_x < -0.8) { 
        speed_y = speed_y * -0.8 / speed_x;
        speed_x = -0.8;
      }
      
      if(speed_y < -0.8) {
        speed_x = speed_x * -0.8 / speed_y;
        speed_y = -0.8;
      }
      
      // Coefficient de frottement
      speed_x += (speed_x * -0.01);
      speed_y += (speed_y * -0.01);
      
      if(obj.isDragging()) {
        continue;
      }
      
      obj.move(speed_x * frame.timeDiff, speed_y * frame.timeDiff);

      if(obj.getAttr('x') > stage.getWidth()) {
        // On traverse l'écran a droite
        obj.setAttr('last_x', obj.getAttr('x') - stage.getWidth());
        obj.move(speed_x * frame.timeDiff - stage.getWidth(), speed_y * frame.timeDiff);
        send_object(obj, "right");
        i-=1;
      } else if(obj.getAttr('x') < 0) {
        // on traverse l'écran a gauche
        obj.setAttr('last_x', obj.getAttr('x') + stage.getWidth());
        obj.move(speed_x * frame.timeDiff + stage.getWidth(), speed_y * frame.timeDiff);
        send_object(obj, "left");
        i-=1;
      } else if(obj.getAttr('y') > stage.getHeight()) {
        // on traverse en bas
        obj.setAttr('last_y', obj.getAttr('y') - stage.getHeight());
        obj.move(speed_x * frame.timeDiff, speed_y * frame.timeDiff - stage.getHeight());
        send_object(obj, "bottom");
        i-=1;
      } else if(obj.getAttr('y') < 0) {
        // on traverse en haut
        obj.setAttr('last_y', obj.getAttr('y') + stage.getHeight());
        obj.move(speed_x * frame.timeDiff, speed_y * frame.timeDiff + stage.getHeight());
        send_object(obj, "top");
        i-=1;
      }

    }
  }, layer);

  anim.start();
