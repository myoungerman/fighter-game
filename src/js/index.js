import { Character, GameObject } from './models/Classes.js';
import { loadAnimation } from './models/Animation.js';
import { loadMap } from './models/GameState.js';
import { drawAnimation } from './views/animationView.js';
import { drawBackground, drawMap } from './views/gameStateView.js';

let player = new Character('woodcutter', 3, 0, 0, 50);
let playerIdleAnim = loadAnimation('idle', player, 4);
let playerWalkAnim = loadAnimation('walk', player, 6);
let playerAttack1Anim = loadAnimation('attack1', player, 6);
let playerAnimArr = [playerIdleAnim, playerWalkAnim, playerAttack1Anim];
let playerAnimToPlay = playerAnimArr[0];
let counter = 0;
const MsPerFrame = 33.33; // 33.33 ms per frame is 30 FPS. 1000 ms / FPS = ms per frame.

//drawBackground();
let map = loadMap();
drawMap(map);
requestAnimationFrame(gameLoop);

async function gameLoop() {
    let startTime = new Date();
    startTime = startTime.getTime();

    if (playerAnimToPlay === playerAnimArr[1]) { // If the player is walking, increase their x-axis location by 0.33 px, which is about 10 px/s.
        player.location[0] += 0.33;
    }

    if (playerAnimToPlay === playerAnimArr[2]) {
        counter++;
        if (counter > 60) { // After the full attack animation plays, revert to idle
            playerAnimToPlay = playerAnimArr[0];
            player.currAction = 'idle';
            counter = 0;
        }
    }
    drawAnimation(playerAnimToPlay, player);
    let iterateLoop = await compareTimes(startTime); // Wait to repeat gameLoop until 33.33 ms have passed since this cycle of gameLoop began.
    requestAnimationFrame(gameLoop);
}

function compareTimes(startTime) {
    const iterationDuration = (startTime + MsPerFrame); // The time in ms when we should reiterate gameLoop.
    let currTime = new Date();
    currTime = currTime.getTime();

    // While the current time in ms is less than iterationDuration, adjust the previous current time to be the new current time
    while (currTime < iterationDuration) {
        let newTime = new Date();
        newTime = newTime.getTime();
        currTime = newTime;
    }
    return true;
}

window.addEventListener('keydown', pressAttackKey);
window.addEventListener('keydown', pressMoveKey);
window.addEventListener('keyup', releaseMoveKey);

let addKeyUpListener = false;

function pressMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') {
        window.removeEventListener('keydown', pressMoveKey); // Register only one keypress event at a time
        playerAnimToPlay = playerAnimArr[1];
        if (addKeyUpListener === true) {
            window.addEventListener('keyup', releaseMoveKey);
        }
    }
}

function pressAttackKey(e) {
    if (e.code === 'KeyF' && (!e.repeat)) {
        playerAnimToPlay = playerAnimArr[2];
    }
}

function releaseMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') {
        window.removeEventListener('keyup', pressMoveKey);
        playerAnimToPlay = playerAnimArr[0];
        addKeyUpListener = true;
        window.addEventListener('keydown', pressMoveKey);
    }
}
