function run(io) {
    var clients = new Array();
    var scores = [0,0,0,0,0];
    
    function refresh_score() {
        scores = [0,0,0,0,0];
        var nextRefresh = new Date();
        nextRefresh.setMilliseconds(0);
        nextRefresh.setSeconds(0);
        nextRefresh.setMinutes(nextRefresh.getMinutes() - (nextRefresh.getMinutes() % 5) + 5);
        var now = new Date();
        setTimeout(refresh_score, nextRefresh - now);
    }

    refresh_score();

    function send(clients, socket, dst, data) {
        index = clients.indexOf(socket) + dst;
        index = (index + clients.length) % clients.length;
        c = clients[index];
        if(c) { c.emit('obj', data); }
    }
    
    function send_scores(socket) {
        scores[4] = clients.length;
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
      
      socket.on('pause', function() {
        clients.splice(clients.indexOf(socket), 1);
        send_scores(socket);
      });
      
      socket.on('wakeup', function() {
        clients.push(socket);
        send_scores(socket);
      });
      
      socket.on('obj_right', function (data) {
          console.log('Obj_right by ', socket.id);
          send(clients, socket, 1, data);
      });
      
      socket.on('obj_left', function (data) {
          console.log('Obj_left by ', socket.id);
          send(clients, socket, -1, data);
      });
      
      socket.on('obj_top', function (data) {
          console.log('Obj_top by ', socket.id);
          send(clients, socket, 2, data);
      });
      
      socket.on('obj_bottom', function (data) {
          console.log('Obj_bottom by ', socket.id);
          send(clients, socket, -2, data);
      });
      
      socket.on('score diff', function (data) {
          if(data.length == 4) {
            scores[0] += parseInt(data[0]);
            scores[1] += parseInt(data[1]);
            scores[2] += parseInt(data[2]);
            scores[3] += parseInt(data[3]);
            send_scores(socket);
          }
      });
      
    });
}

this.run = run;
