class GameObject {
    constructor (canCollide, canMove) {
        this.canCollide = canCollide;
        this.canMove = canMove;
    }
}

class Character extends GameObject {
    constructor (characterType, health, armor) {
        super(true, true);
        this.type = characterType;
        this.health = health;
        this.armor = armor;
        this.facing = 'right';
        this.currAction = 'idle';
    }
}
export { Character, GameObject };
