function run(io) {
    var clients = new Array();
    var scores = [0,0,0,0];

    function get(clients, socket, dst) {
        index = clients.indexOf(socket) + dst;
        index = (index + clients.length) % clients.length;
        return clients[index];
    }
    
    function send_scores(socket) {
        socket.emit('scores', scores);
        socket.broadcast.emit('scores', scores);
    }

    io.sockets.on('connection', function (socket) {
      clients.push(socket);
      send_scores(socket);
      
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
      
      socket.on('score diff', function (data) {
          scores[0] += data[0];
          scores[1] += data[1];
          scores[2] += data[2];
          scores[3] += data[3];
          send_scores(socket);
      });
      
    });
}

this.run = run;
