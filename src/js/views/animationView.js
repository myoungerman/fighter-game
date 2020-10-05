const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

let time = 0;
let j = 2;
let lastAnim = '';

ctx.imageSmoothingEnabled = false;

function drawAnimation (arr, playerObj) {
    let anim = new Image();
    anim.src = arr[0];
    let numFrames = arr.length - 2; // arr[0] and arr[1] aren't animation frames, so exclude them

    if (lastAnim === '') { // No previous animation
        lastAnim = arr[0];
    } else if (lastAnim !== arr[0]) { // New animation, so reset the time and the current frame, update lastAnim to the new image
        lastAnim = arr[0];
        j = 2;
        time = 0;
    } else { // Same animation as last time
    }

    let animSpeed = 5;

    if (anim.src.includes('idle')) {
        animSpeed = 8;
    }

    if (Number.isInteger(time / animSpeed)) { // Reduce the animation speed
        if (anim.src.includes('run')) { 
            ctx.clearRect(playerObj.location[0] - 6.6, playerObj.location[1], arr[3], anim.height); // Erase  where the player just walked           
        } else if (anim.src.includes('jump')) {
            ctx.clearRect(playerObj.location[0] - 19.3, playerObj.location[1], arr[3], anim.height); // 19.3 is the result of 3.86 px movement per gameLoop * 5 (how often a new frame is drawn)  
        } else {
            ctx.clearRect(playerObj.location[0], playerObj.location[1], arr[3], anim.height); // Erase the frame where the player is currently idling
        }
        
        ctx.drawImage(anim, arr[j], 0, arr[3], arr[1], playerObj.location[0], playerObj.location[1], arr[3], arr[1]); // arr[j] is the x-coord of the current frame
        if (j < numFrames) { // Increment if there are more frames in the animation
            j++;
        } else { // Reset the animation
            j = 2;
        }    
    }
    time++;
};

export { drawAnimation };