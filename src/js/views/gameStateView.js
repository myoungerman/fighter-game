export { createBackground };

const background = document.getElementById('background');

function createBackground() {
    let swampBackground = new Image();
    swampBackground.src = "../../../img/map/background/background.png";
    background.src = swampBackground.src;
    background.style.zIndex = -1;
    background.style.position = 'absolute';
}

