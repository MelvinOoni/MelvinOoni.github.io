/// <reference path = "Viewbase.ts"/>

class LevelView extends ViewBase {

    private player: Player;
    private ball: Ball;
    private keyBoardListener: KeyBoardListener;
    private blockArray: Array<any>;
    private numberRandom: number;
    private gameState: string;
    private score: number;
    private lives: number;
    private blockRow: number;
    private questions: Array<any>;
    private questionAnswer: string;
    private imageArray: Array<string> = [
        "./assets/images/blocks/redBlock.png",
        "./assets/images/blocks/greenBlock.png",
        "./assets/images/blocks/orangeBlock.png",
        "./assets/images/blocks/yellowBlock.png"
    ];

    public constructor() {
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
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
    };

    /**
     * The function to create the levelscreen with different gamestates to be able to pause the game and answer a question.
     * This function also describes the game physics and interactions between the different instances in the game
     */
    createScreen = () => {
        if (this.gameState === "START") {
            this.player.draw();
            this.ball.draw();
            this.canvas.writeTextToCanvas(`score: ${this.score}`, 40, 10, this.canvas.getHeight() - 60, "black", "left");
            this.canvas.writeTextToCanvas(`lives: ${this.lives}`, 40, this.canvas.getWidth() - 100, this.canvas.getHeight() - 60, "black");
            for (let index = 0; index < this.blockArray.length; index++) {
                this.blockArray[index].draw();
            };
        };

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
            };

            if (this.player.isCollidingWithBallMiddle(this.ball)) {
                this.ball.collidedWithPlayerMiddle();
            };

            if (this.player.isCollidingWithBallRight(this.ball)) {
                this.ball.collidedWithPlayerRight();
            };

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
                    };
                };
            };
        };

        if (this.ball.getY() + this.ball.getHeight() > this.canvas.getHeight()) {
            this.score -= 50;
            this.removeLife();
            this.ball.removeLife();
        };

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
            };

            if (this.keyBoardListener.getTwoPressed()) {
                this.questionAnswer = this.questions[this.numberRandom].b;
                this.compareAnswers();
            };

            if (this.keyBoardListener.getThreePressed()) {
                this.questionAnswer = this.questions[this.numberRandom].c;
                this.compareAnswers();
            };
        };
    };

    /**
     * A function the compare the given answer of the player and the right answer
     */
    compareAnswers = () => {
        if (this.questions[this.numberRandom].answer === this.questionAnswer) {
            this.gameState = "COUNTDOWN";
            this.score += 100;
            this.startRightCountdown(8);
        } else {
            this.gameState = "COUNTDOWN";
            this.score -= 50;
            this.startWrongCountdown(8);
        };
    };

    /**
     * A function to start the countdown if the answer on the question was right
     * @param seconds 
     */
    public startRightCountdown(seconds: number): void {
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
            };

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
                };
            };

            if (counter < 0) {
                clearInterval(interval);
                this.questions.splice(this.numberRandom, 1);
                this.gameState = "PLAY";
                this.canvas.clearCanvas();
                this.keyBoardListener.resetAnswer();
            };
        }, 1000);
    };

    /**
     * A function to start the countdown if the answer on the question was wrong
     * @param seconds 
     */
    public startWrongCountdown(seconds: number): void {
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
                };

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
                    };
                };

                if (counter < 0) {
                    clearInterval(interval);
                    this.questions.splice(this.numberRandom, 1);
                    this.gameState = "PLAY";
                    this.canvas.clearCanvas();
                    this.keyBoardListener.resetAnswer();
                    document.body.style.background = "url('./assets/images/backgrounds/europaBackground.png') no-repeat ";
                    document.body.style.backgroundSize = "cover";
                };
            }, 1000);
        };
    };

    /**
     * A function to remove a life if the question has been answered incorrectly or if the player failed to bounce the ball
     */
    public removeLife() {
        this.lives--;
        if (this.score < 0) {
            this.score = 0;
        };

        if (this.lives == 0) {
            this.gameState = "SCORE";
            let scoreView = new Score(this.score);
        };
    };

    /**
     * A function to play a sound
     * @param src 
     */
    public playAudio(src: string) {
        let audio = new Audio();
        audio.src = src;
        audio.load();
        audio.play();
    };

    /**
     * The function to create all the blocks
     */
    public makeBlockArray() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        let blockXPos = 10;
        let blockYPos = 30;
        while (this.blockRow < 4) {
            this.blockArray.push(new Block(canvasElement, this.imageArray[this.canvas.randomNumber(0, this.imageArray.length - 1)], blockXPos, blockYPos, 184, 61));
            blockXPos += 190;
            if (blockXPos > this.canvas.getWidth() - 183) {
                blockXPos = 10;
                blockYPos += 70;
                this.blockRow++
            };
        };
    };

    /**
     * A function to set the easy questions
     */
    public setEasyQuestions() {
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
    };

    /**
     * A function to set the topography questions
     */
    public setTopoQuestions() {
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
    };
    
    /**
     * A function to set the difficult questions
     */
    public setDifficultQuestions() {
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
    };
};