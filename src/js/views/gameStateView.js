export { drawBackground, drawMap, drawBackgroundObjs };

const background = document.getElementById('background');
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

function drawBackground() {
    let swampBackground = new Image();
    swampBackground.src = "../../../img/map/background/background.png";
    background.src = swampBackground.src;
    //background.style.zIndex = -2;
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

function drawBackgroundObjs(objArr) {
  // Each el of objArr is something like: ['../../../img/map/objects/boxes/', 2, [1, 4], [32, 132, 224, 228]]
  // img path, amount of this object on the map, images used from that folder, x and y coordinates
  objArr.forEach((el) => {
    let xIndex = 0;
    let yIndex = 1;
    // for the length of [1], draw using [3] for img srcs and [4] for the coordinates
    for (let i = 0; i < el[1]; i++) {
      let img = new Image();
      img.src = `${el[0]}${el[2][i]}.png`;
      img.addEventListener('load', () => {
        ctx.drawImage(
          img,
          el[3][xIndex],
          el[3][yIndex]
        );
        xIndex += 2;
        yIndex += 2;  
      });
    }
  });
}