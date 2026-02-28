// Socket.IO client-side functionality for AI Mafia Game

const socket = io();

// Join the game
function joinGame(username) {
    socket.emit('join', { username });
}

// Leave the game
function leaveGame() {
    socket.emit('leave');
}

// Send a message to other players
function sendMessage(message) {
    socket.emit('message', message);
}

// Receive messages
socket.on('message', function(data) {
    console.log(data.username + ': ' + data.message);
});

// Start a new game
socket.on('startGame', function(data) {
    console.log('Game is starting with players:', data.players);
});

// Update player status
socket.on('updatePlayers', function(players) {
    console.log('Current players:', players);
});

// Handle game events
socket.on('gameEvent', function(event) {
    console.log('Game event:', event);
});

// Notify when a player is disconnected
socket.on('playerDisconnected', function(username) {
    console.log(username + ' has left the game.');
});

// Notify when the game ends
socket.on('endGame', function(winner) {
    console.log('Game over! The winner is:', winner);
});

// Handle errors
socket.on('error', function(error) {
    console.error('Error:', error);
});

// Event listeners for UI buttons
document.getElementById('joinButton').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    joinGame(username);
});

document.getElementById('leaveButton').addEventListener('click', function() {
    leaveGame();
});

document.getElementById('sendMessageButton').addEventListener('click', function() {
    const message = document.getElementById('messageInput').value;
    sendMessage(message);
});