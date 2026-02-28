// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rooms = {};

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Mafia Game</h1>');
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);
        if (!rooms[room]) {
            rooms[room] = { players: [], gameState: {} };
        }
        rooms[room].players.push(socket.id);
        console.log(`Client ${socket.id} joined room ${room}.`);
        io.to(room).emit('updatePlayerList', rooms[room].players);
    });

    socket.on('startGame', (room) => {
        if (rooms[room]) {
            // Implement game state initialization and logic here
            rooms[room].gameState = { status: 'in_progress' };
            io.to(room).emit('gameStarted', rooms[room].gameState);
        }
    });

    socket.on('makeMove', (room, move) => {
        if (rooms[room]) {
            // Handle the player's move and check for win conditions
            const winner = checkWinCondition(rooms[room].gameState);
            if (winner) {
                io.to(room).emit('gameOver', winner);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Handle player disconnection and cleanup
    });
});

const checkWinCondition = (gameState) => {
    // Implement win condition logic
    return null; // return winner or null
};

server.listen(3000, () => {
    console.log('Server running on port 3000');
});