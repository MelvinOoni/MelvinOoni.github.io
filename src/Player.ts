/// <reference path = "Entity.ts"/>
/// <reference path = "KeyboardListener.ts"/>

class Player extends Entity {

    private readonly keyBoardListener: KeyBoardListener;
    private lives: number;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        lives: number = 3
    ) {
        super(canvas, imgSource, xPos, yPos, width, height);

        this.keyBoardListener = new KeyBoardListener();
        this.lives = lives;
    }

    public move(): void {
        if (this.keyBoardListener.getLeftPressed()) {
            this.xPos -= 8;
        }
        if (this.keyBoardListener.getRightPressed()) {
            this.xPos += 8;
        }
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        if (this.getX() + (this.getWidth()) > window.innerWidth) {
            this.xPos = window.innerWidth - (this.getWidth())
        }
    }

    public isCollidingWithBallLeft(enemy: Ball): boolean {
        if (
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (1 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }

    public isCollidingWithBallMiddle(enemy: Ball): boolean {
        if (
            this.getX() + 67 < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (2 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }


    public isCollidingWithBallRight(enemy: Ball): boolean {
        if (
            this.getX() + 134 < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (3 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }

    public getLives(): number {
        return this.lives;
    }

    public removeLife() {
        this.lives --;
        if (this.lives == 0) {
            alert('Game over! Je bent al je levens kwijtgeraakt')
            location.reload();
        }
    }
}