function loadAnimation (action, character, imgNumFrames) {
    let img = new Image();
    img.src = `../../../img/${character}/${character}_${action}.png`;

    let actionData = [img.src, img.height, 0]; // Will contain img path, height, and the x-coord for each frame of the action.
    let frameWidth = img.width / imgNumFrames;
    let counter = frameWidth;
    
    while (counter < img.width) {
        actionData.push(counter);
        counter += frameWidth;
    }
    console.log(`in loadanimation, actionData is ${actionData}`);
    return actionData;
};

export { loadAnimation };