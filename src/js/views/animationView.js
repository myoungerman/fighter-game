const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

function drawAnimation (arr) {
    let i = 0;
    let j = 2;
    let numFrames = arr.length - 2;
    let anim = new Image();
    anim.src = arr[0];

    while (i < numFrames) {
        setTimeout(() => {
            console.log(`run cycle`);
            ctx.clearRect(0, 0, arr[3], anim.height);
            ctx.drawImage(anim, arr[j], 0, arr[3], arr[1], 0, 0, arr[3], arr[1]);
            j++;       
        }, 1000);
        i++;   
    }
}

export { drawAnimation };