class Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height) {
        this.canvas = new Canvas(canvas);
        this.imgSource = imgSource;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    ;
    draw() {
        this.canvas.writeImageToCanvas(this.imgSource, this.xPos, this.yPos);
    }
    ;
    getX() {
        return this.xPos;
    }
    ;
    getY() {
        return this.yPos;
    }
    ;
    getWidth() {
        return this.width;
    }
    ;
    getHeight() {
        return this.height;
    }
    ;
}
;
class Ball extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height, dPos = 5, wPos = 5) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = this.canvas.randomNumber(-dPos, dPos);
        this.wPos = wPos;
    }
    ;
    move() {
        this.xPos += this.dPos;
        this.yPos -= this.wPos;
        if (this.getX() < 0) {
            this.dPos = -this.dPos;
            this.xPos = 1;
        }
        ;
        if (this.getX() + (this.getWidth()) > this.canvas.getWidth()) {
            this.dPos = -this.dPos;
            this.xPos = this.canvas.getWidth() - this.getWidth() - 1;
        }
        ;
        if (this.getY() < 0) {
            this.wPos = -this.wPos;
        }
        ;
    }
    ;
    isCollidingWithBlock(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        ;
        return false;
    }
    ;
    collidedWithBlock() {
        this.wPos = -this.wPos;
    }
    ;
    collidedWithPlayerLeft() {
        this.wPos = 5;
        this.dPos -= 4;
        if (this.dPos < -6) {
            this.dPos = -6;
        }
        ;
    }
    ;
    collidedWithPlayerMiddle() {
        this.wPos = 5;
    }
    ;
    collidedWithPlayerRight() {
        this.wPos = 5;
        this.dPos += 4;
        if (this.dPos >= 6) {
            this.dPos = 6;
        }
        ;
    }
    ;
    removeLife() {
        this.wPos = 3;
        this.yPos = this.canvas.getHeight() - 200;
        this.dPos = this.canvas.randomNumber(-5, 5);
    }
    ;
}
;
class Block extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height) {
        super(canvas, imgSource, xPos, yPos, width, height);
    }
    ;
}
;
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.clicks = 0;
        this.easyClicks = 0;
        this.topoClicks = 0;
        this.difficultClicks = 0;
    }
    ;
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ;
    writeTextToCanvas(text, fontSize, xCoordinate, yCoordinate, color, aligment = "center") {
        this.ctx.font = `${fontSize}px Mars`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = aligment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    ;
    writeImageToCanvas(src, xCoordinate, yCoordinate) {
        let element = document.createElement("img");
        element.src = src;
        element.style.zIndex = "-1";
        element.addEventListener("load", () => {
            this.ctx.drawImage(element, xCoordinate, yCoordinate);
        });
    }
    ;
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    ;
    getCenter() {
        return { X: this.canvas.width / 2, Y: this.canvas.height / 2 };
    }
    ;
    writeStartButtonToCanvas(src, imageWidth, imageHeight, imageYpos) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.clicks == 0) {
                        this.clearCanvas();
                        const difficultView = new DifficultyView();
                        difficultView.createScreen();
                        this.clicks++;
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    writeEasyDifficultyButtonToCanvas(src, imageWidth, imageHeight, imageYpos) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.easyClicks == 0) {
                        this.clearCanvas();
                        this.easyClicks++;
                        this.startEasyCountdown(3);
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    writeTopoDifficultyButtonToCanvas(src, imageWidth, imageHeight, imageYpos) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.topoClicks == 0) {
                        this.clearCanvas();
                        this.topoClicks++;
                        this.startTopoCountdown(3);
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    writeDifficultDifficultyButtonToCanvas(src, imageWidth, imageHeight, imageYpos) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.difficultClicks == 0) {
                        this.clearCanvas();
                        this.difficultClicks++;
                        this.startDifficultCountdown(3);
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    startEasyCountdown(seconds) {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");
        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white");
            counter--;
            if (counter < 0) {
                clearInterval(interval);
                levelView.setEasyQuestions();
            }
            ;
        }, 1000);
    }
    ;
    startTopoCountdown(seconds) {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");
        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white");
            counter--;
            if (counter < 0) {
                clearInterval(interval);
                levelView.setTopoQuestions();
            }
            ;
        }, 1000);
    }
    ;
    startDifficultCountdown(seconds) {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");
        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white");
            counter--;
            if (counter < 0) {
                clearInterval(interval);
                levelView.setDifficultQuestions();
            }
            ;
        }, 1000);
    }
    ;
    writeTryAgainButtonToCanvas(src, imageWidth, imageHeight, imageYpos) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;
        let buttonElement = document.createElement("img");
        buttonElement.src = src;
        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
            this.clicks = 1;
        });
        this.canvas.addEventListener("click", (event) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.clicks == 1) {
                        location.reload();
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    getHeight() {
        return this.canvas.height;
    }
    ;
    getWidth() {
        return this.canvas.width;
    }
    ;
}
;
class Game {
    constructor() {
        this.draw = () => {
            this.startView.createScreen();
        };
        this.startView = new StartView();
        this.playBackgroundAudio();
        window.setInterval(this.playBackgroundAudio, 100000);
        this.draw();
    }
    ;
    playBackgroundAudio() {
        let audio = new Audio();
        audio.src = "./assets/sounds/backgroundmusic.mp3";
        audio.load();
        audio.play();
    }
    ;
}
;
window.addEventListener('load', init);
function init() {
    const gameName = new Game();
}
;
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = true;
            }
            ;
            if (event.keyCode == 39) {
                this.rightPressed = true;
            }
            ;
            if (event.keyCode == 49 || event.keyCode == 97) {
                this.onePressed = true;
            }
            ;
            if (event.keyCode == 50 || event.keyCode == 98) {
                this.twoPressed = true;
            }
            ;
            if (event.keyCode == 51 || event.keyCode == 99) {
                this.threePressed = true;
            }
            ;
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            ;
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
            ;
            if (event.keyCode == 49 || event.keyCode == 97) {
                this.onePressed = false;
            }
            ;
            if (event.keyCode == 50 || event.keyCode == 98) {
                this.twoPressed = false;
            }
            ;
            if (event.keyCode == 51 || event.keyCode == 99) {
                this.threePressed = false;
            }
            ;
        };
        this.leftPressed = false;
        this.rightPressed = false;
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    ;
    getLeftPressed() {
        return this.leftPressed;
    }
    ;
    getRightPressed() {
        return this.rightPressed;
    }
    ;
    getOnePressed() {
        return this.onePressed;
    }
    ;
    getTwoPressed() {
        return this.twoPressed;
    }
    ;
    getThreePressed() {
        return this.threePressed;
    }
    ;
    resetAnswer() {
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
    }
    ;
}
;
class Player extends Entity {
    constructor(canvas, imgSource, xPos, yPos, width, height) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.keyBoardListener = new KeyBoardListener();
    }
    move() {
        if (this.keyBoardListener.getLeftPressed()) {
            this.xPos -= 8;
        }
        ;
        if (this.keyBoardListener.getRightPressed()) {
            this.xPos += 8;
        }
        ;
        if (this.xPos < 0) {
            this.xPos = 0;
        }
        ;
        if (this.getX() + (this.getWidth()) > window.innerWidth) {
            this.xPos = window.innerWidth - (this.getWidth());
        }
        ;
    }
    ;
    isCollidingWithBallLeft(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (1 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        ;
        return false;
    }
    ;
    isCollidingWithBallMiddle(enemy) {
        if (this.getX() + 67 < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (2 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        ;
        return false;
    }
    ;
    isCollidingWithBallRight(enemy) {
        if (this.getX() + 134 < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() * (3 / 3) > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        ;
        return false;
    }
    ;
}
;
class ViewBase {
    constructor() {
        const canvasElement = document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }
    ;
}
;
class DifficultyView extends ViewBase {
    constructor() {
        super();
        this.createScreen = () => {
            this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, this.canvas.getCenter().Y - 275, "white", "center");
            this.canvas.writeTextToCanvas('Kies een niveau:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 185, "white", "center");
            this.canvas.writeTextToCanvas("Kies je moeilijkheidsgraad om het spel te beginnen. De balk bestuur je met de pijltjestoetsen", 20, this.canvas.getCenter().X, this.canvas.getHeight() - 50, "white");
            this.canvas.writeEasyDifficultyButtonToCanvas("./assets/images/makkelijk.png", 302, 70, this.canvas.getCenter().Y - 250);
            this.canvas.writeTopoDifficultyButtonToCanvas("./assets/images/topografie.png", 348, 73, this.canvas.getCenter().Y - 400);
            this.canvas.writeDifficultDifficultyButtonToCanvas("./assets/images/moeilijk.png", 253, 71, this.canvas.getCenter().Y - 550);
        };
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
    }
    ;
}
;
class LevelView extends ViewBase {
    constructor() {
        super();
        this.imageArray = [
            "./assets/images/blocks/redBlock.png",
            "./assets/images/blocks/greenBlock.png",
            "./assets/images/blocks/orangeBlock.png",
            "./assets/images/blocks/yellowBlock.png"
        ];
        this.createScreen = () => {
            if (this.gameState === "START") {
                this.player.draw();
                this.ball.draw();
                this.canvas.writeTextToCanvas(`score: ${this.score}`, 40, 10, this.canvas.getHeight() - 60, "black", "left");
                this.canvas.writeTextToCanvas(`lives: ${this.lives}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                for (let index = 0; index < this.blockArray.length; index++) {
                    this.blockArray[index].draw();
                }
                ;
            }
            ;
            if (this.gameState === "PLAY") {
                this.canvas.clearCanvas();
                this.ball.move();
                this.player.move();
                this.ball.draw();
                this.player.draw();
                this.canvas.writeTextToCanvas(`score: ${this.score}`, 40, 10, this.canvas.getHeight() - 60, "black", "left");
                this.canvas.writeTextToCanvas(`lives: ${this.lives}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                if (this.player.isCollidingWithBallLeft(this.ball)) {
                    this.ball.collidedWithPlayerLeft();
                }
                ;
                if (this.player.isCollidingWithBallMiddle(this.ball)) {
                    this.ball.collidedWithPlayerMiddle();
                }
                ;
                if (this.player.isCollidingWithBallRight(this.ball)) {
                    this.ball.collidedWithPlayerRight();
                }
                ;
                for (let index = 0; index < this.blockArray.length; index++) {
                    this.blockArray[index].draw();
                    if (this.ball.isCollidingWithBlock(this.blockArray[index])) {
                        this.ball.collidedWithBlock();
                        this.blockArray.splice(index, 1);
                        this.score += 20;
                        if (this.blockArray.length < 1) {
                            this.score += 100;
                            this.gameState = "SCORE";
                            let scoreView = new Score(this.score);
                        }
                        if (this.blockArray.length == 28 || this.blockArray.length == 24 || this.blockArray.length == 20 || this.blockArray.length == 16 || this.blockArray.length == 12 || this.blockArray.length == 8 || this.blockArray.length == 4) {
                            this.questionAnswer = null;
                            this.numberRandom = this.canvas.randomNumber(0, this.questions.length - 1);
                            this.gameState = "QUESTION";
                            document.body.style.background = "url('./assets/images/backgrounds/questionView.png') no-repeat ";
                            document.body.style.backgroundSize = "cover";
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
                this.score -= 50;
                this.removeLife();
                this.ball.removeLife();
            }
            ;
            if (this.gameState === "QUESTION") {
                this.canvas.clearCanvas();
                this.canvas.writeImageToCanvas(`./assets/images/question/${this.questions[this.numberRandom].picture}`, 25, 200);
                this.canvas.writeTextToCanvas("Druk het juiste cijfer in op je toetsenbord, om antwoord te geven op de vraag", 20, this.canvas.getCenter().X, 50, "white");
                this.canvas.writeTextToCanvas(`${this.questions[this.numberRandom].question}`, 30, this.canvas.getCenter().X, 125, "white");
                this.canvas.writeTextToCanvas(` 1: ${this.questions[this.numberRandom].a}`, 50, this.canvas.getCenter().X - 25, 295, "white", "left");
                this.canvas.writeTextToCanvas(`2: ${this.questions[this.numberRandom].b}`, 50, this.canvas.getCenter().X - 25, 395, "white", "left");
                this.canvas.writeTextToCanvas(`3: ${this.questions[this.numberRandom].c}`, 50, this.canvas.getCenter().X - 25, 495, "white", "left");
                if (this.keyBoardListener.getOnePressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].a;
                    this.compareAnswers();
                }
                ;
                if (this.keyBoardListener.getTwoPressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].b;
                    this.compareAnswers();
                }
                ;
                if (this.keyBoardListener.getThreePressed()) {
                    this.questionAnswer = this.questions[this.numberRandom].c;
                    this.compareAnswers();
                }
                ;
            }
            ;
        };
        this.compareAnswers = () => {
            if (this.questions[this.numberRandom].answer === this.questionAnswer) {
                this.gameState = "COUNTDOWN";
                this.score += 100;
                this.startRightCountdown(8);
            }
            else {
                this.gameState = "COUNTDOWN";
                this.score -= 50;
                this.startWrongCountdown(8);
            }
            ;
        };
        const canvasElement = document.getElementById('canvas');
        this.player = new Player(canvasElement, "./assets/images/player/playerBlue.png", this.canvas.getCenter().X - 100, this.canvas.getHeight() - 30, 200, 25);
        this.ball = new Ball(canvasElement, "./assets/images/balls/redball.png", this.canvas.getCenter().X - 17, this.canvas.getHeight() - 200, 35, 35);
        this.keyBoardListener = new KeyBoardListener();
        this.blockArray = [];
        this.gameState = "START";
        this.score = 0;
        this.lives = 3;
        this.blockRow = 0;
        this.questionAnswer = null;
        document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        this.makeBlockArray();
        this.createScreen();
    }
    ;
    startRightCountdown(seconds) {
        var counter = seconds;
        this.canvas.clearCanvas();
        this.playAudio("./assets/sounds/correctanswer.mp3");
        this.canvas.writeTextToCanvas(`${this.questions[this.numberRandom].question}`, 30, this.canvas.getCenter().X, 125, "white");
        var interval = setInterval(() => {
            if (counter > 3) {
                this.canvas.clearCanvas();
                this.canvas.writeImageToCanvas(`./assets/images/question/${this.questions[this.numberRandom].picture}`, 25, 200);
                this.canvas.writeTextToCanvas(`Je antwoord ${this.questionAnswer} is goed. Je hebt 100 punten verdiend`, 30, this.canvas.getCenter().X, 125, "white");
                this.canvas.writeTextToCanvas(`${counter}`, 150, this.canvas.getCenter().X + 235, this.canvas.getCenter().Y + 350, "white");
                this.canvas.writeImageToCanvas("./assets/images/goedgedaan.png", this.canvas.getCenter().X + 100, this.canvas.getCenter().Y - 150);
            }
            ;
            counter--;
            if (counter < 3) {
                this.canvas.clearCanvas();
                document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
                document.body.style.backgroundSize = "cover";
                this.canvas.writeTextToCanvas(`${counter}`, 250, this.canvas.getCenter().X, this.canvas.getCenter().Y + 150, "white");
                this.canvas.writeTextToCanvas(`score: ${this.score}`, 40, 10, this.canvas.getHeight() - 60, "black", "left");
                this.canvas.writeTextToCanvas(`lives: ${this.lives}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                this.player.draw();
                this.ball.draw();
                for (let index = 0; index < this.blockArray.length; index++) {
                    this.blockArray[index].draw();
                }
                ;
            }
            ;
            if (counter < 0) {
                clearInterval(interval);
                this.questions.splice(this.numberRandom, 1);
                this.gameState = "PLAY";
                this.canvas.clearCanvas();
                this.keyBoardListener.resetAnswer();
            }
            ;
        }, 1000);
    }
    ;
    startWrongCountdown(seconds) {
        var counter = seconds;
        this.canvas.clearCanvas();
        this.playAudio("./assets/sounds/wronganswer.mp3");
        this.canvas.writeTextToCanvas(`${this.questions[this.numberRandom].question}`, 30, this.canvas.getCenter().X, 125, "white");
        this.removeLife();
        if (this.lives > 0) {
            var interval = setInterval(() => {
                if (counter > 3) {
                    this.canvas.clearCanvas();
                    this.canvas.writeImageToCanvas(`./assets/images/question/${this.questions[this.numberRandom].picture}`, 25, 200);
                    this.canvas.writeTextToCanvas(`Je antwoord ${this.questionAnswer} is fout. Je bent 1 leven en 50 punten kwijtgeraakt`, 30, this.canvas.getCenter().X, 75, "white");
                    this.canvas.writeTextToCanvas(`${counter}`, 150, this.canvas.getCenter().X + 250, this.canvas.getCenter().Y + 350, "white");
                    this.canvas.writeTextToCanvas("Het goede antwoord was:", 30, this.canvas.getCenter().X, 150, "white");
                    this.canvas.writeTextToCanvas(` ${this.questions[this.numberRandom].answer}`, 30, this.canvas.getCenter().X + 225, 150, "lightgreen", "left");
                    this.canvas.writeImageToCanvas("./assets/images/helaas.png", this.canvas.getCenter().X + 100, this.canvas.getCenter().Y - 150);
                }
                ;
                counter--;
                if (counter < 3) {
                    this.canvas.clearCanvas();
                    document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
                    document.body.style.backgroundSize = "cover";
                    this.canvas.writeTextToCanvas(`${counter}`, 250, this.canvas.getCenter().X, this.canvas.getCenter().Y + 150, "white");
                    this.canvas.writeTextToCanvas(`score: ${this.score}`, 40, 10, this.canvas.getHeight() - 60, "black", "left");
                    this.canvas.writeTextToCanvas(`lives: ${this.lives}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
                    this.player.draw();
                    this.ball.draw();
                    for (let index = 0; index < this.blockArray.length; index++) {
                        this.blockArray[index].draw();
                    }
                    ;
                }
                ;
                if (counter < 0) {
                    clearInterval(interval);
                    this.questions.splice(this.numberRandom, 1);
                    this.gameState = "PLAY";
                    this.canvas.clearCanvas();
                    this.keyBoardListener.resetAnswer();
                    document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
                    document.body.style.backgroundSize = "cover";
                }
                ;
            }, 1000);
        }
        ;
    }
    ;
    removeLife() {
        this.lives--;
        if (this.score < 0) {
            this.score = 0;
        }
        ;
        if (this.lives == 0) {
            this.gameState = "SCORE";
            let scoreView = new Score(this.score);
        }
        ;
    }
    ;
    playAudio(src) {
        let audio = new Audio();
        audio.src = src;
        audio.load();
        audio.play();
    }
    ;
    makeBlockArray() {
        const canvasElement = document.getElementById('canvas');
        let blockXPos = 10;
        let blockYPos = 30;
        while (this.blockRow < 4) {
            this.blockArray.push(new Block(canvasElement, this.imageArray[this.canvas.randomNumber(0, this.imageArray.length - 1)], blockXPos, blockYPos, 184, 61));
            blockXPos += 190;
            if (blockXPos > this.canvas.getWidth() - 183) {
                blockXPos = 10;
                blockYPos += 70;
                this.blockRow++;
            }
            ;
        }
        ;
    }
    ;
    setEasyQuestions() {
        this.questions = [
            {
                question: "Welke rivier begint in Frankrijk en loopt door naar Belgie en Nederland?",
                a: "Rijn",
                b: "Seine",
                c: "Rhône",
                answer: "Rijn",
                picture: "rijn.png"
            }, {
                question: "Wat is de hoofdstad van Frankrijk?",
                a: "Monaco",
                b: "Lyon",
                c: "Parijs",
                answer: "Parijs",
                picture: "france.png"
            }, {
                question: "Wat is het meest voorkomende klimaat van West-Europa?",
                a: "Landklimaat",
                b: "Tropisch klimaat",
                c: "Zeeklimaat",
                answer: "Zeeklimaat",
                picture: "west_europe.png"
            }, {
                question: "Hoe is de welvaart van Noord-Europa?",
                a: "Slecht",
                b: "Gemiddeld",
                c: "Goed",
                answer: "Goed",
                picture: "north_europe.png"
            }, {
                question: "Welk land ligt net onder de poolcirkel?",
                a: "Scandinavië",
                b: "IJsland",
                c: "Nederland",
                answer: "IJsland",
                picture: "poolcirkel.png"
            }, {
                question: "Als iets belangrijk is voor meerdere landen, hoe noem je dat dan?",
                a: "Regionaal",
                b: "Nationaal",
                c: "Internationaal",
                answer: "Internationaal",
                picture: "internationaal.png"
            }, {
                question: "Welke hoort hier niet bij?",
                a: "Beroepsbevolking",
                b: "Gastarbeiders",
                c: "Wereldstad",
                answer: "Wereldstad",
                picture: "wereldstad.png"
            }, {
                question: "Welke zee grenst aan Nederland?",
                a: "De middelandse zee",
                b: "De rode zee",
                c: "De noordzee",
                answer: "De noordzee",
                picture: "zee.png"
            }, {
                question: "Wat spuit water heel hoog de lucht in?",
                a: "Geiser",
                b: "Fjord",
                c: "Vulkaan",
                answer: "Geiser",
                picture: "geiser.png"
            }, {
                question: "Hoe noem je het verschijnsel wat leidt tot verdwijnen van vis in de zee?",
                a: "Onderbevissing",
                b: "Overbevissing",
                c: "Scheepvaart",
                answer: "Overbevissing",
                picture: "vis.png"
            }, {
                question: "Hoe noem je een bos, wat alleen wordt gebruikt voor het hout?",
                a: "Mangrovebos",
                b: "Jungle",
                c: "Productiebos",
                answer: "Productiebos",
                picture: "bos.png"
            }, {
                question: "Waaruit bestaat de kust van Noorwegen?",
                a: "Duinen",
                b: "Fjorden",
                c: "Dijken",
                answer: "Fjorden",
                picture: "fjord.png"
            }
        ];
        this.gameState = "PLAY";
        window.setInterval(this.createScreen, 1000 / 60);
    }
    ;
    setTopoQuestions() {
        this.questions = [
            {
                question: "Waar ligt Schotland in Verenigd koninkrijk?",
                a: "In het noorden",
                b: "in het midden",
                c: "in het zuiden",
                answer: "In het noorden",
                picture: "schotland.png"
            }, {
                question: "Welke van de volgende steden ligt in Verenigd Koninkrijk?",
                a: "München",
                b: "Liverpool",
                c: "Monaco",
                answer: "Liverpool",
                picture: "england.png"
            }, {
                question: "Wat is de naam van het land op letter A?",
                a: "België",
                b: "Luxemburg",
                c: "Nederland",
                answer: "Nederland",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  B?",
                a: "Duitsland",
                b: "België",
                c: "Verenigd Koninkrijk",
                answer: "Verenigd Koninkrijk",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  C?",
                a: "Duitsland",
                b: "België",
                c: "Ierland",
                answer: "België",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  D?",
                a: "Oost- Verenigd Koninkrijk",
                b: "Ierland",
                c: "Noord-Ierland",
                answer: "Ierland",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  E?",
                a: "Ierland",
                b: "België",
                c: "Luxemburg",
                answer: "Luxemburg",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  F?",
                a: "Frankrijk",
                b: "Duitsland",
                c: "Nederland",
                answer: "Frankrijk",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter  G?",
                a: "Frankrijk",
                b: "Duitsland",
                c: "Ierland",
                answer: "Duitsland",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 1?",
                a: "Antwerpen",
                b: "Liverpool",
                c: "Bordeaux",
                answer: "Antwerpen",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 2?",
                a: "Lyon",
                b: "Parijs",
                c: "Londen",
                answer: "Lyon",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 3?",
                a: "Berlijn",
                b: "Munchen",
                c: "Keulen",
                answer: "Keulen",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 4?",
                a: "Berlijn",
                b: "Dublin",
                c: "Hamburg",
                answer: "Berlijn",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 5?",
                a: "Amsterdam",
                b: "Keulen",
                c: "Luxemburg",
                answer: "Luxemburg",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 6?",
                a: "Dublin",
                b: "Glasgow",
                c: "Bordeaux",
                answer: "Dublin",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 7?",
                a: "Glasgow",
                b: "Marseille",
                c: "Berlijn",
                answer: "Marseille",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 8?",
                a: "Hamburg",
                b: "Brussel",
                c: "Amsterdam",
                answer: "Amsterdam",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 9?",
                a: "Keulen",
                b: "Brussel",
                c: "München",
                answer: "Keulen",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 10?",
                a: "Marseille",
                b: "Luxemburg",
                c: "Brussel",
                answer: "Brussel",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 11?",
                a: "Londen",
                b: "Liverpool",
                c: "Brussel",
                answer: "Londen",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 12?",
                a: "Hamburg",
                b: "Parijs",
                c: "Liverpool",
                answer: "Liverpool",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 13?",
                a: "Glasgow",
                b: "Londen",
                c: "Manchester",
                answer: "Glasgow",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 14?",
                a: "Bordeaux",
                b: "Parijs",
                c: "Glasgow",
                answer: "Parijs",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 15?",
                a: "Bordeaux",
                b: "Londen",
                c: "Marseille",
                answer: "Bordeaux",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 16?",
                a: "Hamburg",
                b: "Hamburger",
                c: "Kaassoufflé",
                answer: "Hamburg",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats a?",
                a: "Het kanaal",
                b: "Seine",
                c: "Donau",
                answer: "Het kanaal",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats b?",
                a: "Middellandse Oceaan",
                b: "Atlantische Oceaan",
                c: "Middellandse Zee",
                answer: "Atlantische Oceaan",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats c?",
                a: "Seine",
                b: "Schelde",
                c: "Rijn",
                answer: "Seine",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats d?",
                a: "Seine",
                b: "Rhône",
                c: "Theems",
                answer: "Theems",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats e?",
                a: "Noordzee",
                b: "Oostzee",
                c: "Middellandse Oceaan",
                answer: "Noordzee",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats f?",
                a: "Schelde",
                b: "Donau",
                c: "Rijn",
                answer: "Donau",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats g?",
                a: "Rhône",
                b: "Donau",
                c: "Schelde",
                answer: "Schelde",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats h?",
                a: "Middellandse Zee",
                b: "Atlantische Oceaan",
                c: "Noordzee",
                answer: "Middellandse Zee",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats i?",
                a: "Schelde",
                b: "Donau",
                c: "Rijn",
                answer: "Rijn",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de rivier op plaats j?",
                a: "Donau",
                b: "Rhône",
                c: "Seine",
                answer: "Rhône",
                picture: "westEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats a?",
                a: "Noordzee",
                b: "Oostzee",
                c: "Atlantische Oceaan",
                answer: "Atlantische Oceaan",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats b?",
                a: "Noordelijke IJszee",
                b: "Noordzee",
                c: "Oostzee",
                answer: "Noordzee",
                picture: " kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats c?",
                a: "Oostzee",
                b: "Atlantische Oceaan",
                c: "Noordzee",
                answer: "Oostzee",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de oceaan/zee op plaats d?",
                a: "Noordelijke IJszee",
                b: "Oostzee",
                c: "Atlantische Oceaan",
                answer: "Noordelijke IJszee",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter A?",
                a: "Zweden",
                b: "IJsland",
                c: "Noorwegen",
                answer: "IJsland",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter B?",
                a: "Noorwegen",
                b: "Denemarken",
                c: "Zweden",
                answer: "Zweden",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter C?",
                a: "Finland",
                b: "Noorwegen",
                c: "Letland",
                answer: "Noorwegen",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter D?",
                a: "Estland",
                b: "Letland",
                c: "Litouwen",
                answer: "Letland",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter E?",
                a: "Litouwen",
                b: "Estland",
                c: "Letland",
                answer: "Litouwen",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter F?",
                a: "Letland",
                b: "Litouwen",
                c: "Estland",
                answer: "Estland",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter G?",
                a: "Litouwen",
                b: "IJsland",
                c: "Finland",
                answer: "Finland",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van het land op letter H?",
                a: "Noorwegen",
                b: "Denemarken",
                c: "Estland",
                answer: "Estland",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 1?",
                a: "Reykjavik",
                b: "Stockholm",
                c: "Helsinki",
                answer: "Stockholm",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 2?",
                a: "Reykjavik",
                b: "Oslo",
                c: "Kopenhagen",
                answer: "Reykjavik",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 3?",
                a: "Oslo",
                b: "Helsinki",
                c: "Stockholm",
                answer: "Oslo",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 4?",
                a: "Helsinki",
                b: "Stockholm",
                c: "Kopenhagen",
                answer: "Kopenhagen",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Wat is de naam van de stad op plaats 5?",
                a: "Reykjavik",
                b: "Oslo",
                c: "Helsinki",
                answer: "Helsinki",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Welk gebied ligt op plaats i",
                a: "Ruhrgebied",
                b: "Scandinavië",
                c: "Noordkaap",
                answer: "Scandinavië",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Welk gebied ligt op plaats ii",
                a: "Noordkaap",
                b: "Balkanlanden",
                c: "Scandinavië",
                answer: "Noordkaap",
                picture: "kaart-noordEuropa.png"
            }, {
                question: "Welke bestuurlijke eenheid ligt er op plaats I?",
                a: "Wallonië",
                b: "Vlaanderen",
                c: "Schotland",
                answer: "Vlaanderen",
                picture: "westEuropa.png"
            }, {
                question: "Welke bestuurlijke eenheid ligt er op plaats II?",
                a: "Schotland",
                b: "Engeland",
                c: "Vlaanderen",
                answer: "Schotland",
                picture: "westEuropa.png"
            }, {
                question: "Welke bestuurlijke eenheid ligt er op plaats III?",
                a: "Wallonië",
                b: "Engeland",
                c: "Schotland",
                answer: "Wallonië",
                picture: "westEuropa.png"
            }, {
                question: "Welke bestuurlijke eenheid ligt er op plaats IV?",
                a: "Schotland",
                b: "Vlaanderen",
                c: "Engeland",
                answer: "Engeland",
                picture: "westEuropa.png"
            }, {
                question: "Welke gebergte ligt er op plaats i?",
                a: "Pyreneeën",
                b: "Ruhrgebied",
                c: "Alpen",
                answer: "Ardennen",
                picture: "westEuropa.png"
            }, {
                question: "Welke gebergte ligt er op plaats ii?",
                a: "Alpen",
                b: "Pyreneeën",
                c: "Ruhrgebied",
                answer: "Pyreneeën",
                picture: "westEuropa.png"
            }, {
                question: "Welke gebied ligt er op plaats iii?",
                a: "Ruhrgebied",
                b: "Alpen",
                c: "Ardennen",
                answer: "Ruhrgebied",
                picture: "westEuropa.png"
            }, {
                question: "Welke gebergte ligt er op plaats iv?",
                a: "Ruhrgebied",
                b: "Alpen",
                c: "Pyreneeën",
                answer: "Alpen",
                picture: "westEuropa.png"
            }
        ];
        this.gameState = "PLAY";
        window.setInterval(this.createScreen, 1000 / 60);
    }
    ;
    setDifficultQuestions() {
        this.questions = [
            {
                question: "Welk gebergte grenst aan Frankrijk en Spanje?",
                a: "Pyreneeën",
                b: "Alpen",
                c: "Ardennen",
                answer: "Pyreneeën",
                picture: "pyreneeen.png"
            }, {
                question: "Hoe noem je de landen in Noord-Europa ook wel?",
                a: "Scandinavië",
                b: "Benelux",
                c: "Baltische Staten",
                answer: "Scandinavië",
                picture: "scandinavie.png"
            }, {
                question: "Wat is de hoofdstad van Noorwegen?",
                a: "Stockholm",
                b: "Oslo",
                c: "Helsinki",
                answer: "Oslo",
                picture: "norway.png"
            }, {
                question: "Wat is de grootste stad van West-Europa?",
                a: "Parijs",
                b: "Amsterdam",
                c: "Londen",
                answer: "Londen",
                picture: "londen.png"
            }, {
                question: "Met welk vervoersmiddel rijden mensen vaak in de stad?",
                a: "Auto",
                b: "Taxi",
                c: "Metro",
                answer: "Metro",
                picture: "traffic.png"
            }, {
                question: "Welke buurlanden heeft België naast Nederland en Duitsland?",
                a: "Frankrijk",
                b: "Frankrijk en Luxemburg",
                c: "Frankrijk en Verenigd Koninkrijk",
                answer: "Frankrijk en Luxemburg",
                picture: "belgium.png"
            }, {
                question: "Waar bestaat IJsland voor het grootste deel uit?",
                a: "Woestijn",
                b: "IJs",
                c: "Toendra",
                answer: "Toendra",
                picture: "ijsland.png"
            }, {
                question: "Welke landen horen niet bij de Eurozone?",
                a: "Noorwegen en Finland",
                b: "Noorwegen en IJsland",
                c: "IJsland en Frankrijk",
                answer: "Noorwegen en IJsland",
                picture: "eurozone.png"
            }, {
                question: "Wat zijn Estland, Letland en Litouwen?",
                a: "Baltische Staten",
                b: "Balkanlanden",
                c: "Benelux",
                answer: "Baltische Staten",
                picture: "baltischestaten.png"
            }, {
                question: "Waar waren Estland, Letland en Litouwen vroeger onderdeel van?",
                a: "Scandinavië",
                b: "Balkanlanden",
                c: "Sovjet Unie",
                answer: "Sovjet Unie",
                picture: "sovjetunie.png"
            }, {
                question: "De waddeneilanden zijn een goed voorbeeld van?",
                a: "Kliffen",
                b: "Afbraakkust",
                c: "Aangroeikust",
                answer: "Aangroeikust",
                picture: "waddeneilanden.png"
            }, {
                question: "Hoe heet het achterland van Rotterdam?",
                a: "Ruhrgebied",
                b: "Ardennen",
                c: "Achterhoek",
                answer: "Ruhrgebied",
                picture: "ruhrarea.png"
            }, {
                question: "Waarom is er in Rotterdam veel werkgelegenheid?",
                a: "Chemische industrie",
                b: "Vee-industrie",
                c: "Levensmiddelen industrie",
                answer: "Chemische industrie",
                picture: "rotterdam.png"
            }
        ];
        this.gameState = "PLAY";
        window.setInterval(this.createScreen, 1000 / 60);
    }
    ;
}
;
class Score extends ViewBase {
    constructor(score) {
        super();
        this.createScreen = () => {
            this.canvas.clearCanvas();
            this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, this.canvas.getCenter().Y - 275, "white", "center");
            this.canvas.writeTextToCanvas(`${this.score}`, 100, this.canvas.getCenter().X, this.canvas.getCenter().Y, "white", "center");
            this.canvas.writeTryAgainButtonToCanvas("./assets/images/probeeropnieuw.png", 1101, 117, this.canvas.getCenter().Y - 500);
            if (this.score <= 500) {
                this.canvas.writeTextToCanvas('Helaas! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
            }
            ;
            if (this.score > 500 && this.score <= 1000) {
                this.canvas.writeTextToCanvas('Goed gedaan! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
            }
            ;
            if (this.score > 1000) {
                this.canvas.writeTextToCanvas('Perfect! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
            }
            ;
        };
        this.score = score;
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        window.setInterval(this.createScreen, 1000 / 60);
    }
    ;
}
;
class StartView extends ViewBase {
    constructor() {
        super();
        this.createScreen = () => {
            this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, this.canvas.getCenter().Y - 275, "white", "center");
            this.canvas.writeStartButtonToCanvas('./assets/images/startscreenButton.png', 294, 58, this.canvas.getCenter().Y - 200);
        };
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    }
    ;
}
;
//# sourceMappingURL=app.js.map