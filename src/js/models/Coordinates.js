export { detectTileLocation };
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
        tileObj.initialX = c * map.tsize; // Target x
        tileObj.initialY = r * map.tsize; // Target y
        //tileArr.push(tileObj);
        }
      }   
// return an obj containing 2 arrays, one with the empty tiles and one with the full tiles
      return tileArr;
}
