class GameObject {
    constructor (canCollide, canMove, width, height) {
        this.canCollide = canCollide;
        this.canMove = canMove;
        this.initialX = 0;
        this.initialY = 0;
        this.width = width;
        this.height = height;
    }
}

class Character extends GameObject {
    constructor (characterType, health, armor, initialX, initialY) {
        super(true, true);
        this.type = characterType;
        this.health = health;
        this.armor = armor;
        this.facing = 'right';
        this.currAction = 'idle';
        this.location = [initialX, initialY];
    }
}

class SceneryObject {
    constructor(img, objX, objY){
        this.imgPath = `../../../img/map/objects/${img}.png`;
        this.x = objX;
        this.y = objY;
    }
}
export { Character, GameObject, SceneryObject };
