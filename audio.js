// Get all audio elements
const audioPlayers = document.querySelectorAll('audio');

// Function to pause all other players when one starts playing
function handlePlay(event) {
    const currentPlayer = event.target;
    
    // Pause all other audio players
    audioPlayers.forEach(player => {
        if (player !== currentPlayer && !player.paused) {
            player.pause();
        }
    });
}

// Add event listeners to all audio players
audioPlayers.forEach(player => {
    player.addEventListener('play', handlePlay);
});
