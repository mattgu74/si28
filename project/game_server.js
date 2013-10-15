
function run(io) {
    io.sockets.on('connection', function (socket) {
      socket.on('set nickname', function (name) {
        socket.set('nickname', name, function () {
          socket.emit('ready');
        });
      });

      socket.on('msg', function (data) {
        socket.get('nickname', function (err, name) {
          console.log('Chat message by ', name);
          console.log(data);
          socket.broadcast.emit('msg', {name: name, msg: data});
        });
      });
    });
}

this.run = run;
