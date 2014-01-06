var socket = io.connect();
var team = -1;

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


function send_object(obj, pos) {
    data = {
             'action': 'object', 
             'shape': obj.getAttr('shape'),
             'color': obj.getAttr('color'), 
             'x': obj.getAttr('x')/stage.getWidth(), 
             'y': obj.getAttr('y')/stage.getHeight(), 
             'last_x': obj.getAttr('last_x')/stage.getWidth(), 
             'last_y': obj.getAttr('last_y')/stage.getHeight(),
             'anim': obj.status()
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
          anim: data['anim']
        });
      obj.init();
    }
  }
