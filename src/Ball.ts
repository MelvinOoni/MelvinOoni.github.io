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
    }

    public move() {
        this.xPos += this.dPos
        this.yPos -= this.wPos
        if (this.getX() < 0) {
            this.dPos = -this.dPos;
        }
        if (this.getX() + (this.getWidth()) > window.innerWidth) {
            this.dPos = -this.dPos;
        }
        if (this.getY() < 0) {
            this.wPos = -this.wPos;
        }
    }

    public isCollidingWithBlock(enemy: Block): boolean {
        if (
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }

    public collidedWithPlayerLeft() {
        this.wPos = 5;
        this.dPos -= 4;
        if (this.dPos < -6) {
            this.dPos = -6;
        }
    }

    public collidedWithPlayerMiddle() {
        this.wPos = 5;
    }

    public collidedWithPlayerRight() {
        this.wPos = 5;
        this.dPos += 4;
        if (this.dPos > 6) {
            this.dPos = 6;
        }
    }

    public removeLife() {
        this.wPos = 4;
        this.yPos = this.canvas.getCenter().Y;
        this.dPos = this.canvas.randomNumber(-5, 5)
    }

    public collidedWithBlock() {
        this.wPos = -this.wPos
    }

}