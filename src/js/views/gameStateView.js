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

    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
          let tile = map.getTile(c, r);
          if (tile !== 0) { // 0 => empty tile
            ctx.drawImage(
              tileAtlas, // image
              (tile - 1) * map.tsize, // source x
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
      console.log('drew map');
}
// adjust the source y based on what row we're in.
// if tile index is > 18 but < than 36 (so second row), source y is 32. max source y is 160
// round the tile index to the lowest closest multiple of 18 (E.g. 36)
// 36 / the row (2) would give us the source y, which we oculd increment by 32
// get result of. we could multiply 32 * the row number to get the source y