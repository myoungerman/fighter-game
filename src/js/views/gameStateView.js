export { drawBackground, drawMap };

const background = document.getElementById('background');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");

function drawBackground() {
    let swampBackground = new Image();
    swampBackground.src = "../../../img/map/background/background.png";
    background.src = swampBackground.src;
    background.style.zIndex = -1;
    background.style.position = 'absolute';
}

function drawMap(map) {
    let tileAtlas = new Image();
    tileAtlas.src = "../../../img/map/tiles/tileset.png";

    tileAtlas.addEventListener('load', () => {
        for (let c = 0; c < map.cols; c++) {
            for (let r = 0; r < map.rows; r++) {
              let tile = map.getTile(c, r);
    
              if (tile.tile !== 0) { // 0 => empty tile
                ctx.drawImage(
                  tileAtlas, // image
                  tile.sourceX,
                  tile.sourceY, // source y
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
    });
}