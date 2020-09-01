const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

function drawAnimation (arr) {

    let time = 0;
    let j = 2;
    let numFrames = arr.length - 2; // Don't include arr[0] and arr[1] in calculations
    let anim = new Image();
    anim.src = arr[0];

    requestAnimationFrame(loop);

    function loop () {
        if (Number.isInteger(time / 20)) { // Reduce the animation speed
            ctx.clearRect(0, 0, arr[3], anim.height);
            ctx.drawImage(anim, arr[j], 0, arr[3], arr[1], 0, 0, arr[3], arr[1]); // arr[j] is the x-coord of the current frame
            
            if (j < numFrames) { // Continue if there are more frames in the animation
                j++;
            } else { // Reset the animation
                j = 2;
            }    
        }
        time++;
        requestAnimationFrame(loop);
    };
};
export { drawAnimation };