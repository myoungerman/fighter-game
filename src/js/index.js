import { Character, GameObject } from './models/Classes.js';
import { loadAnimation, selectAnimation } from './models/Animation.js';
import { drawAnimation } from './views/animationView.js';

let player = new Character('woodcutter', 3, 0);
let playerIdleAnim = loadAnimation('idle', player, 4);
let playerWalkAnim = loadAnimation('walk', player, 6);
let playerAnimArr = [playerIdleAnim, playerWalkAnim];
let playerAnimToPlay = playerAnimArr[0];
const msPerFrame = 33.33; // 30 FPS aka 33.33 ms per frame. 1000 ms / FPS = ms per frame.

requestAnimationFrame(gameLoop);

async function gameLoop() {
    let startTime = new Date();
    startTime = startTime.getTime();

    drawAnimation(playerAnimToPlay);
    let iterateLoop = await compareTimes(startTime); // Wait to repeat gameLoop until 33.33 ms have passed since this cycle of gameLoop began.
    requestAnimationFrame(gameLoop);
}

function compareTimes(startTime) {
    const iterationDuration = (startTime + msPerFrame); // The time in ms when we should reiterate gameLoop.
    let currTime = new Date();
    currTime = currTime.getTime();

    // While the current time in ms is less than iterationDuration, keep adjusting the previous current time to be the new current time
    while (currTime < iterationDuration) {
        let newTime = new Date();
        newTime = newTime.getTime();
        currTime = newTime;
    }
    return true;
}



window.addEventListener('keydown', pressMoveKey);
window.addEventListener('keyup', releaseMoveKey);

let addKeyUpListener = false;

function pressMoveKey(e) {
    if (e.code === 'KeyA' || e.code === 'KeyD') { // Left and right movement keys
        window.removeEventListener('keydown', pressMoveKey);
        playerAnimToPlay = playerAnimArr[1];
        if (addKeyUpListener === true) {
            window.addEventListener('keyup', releaseMoveKey);
        }
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
