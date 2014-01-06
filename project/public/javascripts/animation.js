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
    width: stage.getWidth(),
    height: stage.getHeight(),
    fill: "black"
});

var scoreA = new Kinetic.Text({
  x: 10, y: 10, text: scores[0], fill: colors[0]
});

var scoreB = new Kinetic.Text({
  x: 10, y: 25, text: scores[1], fill: colors[1]
});

var scoreC = new Kinetic.Text({
  x: 10, y: 40, text: scores[2], fill: colors[2]
});

var scoreD = new Kinetic.Text({
  x: 10, y: 55, text: scores[3], fill: colors[3]
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
layer.add(scoreA);
layer.add(scoreB);
layer.add(scoreC);
layer.add(scoreD);


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
      color: colors[team-1], //choose(colors),
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
    // Update scores
    scoreA.setText(scores[0]);
    scoreB.setText(scores[1]);
    scoreC.setText(scores[2]);
    scoreD.setText(scores[3]);
  
    for (var i=0;i<layer.children.length;i++) {
      obj = layer.children[i];  
      if(!obj.getAttr('last_x')) { continue; } 

      last_x = obj.getAttr('last_x');
      last_y = obj.getAttr('last_y');
      obj.setAttr('last_x', obj.getAttr('x'));
      obj.setAttr('last_y', obj.getAttr('y'));

      if(obj.isDragging()) {
        continue;
      }
      
      var speed_x = (obj.getAttr('x') - last_x) / frame.timeDiff;
      var speed_y = (obj.getAttr('y') - last_y) / frame.timeDiff;
      
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
