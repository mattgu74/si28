var socket = io.connect();

socket.emit('set nickname', prompt("Votre nom ?"));
socket.on('ready', function () {
    //socket.emit('msg', prompt("Votre message ?"));
});

socket.on('msg', function (data) {
    console.log(data);
    alert("Message de " + data.name + ":\n" + data.msg);
});

socket.on('obj', function (data) {
    receive_object(data);
});

function send_msg() {
    socket.emit('msg', prompt("Votre message ?"));
}

function send_object(obj, pos) {
      socket.emit('obj_'+pos, {
                 'action': 'object', 
                 'shape': obj.getAttr('shape'),
                 'color': obj.getAttr('color'), 
                 'x': obj.getAttr('x')/stage.getWidth(), 
                 'y': obj.getAttr('y')/stage.getHeight(), 
                 'last_x': obj.getAttr('last_x')/stage.getWidth(), 
                 'last_y': obj.getAttr('last_y')/stage.getHeight()});
      obj.destroy();
}


function receive_object(data) {
    console.log("Receive object");
    if(data['shape'] == 'square') {
      console.log(data);
      obj = new Square({
          x: data['x']*stage.getWidth(),
          y: data['y']*stage.getHeight(),
          color: data['color'],
          last_x: data['last_x']*stage.getWidth(),
          last_y: data['last_y']*stage.getHeight()
        });
      obj.init();
    } else {
      console.log(data['shape'] + " unknown !");
    }
  }
