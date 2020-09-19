export { detectTileLocation };
import { GameObject } from './Classes.js';

function detectTileLocation(map) {
    let tileArr = [];

    for (let c = 0; c < map.cols; c++) {
        for (let r = 0; r < map.rows; r++) {
          let tile = map.getTile(c, r);
          let tileObj = {};

        if (tile.tile !== 0) {
            tileObj = new GameObject(true, false);
        } else {
            tileObj = new GameObject(false, false);
        }
        tileObj.initialX = c * map.tsize; // target x
        tileObj.initialY = r * map.tsize; // target y
        tileArr.push(tileObj);
        }
      }   

      return tileArr;
}
