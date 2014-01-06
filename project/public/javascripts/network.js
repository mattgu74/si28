var socket = io.connect();
var team = -1;
var scores = [0,0,0,0,0];

$("#menu").html("<h1></h1><br /><button id=\"playBtn\">Jouer</button>");
$("#playBtn").click(function() {
    $("#menu").html("<h1></h1><br /><h2>Choisissez votre équipe</h2><br /><button id=\"playBtn1\">Jouer</button><button id=\"playBtn2\">Jouer</button><button id=\"playBtn3\">Jouer</button><button id=\"playBtn4\">Jouer</button>");
    $("#menu").addClass("screen2");
    $("#playBtn1").click(function() {
        team = 1;
        $("#menucontainer").hide();
        });
    $("#playBtn2").click(function() {
        team = 2;
        $("#menucontainer").hide();
        });
    $("#playBtn3").click(function() {
        team = 3;
        $("#menucontainer").hide();
        });
    $("#playBtn4").click(function() {
        team = 4;
        $("#menucontainer").hide();
        });
});

socket.on('obj', function (data) {
    receive_object(data);
});

socket.on('scores', function (data) {
    scores = data;
});

function notify_score(type, screens, colorTeam) {
    // Type = 1 => Desamorcage
    // Type = 2 => Explosion
    // screens = nb d'ecran traversé
    // colorTeam = Couleur de la team creatrice
    
    // L'objet est arrivé ici, mais l'utilisateur n'est pas encore dans le jeu.
    if (team == -1) {
        return;
    }

    var team1 = colors.indexOf(colorTeam); // Team creatrice
    var team2 = team - 1;
    
    var diff_score = [0,0,0,0];
    
    if(screens == 0) {
        diff_score[team2] -= 10;
    }
    
    if(type == 1) { // Destruction
        diff_score[team1] -= screens;
        diff_score[team2] += 2*screens; 
    } else { // Explosion
        diff_score[team1] += 2*screens;
        diff_score[team2] -= screens;
    }
    
    
    socket.emit('score diff', diff_score);
}

function pause(state) {
    paused = state;
    if(state) {
        socket.emit('pause');
    } else {
        socket.emit('wakeup');
    }
}

var paused = false;

window.onblur = function (e) {  // Pause if unpaused
   if (!paused) {
      pause(true);
   }
};

window.onfocus = function (e) {  // unpause if paused
   if (paused) {
      pause(false);
   }
};


function send_object(obj, pos) {
    if(obj.getAttr('shapeObj').destroyed) { return; }
    data = {
             'action': 'object', 
             'shape': obj.getAttr('shape'),
             'color': obj.getAttr('color'), 
             'x': obj.getAttr('x')/stage.getWidth(), 
             'y': obj.getAttr('y')/stage.getHeight(), 
             'speed_x': obj.getAttr('speed_x'), 
             'speed_y': obj.getAttr('speed_y'),
             'anim': obj.status(),
             'countScreen': obj.getAttr('shapeObj').config.countScreen + 1
             };
    socket.emit('obj_'+pos, data);
    obj.getAttr('shapeObj').destroy();
}


function receive_object(data) {
    if(data['action'] == 'object') {
      obj = new Shape({
          x: data['x']*stage.getWidth(),
          y: data['y']*stage.getHeight(),
          color: data['color'],
          speed_x: data['speed_x'],
          speed_y: data['speed_y'],
          last_x: [data['x']*stage.getWidth()],
          last_y: [data['y']*stage.getHeight()],
          shape: data['shape'],
          anim: data['anim'],
          countScreen: data['countScreen']
        });
      obj.init();
    }
  }
