const canvas = document.getElementById('gameCanvas');

// Show game character when the page loads.
window.addEventListener('load', () => {
    let ctx = canvas.getContext("2d");
    let playerImg = new Image();
    playerImg.src = '../../img/woodcutter/Woodcutter.png';
    ctx.drawImage(playerImg, 10, 10, 50, 50);
});
