export { detectTileLocation, detectLadderTileOverlap };
import { GameObject } from './Classes.js';

function detectTileLocation(map) {
    let tileArr = {
      emptyTiles: [],
      fullTiles: []
    };

    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
          let tile = map.getTile(c, r);
          let tileObj = {};

        if (tile.tile !== 0) {
            tileObj = new GameObject(true, false, 32, 32); // Can collide
            tileArr.fullTiles.push(tileObj);
        } else {
            tileObj = new GameObject(false, false, 32, 32); // Cannot collide
            tileArr.emptyTiles.push(tileObj);
        }
        tileObj.x = c * map.tsize; // Target x
        tileObj.y = r * map.tsize; // Target y
        }
      }   
      // return an obj containing 2 arrays, one with the empty tiles and one with the full tiles
      return tileArr;
}

function detectLadderTileOverlap(scenery, fullTiles) {
    let ladders = [];

    scenery.forEach((el) => {
      if (el.imgPath.includes('ladder')) {
        ladders.push(el); // Store all of the ladder objects
      }
    });

    ladders.forEach((el) => {
      // if the ladder obj x and y fall on or between the tile's x to x + width and y to y + height or vice versa, remove that
      // tile from tileArr
      fullTiles.forEach((tile) => {
        if (el.x >= tile.x && el.x <= tile.x + tile.width
            && el.y >= tile.y && el.y <= tile.y + tile.height) {
              let index = fullTiles.indexOf(tile);
              fullTiles.splice(index, 1);
            }
      });
    });
    return [fullTiles, ladders];
}