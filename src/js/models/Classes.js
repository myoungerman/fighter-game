class GameObject {
    constructor (canCollide, canMove, width, height) {
        this.canCollide = canCollide;
        this.canMove = canMove;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
}

class Character extends GameObject {
    constructor (characterType, health, armor, x, y) {
        super(true, true);
        this.type = characterType;
        this.health = health;
        this.armor = armor;
        this.facing = 'right';
        this.currAction = 'idle';
        this.location = [x, y];
    }
}

class SceneryObject {
    constructor(img, objX, objY){
        this.imgPath = `../../../img/map/objects/${img}.png`;
        this.x = objX;
        this.y = objY;
        this.width = 0;
        this.height = 0;
    }
}
export { Character, GameObject, SceneryObject };
