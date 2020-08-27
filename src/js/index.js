const canvas = document.getElementById('gameCanvas');

/*
Load the game
Your character appears on screen
Idle character animation loop occurs whenever a button isn't being pressed.
*/

// Show game character when the page loads.
window.addEventListener('load', () => {
    const ctx = canvas.getContext("2d");
    let playerImg = new Image();
    playerImg.src = '../../img/woodcutter/Woodcutter_idle.png';
    playerImg.onload = () => {
        ctx.drawImage(playerImg, 0, 0, 48, 48, 0, 0, 48, 48);
    }
});

// Check if the character should move.
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        // call function in Coordinates.js
        // pass new coordinates to coordinatesView.js
        // call PlayerAction
        // pass to playerActionView
    }

});