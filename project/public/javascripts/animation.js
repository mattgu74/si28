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

  window.onresize = function() {
    stage.setWidth(window.innerWidth);
    stage.setHeight(window.innerHeight);
  };

  var layer = new Kinetic.Layer();
  stage.add(layer);

  var anim = new Kinetic.Animation(function(frame) {
    for (var i=0;i<layer.children.length;i++) {   
      obj = layer.children[i];

      var dist_x = max(min(obj.getAttr('x') - obj.getAttr('last_x'), 10), -10);
      var dist_y = max(min(obj.getAttr('y') - obj.getAttr('last_y'), 10), -10);
      obj.setAttr('last_x', obj.getAttr('x'));
      obj.setAttr('last_y', obj.getAttr('y'));
      
      if(obj.isDragging()) {
        continue;
      }
      
      obj.move(dist_x, dist_y);

      if(obj.getAttr('x') > stage.getWidth()) {
        // On traverse l'écran a droite
        obj.setAttr('last_x', obj.getAttr('x') - stage.getWidth());
        obj.move(dist_x - stage.getWidth(), dist_y);
        send_object(obj, "right");
        i-=1;
      } else if(obj.getAttr('x') < 0) {
        // on traverse l'écran a gauche
        obj.setAttr('last_x', obj.getAttr('x') + stage.getWidth());
        obj.move(dist_x + stage.getWidth(), dist_y);
        send_object(obj, "left");
        i-=1;
      } else if(obj.getAttr('y') > stage.getHeight()) {
        // on traverse en bas
        obj.setAttr('last_y', obj.getAttr('y') - stage.getHeight());
        obj.move(dist_x, dist_y - stage.getHeight());
        send_object(obj, "bottom");
        i-=1;
      } else if(obj.getAttr('y') < 0) {
        // on traverse en haut
        obj.setAttr('last_y', obj.getAttr('y') + stage.getHeight());
        obj.move(dist_x, dist_y + stage.getHeight());
        send_object(obj, "top");
        i-=1;
      }

    }
  }, layer);

  anim.start();

