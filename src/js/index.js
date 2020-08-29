import { Character, GameObject } from './models/Classes.js';
import { loadAnimation } from './models/Animation.js';
import { drawAnimation } from './views/animationView.js';

init();

function init () {
    const canvas = document.getElementById('gameCanvas');
    let player = new Character('woodcutter', 3, 0);

    // Draw player sprite
    const ctx = canvas.getContext("2d");
    let playerImg = new Image();

    playerImg.src = '../../img/woodcutter/Woodcutter_idle.png';
    playerImg.onload = () => {
        ctx.drawImage(playerImg, 0, 0, 48, 48, 0, 0, 48, 48);
    }

    let idleAnimation = new Image();
    idleAnimation.src = `../../../img/${player.type}/${player.type}_idle.png`;
    idleAnimation.onload = (() => {
        console.log(`loaded the image, ${idleAnimation.src}`);
        let actionData = loadAnimation('idle', player.type, 4);
        console.log(`actionData is ${actionData}`);
        drawAnimation(actionData);    
    });
};

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' || e.code === 'KeyA' || e.code === 'KeyS' || e.code === 'KeyD') {
        // call Animation
        // pass to animationView
        // call function in Coordinates.js
        // pass new coordinates to coordinatesView.js
    }
});
