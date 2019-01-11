///<reference path = "Entity.ts"/>

class Ball extends Entity {

    private dPos: number;
    private wPos: number;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        dPos: number = 5,
        wPos: number = 5
    ) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = this.canvas.randomNumber(-dPos, dPos);
        this.wPos = wPos;
    };

    /**
     * A function to move and to prevent the ball from going out of the screen
     */
    public move() {
        this.xPos += this.dPos;
        this.yPos -= this.wPos;
        if (this.getX() < 0) {
            this.dPos = -this.dPos;
            this.xPos = 1;
        };

        if (this.getX() + (this.getWidth()) > this.canvas.getWidth()) {
            this.dPos = -this.dPos;
            this.xPos = this.canvas.getWidth() - this.getWidth() - 1;
        };

        if (this.getY() < 0) {
            this.wPos = -this.wPos;
        };
    };

    /**
     * A function to detect a collision with a block
     * @param enemy 
     */
    public isCollidingWithBlock(enemy: Block): boolean {
        if (
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        };
        return false;
    };

    /**
     * A function to control the ball when he collides with a block
     */
    public collidedWithBlock() {
        this.wPos = -this.wPos;
    };

    /**
     * A function to control the ball when he collides with the left side of the player
     */
    public collidedWithPlayerLeft() {
        this.wPos = 5;
        this.dPos -= 4;
        if (this.dPos < -6) {
            this.dPos = -6;
        };
    };

    /**
     * A function to control the ball when he collides in the middle of the player
     */
    public collidedWithPlayerMiddle() {
        this.wPos = 5;
    };

    /**
     * A function to control the ball when he collides with the right side of the player
     */
    public collidedWithPlayerRight() {
        this.wPos = 5;
        this.dPos += 4;
        if (this.dPos >= 6) {
            this.dPos = 6;
        };
    };

    /**
     * A function to respawn the ball when the player has lost a life
     */
    public removeLife() {
        this.wPos = 3;
        this.yPos = this.canvas.getHeight() - 200;
        this.dPos = this.canvas.randomNumber(-5, 5);
    };

};