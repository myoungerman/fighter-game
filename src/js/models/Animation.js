function loadAnimation(action, character, imgNumFrames) {
    let img = new Image();
    img.src = `../../../img/${character.type}/${character.type}_${action}_${character.moving}.png`;
    let actionData = [img.src, img.height, 0]; // Will contain img path, height, and the x-coord for each frame of the action.
    let frameWidth = img.width / imgNumFrames;
    let counter = frameWidth;
    
    while (counter < img.width) {
        actionData.push(counter);
        counter += frameWidth;
    }
    return actionData;    
};

async function loadSrcImages(character, arr) {
    // for each el (an anim) in arr, create a new image obj. Await until all images have loaded, then return an array of img objects
    let imgObjs = [];
    let leftRight = ['left', 'right'];
    let upDown = ['up', 'down'];
    let imagesLoaded = 0;

    arr.forEach((action) => { // load either left and right (for all anims except climb) or up and down
        for (let i = 0; i < 2; i++) {
            let img = new Image();
            if (!action.includes('climb')) {
                img.src = `../../../img/${character.type}/${character.type}_${action}_${leftRight[i]}.png`;
            } else {
                img.src = `../../../img/${character.type}/${character.type}_${action}_${upDown[i]}.png`;
            }
            img.addEventListener('load', () => {
                imgObjs.push(img);
                imagesLoaded++;
                console.log(`loaded ${imagesLoaded} images out of ${arr.length * 2}`);
            });
        }
    });

    let blocker = await (imagesLoaded === (arr.length * 2));
    console.log(`all imgs loaded`);
    return imgObjs;
}

export { loadAnimation, loadSrcImages };