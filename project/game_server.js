function mod(a, b) {
    console.log(a, b);
    if (a>=b) {
        return a - b;
    }
    if (a<0) {
        return b - 1;
    }
    return a;
}


function run(io) {
    var clients = new Array();

    function get_right(clients, socket) {
        index = clients.indexOf(socket) + 1;
        index = mod(index, clients.length);
        console.log(index);
        return clients[index];
    }
    
    function get_left(clients, socket) {
        index = clients.indexOf(socket) - 1;
        index = mod(index, clients.length);
        console.log(index);
        return clients[index];
    }

    io.sockets.on('connection', function (socket) {
      socket.on('set nickname', function (name) {
        socket.set('nickname', name, function () {
          socket.emit('ready');
          clients.push(socket);
        });
      });
      
      socket.on('disconnect', function () {
        console.log('User disconnect ! ');
        clients.splice(clients.indexOf(socket), 1);
      });
      
      socket.on('obj_right', function (data) {
        socket.get('nickname', function (err, name) {
          console.log('Obj_right by ', name);
          get_right(clients, socket).emit('obj', data);
        });
      });
      
      socket.on('obj_left', function (data) {
        socket.get('nickname', function (err, name) {
          console.log('Obj_left by ', name);
          get_left(clients, socket).emit('obj', data);
        });
      });
      
      socket.on('obj_top', function (data) {
        socket.get('nickname', function (err, name) {
          console.log('Obj_top by ', name);
          //get_right(clients, socket).emit('obj', data);
          socket.emit('obj', data);
        });
      });
      
      socket.on('obj_bottom', function (data) {
        socket.get('nickname', function (err, name) {
          console.log('Obj_bottom by ', name);
          //get_left(clients, socket).emit('obj', data);
          socket.emit('obj', data);
        });
      });
      
    });
}

this.run = run;
