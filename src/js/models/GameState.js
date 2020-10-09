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
          33, 33, 34, 0, 0, 0, 0, 0, 32, 33, 34, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 10, 60, 2, 2,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 12, 12, 12, 12,
          20, 10, 3, 0, 0, 47, 2, 2, 20, 2, 3, 0, 0, 16, 12, 12, 12, 12
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
    /*
    Array indices represent:
    Img category, instances of this object on the map, all image variants used, x and y of each instance
    */
    let boxes = ['boxes/', 2, [1, 4], [32, 133, 224, 262]]; 
    let bushes = [, [], []];
    let fence = [, [], []];
    let grass = [, [], []];
    let ladders = ['ladders/', 4, [3, 3, 2, 1], [65, 162, 65, 194, 65, 226, 65, 258]];
    let logs = ['logs/', 2, [1, 4], [0, 133, 32, 228]];
    let pointers = ['pointers/', 3, [1, 3, 7], []];
    let stones = ['stones/', 0, [], []];
    let trees = ['trees/', 1, [3], [176, 138]];
    let willows = ['willows/', 1, [3], [384, 10]];

    let sceneryCategories = [trees, willows, logs, boxes, ladders, pointers];
    let allSceneryObjs = [];

    sceneryCategories.forEach((el) => { // Create an object for each piece of scenery
        let xIndex = 0;
        let yIndex = 1;
        for (let i = 0; i < el[1]; i++) {
            let item = new SceneryObject(`${el[0]}${el[2][i]}`, el[3][xIndex], el[3][yIndex]);
            xIndex += 2;
            yIndex += 2; 
            allSceneryObjs.push(item);
        }
    });

    return allSceneryObjs;
}

import { SceneryObject } from './Classes.js';
