export { detectCollision };

/*

ADVANCED COLLISION FEATURES:
If the player is on a tile that is sloped, increment their x and y value
as they walk to account for the tile's slope.

If the player is not jumping and all tiles directly beneath them are
empty, the player falls offscreen and dies.

*/

let collision = false;

function detectCollision(rect1, rect2) { // parameters are playerObj and tileArr
    collision = false;
    rect2.forEach((el) => {
            if (rect1.location[0] < el.initialX + el.width &&
                rect1.location[0] + rect1.width > el.initialX &&
                rect1.location[1] < el.initialY + el.height &&
                rect1.location[1] + rect1.height > el.initialY) { // collision detected, handle objects accordingly
                    collision = true;
                    return collision;
                }    
    });
    return collision;
}