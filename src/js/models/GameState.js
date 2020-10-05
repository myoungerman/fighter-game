export { loadMap, loadBackgroundObjs };

function loadMap() {
    let map = {
        cols: 18, // Swamp background img is 18 tiles across and 10 tiles high
        rows: 10,
        tsize: 32,
        tiles: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          33, 33, 34, 0, 0, 0, 0, 0, 32, 34, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 60, 2, 2,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          20, 10, 3, 0, 0, 47, 2, 2, 20, 3, 0, 0, 0, 16, 12, 12, 12, 12
        ],
        getTile: function(col, row) {
          let tile = this.tiles[row * map.cols + col];
          let sourceY = 0;
 
        let remainder = 0;
        let sourceX = 0;

        /*
        Calculate x coord of current tile by finding the first tile in its column in the tileset image 
        */
        if (tile > 10) { // Only needed if we aren't already in the first row of tiles
            remainder = tile % 10;
            if (remainder === 0) { // If remainder is 0, this tile is in column 10
                remainder = 10; 
            }
            sourceX = (remainder * 32) - 32; 
        } else { // The first row of tiles
            sourceX = (tile * 32) - 32;
        }

        /*
        Calculate source y of current tile. The tileset image has 6 rows, with 10 tiles per row
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
            sourceX: sourceX,
            sourceY: sourceY
        };
        }
    }
    return map;
}

function loadBackgroundObjs() {
    // decide what background objects should exist on the map. Create an array of these items
    // Create an object with 4 properties (folder name, item name, x, y)
    // push each item to an array that we will pass to the draw function

    let boxes = ['../../../img/map/objects/boxes/', 2, [1, 4], [32, 132, 224, 228]]; // img path, amount of this object on the map, images used from that folder, x and y coordinates
    let bushes = [, [], []];
    let fence = [, [], []];
    let grass = [, [], []];
    let ladders = ['../../../img/map/objects/ladders/', 3, [1, 2, 3], [64, 228, 64, 260, 64, 292]];
    let logs = [, [], []];
    let pointers = [, [], []];
    let stones = [, [], []];
    let trees = [, [], []];
    let willows = [, [], []];

    let backgroundObjArr = [boxes, ladders];

    return backgroundObjArr;
}