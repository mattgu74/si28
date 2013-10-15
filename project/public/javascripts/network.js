var socket = io.connect();

socket.emit('set nickname', prompt("Votre nom ?"));
socket.on('ready', function () {
    socket.emit('msg', prompt("Votre message ?"));
});

socket.on('msg', function (data) {
    console.log(data);
    alert("Message de " + data.name + ":\n" + data.msg);
});

function send_msg() {
    socket.emit('msg', prompt("Votre message ?"));
}


