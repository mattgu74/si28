var socket = io.connect();

$("#menu").html("<h1></h1><br /><button id=\"playBtn\">Jouer</button>");
$("#playBtn").click(function() {
    $("#menu").html("<h1></h1><br /><input type=\"text\" placeholder=\"Nom du joueur\" id=\"playerName\" /><br /><button id=\"playBtn1\">Jouer</button>");
    $("#menu").addClass("screen2");
    $("#playBtn1").click(function() {
        socket.emit('set nickname', $("#playerName").val());
        $("#menucontainer").hide();
    });
});


/*
socket.emit('set nickname', prompt("Votre nom ?"));
socket.on('ready', function () {
    //socket.emit('msg', prompt("Votre message ?"));
});

*/
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
