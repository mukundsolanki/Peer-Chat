// IMPORTING express
const express = require('express')
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.port || 3000

http.listen(PORT , () => {
    console.log(`Listening to Port ${PORT}`);
})

app.use(express.static(__dirname + '/Resources'))

app.get('/' , (req,res) => {
    res.sendFile(__dirname + '/index.html')
})


// SOCKET

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Message Sent/Received')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})