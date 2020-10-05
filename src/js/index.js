import { Character, GameObject } from './models/Classes.js';
import { loadAnimation } from './models/Animation.js';
import { loadMap, loadBackgroundObjs } from './models/GameState.js';
import { drawAnimation } from './views/animationView.js';
import { drawBackground, drawMap, drawBackgroundObjs } from './views/gameStateView.js';
import { detectTileLocation } from './models/Coordinates.js';
import { detectCollision } from './models/Collision.js';

let player = new Character('woodcutter', 3, 0, 16, 240);
player.width = 30;
player.height = 48;

let playerIdleAnim = [];
let playerRunAnim = [];
let playerAttack1Anim = [];
let playerJumpAnim = [];
let keysPressed = [];

init();

function init() {
    playerIdleAnim = loadAnimation('idle', player, 4);
    playerRunAnim = loadAnimation('run', player, 6);
    playerAttack1Anim = loadAnimation('attack1', player, 6);
    playerJumpAnim = loadAnimation('jump', player, 6);
}

let playerAnimArr = [playerIdleAnim, playerRunAnim, playerAttack1Anim, playerJumpAnim];
let playerAnimToPlay = playerAnimArr[0];
let counter = 0;
const MsPerFrame = 33.33; // 33.33 ms per frame is 30 FPS. 1000 ms / FPS = ms per frame.

drawBackground();
let scenery = loadBackgroundObjs();
drawBackgroundObjs(scenery);
let map = loadMap();
let tileArr = detectTileLocation(map);
drawMap(map);
requestAnimationFrame(gameLoop);

async function gameLoop() {
    let startTime = new Date();
    startTime = startTime.getTime();

    if (playerAnimToPlay === playerAnimArr[2] || playerAnimToPlay === playerAnimArr[3]) { // Player is attacking or jumping
        counter++;
        if (counter > 30) { // After the entire animation plays, revert to idle
            playerAnimToPlay = playerAnimArr[0];
            player.currAction = 'idle';
            counter = 0;
        }
    }

    if (playerAnimToPlay === playerAnimArr[1] || playerAnimToPlay === playerAnimArr[3]) { // Player is walking or jumping
        let collision = detectCollision(player, tileArr.fullTiles);
        if (collision !== true) {
            if (playerAnimToPlay === playerAnimArr[1]) {
                player.location[0] += 0.66;
            }
            if (playerAnimToPlay === playerAnimArr[3]) {
                if (counter < 24) { // The frame after this is the landing frame of the jump
                    player.location[0] += 3.86; // Player can jump over gaps 3 tiles wide
                }
            }
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
window.addEventListener('keydown', pressJumpKey);
window.addEventListener('keyup', releaseMoveKey);


let addKeyUpListener = false;

function pressMoveKey(e) {
    if (e.code === 'KeyD' && e.code !== 'Space') {
        window.removeEventListener('keydown', pressMoveKey); // Register only one keydown event at a time
        playerAnimToPlay = playerAnimArr[1]; // Walk
        if (addKeyUpListener === true) {
            window.addEventListener('keyup', releaseMoveKey);
        }
    }
}

function pressAttackKey(e) {
    if (e.code === 'KeyF' && (!e.repeat)) {
        playerAnimToPlay = playerAnimArr[2]; // Attack
    }
}

function releaseMoveKey(e) {
    if (e.code === 'KeyD' && e.code !== 'Space') {
        window.removeEventListener('keyup', pressMoveKey);
        playerAnimToPlay = playerAnimArr[0]; // Idle
        addKeyUpListener = true;
        window.addEventListener('keydown', pressMoveKey);
    }
}

function pressJumpKey(e) {
    if ((e.code === 'Space' && e.code === 'KeyD') || e.code === 'Space') {
        playerAnimToPlay = playerAnimArr[3];
        //keyPressed = e.code;
    }
}
