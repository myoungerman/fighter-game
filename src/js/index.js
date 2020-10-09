import { Character, GameObject } from './models/Classes.js';
import { loadAnimation } from './models/Animation.js';
import { loadMap, loadBackgroundObjs } from './models/GameState.js';
import { drawAnimation } from './views/animationView.js';
import { drawBackground, drawMap, drawBackgroundObjs } from './views/gameStateView.js';
import { detectTileLocation, detectLadderTileOverlap } from './models/Coordinates.js';
import { detectCollision } from './models/Collision.js';

let player = new Character('woodcutter', 3, 0, 16, 240);
player.width = 30;
player.height = 48;

let playerIdleAnim = [];
let playerRunAnim = [];
let playerAttack1Anim = [];
let playerJumpAnim = [];
let playerClimbAnim = [];

init();

function init() {
    playerIdleAnim = loadAnimation('idle', player, 4);
    playerRunAnim = loadAnimation('run', player, 6);
    playerAttack1Anim = loadAnimation('attack1', player, 6);
    playerJumpAnim = loadAnimation('jump', player, 6);
    playerClimbAnim = loadAnimation('climb', player, 6);
}

let playerAnimArr = [playerIdleAnim, playerRunAnim, playerAttack1Anim, playerJumpAnim, playerClimbAnim];
let playerAnimToPlay = playerAnimArr[0];
let counter = 0;
const MsPerFrame = 33.33; // 33.33 ms per frame is 30 FPS. 1000 ms / FPS = ms per frame.

drawBackground();
let map = loadMap();
let tileArr = detectTileLocation(map);
drawMap(map);
let scenery = loadBackgroundObjs();
drawBackgroundObjs(scenery);
let updatedArr = detectLadderTileOverlap(scenery, tileArr.fullTiles);
let fullTiles = updatedArr[0];
let ladderLocations = updatedArr[1];
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

    // Player is walking, jumping, or climbing
    if (playerAnimToPlay === playerAnimArr[1] || playerAnimToPlay === playerAnimArr[3] || playerAnimToPlay === playerAnimArr[4]) {
        let collision = detectCollision(player, fullTiles);
        console.log(collision);
        if (collision !== true) {
            if (playerAnimToPlay === playerAnimArr[1]) {
                player.location[0] += 0.66;
            }
            if (playerAnimToPlay === playerAnimArr[3]) {
                if (counter < 24) { // The frame after this is the landing frame of the jump
                    player.location[0] += 3.86; // Player can jump over gaps 3 tiles wide
                }
            }
            if (playerAnimToPlay === playerAnimArr[4] && detectCollision(player, ladderLocations)) {
                player.location[1] -= 0.66;
            }
            if (playerAnimToPlay === playerAnimArr[4] && !detectCollision(player, ladderLocations)) {
                playerAnimToPlay = playerAnimArr[0];
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
window.addEventListener('keydown', pressClimbKey);
window.addEventListener('keyup', releaseClimbKey);


let addKeyUpListener = false;
let addClimbListener = false;

function pressMoveKey(e) {
    if (e.code === 'KeyD') {
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
    if (e.code === 'KeyD') {
        window.removeEventListener('keyup', pressMoveKey);
        playerAnimToPlay = playerAnimArr[0]; // Idle
        addKeyUpListener = true;
        window.addEventListener('keydown', pressMoveKey);
    }
}

function pressJumpKey(e) {
    if (e.code === 'Space') {
        playerAnimToPlay = playerAnimArr[3];
    }
}

function pressClimbKey(e) {
    if (e.code === 'KeyW') {
        if (detectCollision(player, ladderLocations)) { // Player is touching a ladder
            window.removeEventListener('keydown', pressClimbKey); // Register only one keydown event at a time
            playerAnimToPlay = playerAnimArr[4]; // Climb
            if (addClimbListener === true) {
                window.addEventListener('keyup', releaseClimbKey);
            }    
        }
    }
}

function releaseClimbKey(e) {
    if (e.code === 'KeyW') {
            window.removeEventListener('keyup', pressClimbKey);
            if (detectCollision(player, ladderLocations)) {
                playerAnimToPlay = playerAnimArr[4]; // Loop climb while the player is on the ladder
            } else {
                playerAnimToPlay = playerAnimArr[0]; // Idle
            }
            addClimbListener = true;
            window.addEventListener('keydown', pressClimbKey);
    }
}