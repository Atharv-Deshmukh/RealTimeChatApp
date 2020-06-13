//Node Server which will handle socket io
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{                    //When new user joins
        //console.log("New User: ",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);         //To broadcast the name of user who joined
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    
})