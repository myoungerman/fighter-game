import { Character, GameObject } from './models/Classes.js';
import { loadAnimation } from './models/Animation.js';
import { drawAnimation } from './views/animationView.js';

let player = 0;

init();

function init() {
    player = new Character('woodcutter', 3, 0);
    //idlePlayer();
};

function idlePlayer() {
        // Start the idle animation by default
        let idleAnimation = new Image();
        idleAnimation.src = `../../../img/${player.type}/${player.type}_idle.png`;
        idleAnimation.onload = (() => {
            let actionData = loadAnimation('idle', player, 4);
            drawAnimation(actionData);
        });
}

window.addEventListener('keydown', pressMoveKey);
window.addEventListener('keyup', releaseMoveKey);

let addKeyUpListener = false;

function pressMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') { // Left and right movement keys
            let actionData = loadAnimation('walk', player, 6);
            if (actionData[3]) { // If this index exists, the array has fully loaded
                drawAnimation(actionData);
                window.removeEventListener('keydown', pressMoveKey);
                if (addKeyUpListener === true) { // Not needed the first time you press the move key
                    window.addEventListener('keyup', releaseMoveKey);
                }
            }
    }
}

function releaseMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') {
        let actionData = loadAnimation('idle', player, 4);
        if (actionData[3]) {
            drawAnimation(actionData);
            window.removeEventListener('keyup', releaseMoveKey);
            addKeyUpListener = true;
            window.addEventListener('keydown', pressMoveKey);    
        }
    }
}
