/*
PROBLEM:
Given a certain map object, I must be able to determine the coordinates
of each map tile. 

Based on the coordinate of the map tile and the current coordinates of
the player, stop the player from moving through a tile if the player's
coords overlap with the tile coords.

Get the map object and store the coordinates of every value that isn't zero. Split the
coordinates into 4 quadrants based on map size.

Check the player's x and y. If their bounding box is touching a tile, pause the player's x and y at their current values

ADVANCED COLLISION FEATURES:
If the player is on a tile that is sloped, increment their x and y value
as they walk to account for the tile's slope.

If the player is not jumping and all tiles directly beneath them are
empty, the player falls offscreen and dies.

*/

// Get the map object

// Divide the map into 4 equal quadrants with unique identifiers

//


function detectCollision() {
    // in game loop, look for collision

    var rect1 = {x: 5, y: 5, width: 50, height: 50}
    var rect2 = {x: 20, y: 10, width: 10, height: 10}

    if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
        // collision detected!
    }
}