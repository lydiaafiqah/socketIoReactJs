const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors  = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// use 'connection' > whenever someone is connected, it will run
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
  })

  socket.on('send_message', (data) => {
    // 'broadcast' will send to everyone not yourself
    // socket.broadcast.emit('receive_message', data)

    // 'to' will specify who to emit
    socket.to(data.room).emit('receive_message', data)
  })
})

server.listen(3001, () => {
  console.log('Server is running')
})