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
console.log(arr[0]);
    if (lastAnim === '') { // No previous animation
        lastAnim = arr[0];
    } else if (lastAnim !== arr[0]) { // New animation, so reset the time and the current frame, update lastAnim to the new image
        lastAnim = arr[0];
        j = 2;
        time = 0;
    } else { // Same animation as last time
    }

    if (Number.isInteger(time / 10)) { // Reduce the animation speed
        if (anim.src.includes('walk')) { 
            ctx.clearRect(playerObj.location[0] - 2.97, playerObj.location[1], arr[3], anim.height); // Erase the location where the player just walked   
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