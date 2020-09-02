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

// the problem is that when the key is held, it processes multiple calls to load the walk animation.
// while the key is held, only one walk animation should be processed the entire time
function pressMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') {
            let actionData = loadAnimation('walk', player, 6);
            console.log(actionData);
            if (actionData[3]) {
                drawAnimation(actionData);
                window.removeEventListener('keydown', pressMoveKey);
                console.log('removed listener');
            }
    }
}

/* window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA' || e.code === 'KeyD') {
        let actionData = loadAnimation('idle', player, 4);
        drawAnimation(actionData);
    }
}); */

