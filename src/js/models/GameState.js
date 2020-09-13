export { loadMap };

function loadMap() {
    let tileSet = new Image();
    tileSet.src = "../../../img/map/tiles/tileset.png";

    // background img is 18 tiles across and 10 tiles high. Each tile is 32x32.
    let map = {
        cols: 18,
        rows: 10,
        tsize: 32,
        tiles: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          33, 33, 34, 0, 0, 0, 0, 0, 32, 34, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 60, 2, 2,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          20, 10, 3, 0, 0, 47, 2, 2, 20, 3, 0, 0, 16, 12, 12, 12, 12, 12
        ],
        getTile: function(col, row) {
          let tile = this.tiles[row * map.cols + col];
          let sourceY = 0;
 
        /*
            if getTile returns 1-10, source y is 0
            11-20, source y is 32
            21-30, source y is 64
            31-40, source y is 96
            41-50, source y is 128
            51-60, source y is 160
        */

            if (tile >= 11 && tile <= 20) {
            sourceY = 32;
            } else if (tile >= 21 && tile <= 30) {
            sourceY = 64;
            } else if (tile >= 31 && tile <= 40) {
            sourceY = 96;
            } else if (tile >= 41 && tile <= 50) {
                sourceY = 128;
            } else if (tile >= 51 && tile <= 60) {
                sourceY = 160;
            } else {
                sourceY = 0;
            }

          return {
              tile: tile,
              sourceY: sourceY
          };
        }
    }
    return map;
}

/*
tileSet is 10 tiles wide (320px) and 6 tiles high (192px)

tile is 1, draws tile from (0,0).
tile is 10, draws tile from (288, 0)
*/