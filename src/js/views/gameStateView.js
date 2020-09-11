export { createBackground };

const background = document.getElementById('background');

function createBackground() {
    let swampBackground = new Image();
    swampBackground.src = "../../../img/map/background/background.png";
    background.src = swampBackground.src;
    background.style.zIndex = -1;
    background.style.position = 'absolute';
}

function drawMap() {
    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
          let tile = map.getTile(c, r);
          if (tile !== 0) { // 0 => empty tile
            context.drawImage(
              tileAtlas, // image
              (tile - 1) * map.tsize, // source x
              0, // source y
              map.tsize, // source width
              map.tsize, // source height
              c * map.tsize, // target x
              r * map.tsize, // target y
              map.tsize, // target width
              map.tsize // target height
            );
          }
        }
      }
}