class GameObject {
    constructor (canCollide, canMove) {
        this.canCollide = canCollide;
        this.canMove = canMove;
        this.initialX = 0;
        this.initialY = 0;
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
export { Character, GameObject };
