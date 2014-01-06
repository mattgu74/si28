var socket = io.connect();
var team = -1;
var scores = [0,0,0,0];

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

function send_object(obj, pos) {
    if(obj.getAttr('shapeObj').destroyed) { return; }
    data = {
             'action': 'object', 
             'shape': obj.getAttr('shape'),
             'color': obj.getAttr('color'), 
             'x': obj.getAttr('x')/stage.getWidth(), 
             'y': obj.getAttr('y')/stage.getHeight(), 
             'last_x': obj.getAttr('last_x')/stage.getWidth(), 
             'last_y': obj.getAttr('last_y')/stage.getHeight(),
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
          last_x: data['last_x']*stage.getWidth(),
          last_y: data['last_y']*stage.getHeight(),
          shape: data['shape'],
          anim: data['anim'],
          countScreen: data['countScreen']
        });
      obj.init();
    }
  }
