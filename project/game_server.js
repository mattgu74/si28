function run(io) {
    var clients = new Array();

    function get(clients, socket, dst) {
        index = clients.indexOf(socket) + dst;
        index = (index + clients.length) % clients.length;
        return clients[index];
    }

    io.sockets.on('connection', function (socket) {
      clients.push(socket);
      
      socket.on('disconnect', function () {
        console.log('User disconnect ! ');
        clients.splice(clients.indexOf(socket), 1);
      });
      
      socket.on('obj_right', function (data) {
          console.log('Obj_right by ', socket.id);
          get(clients, socket, 1).emit('obj', data);
      });
      
      socket.on('obj_left', function (data) {
          console.log('Obj_left by ', socket.id);
          get(clients, socket, -1).emit('obj', data);
      });
      
      socket.on('obj_top', function (data) {
          console.log('Obj_top by ', socket.id);
          get(clients, socket, 2).emit('obj', data);
      });
      
      socket.on('obj_bottom', function (data) {
          console.log('Obj_bottom by ', socket.id);
          get(clients, socket, -2).emit('obj', data);
      });
      
    });
}

this.run = run;
