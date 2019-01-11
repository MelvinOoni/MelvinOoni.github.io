class Score extends ViewBase {

    private score: number;

    public constructor(score: number) {
        super();
        this.score = score;
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        window.setInterval(this.createScreen, 1000 / 60);
    };

    /**
     * A function to create the score screen at the end of the game
     */
    createScreen = () => {
        this.canvas.clearCanvas();
        this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, this.canvas.getCenter().Y - 275, "white", "center");
        this.canvas.writeTextToCanvas(`${this.score}`, 100, this.canvas.getCenter().X, this.canvas.getCenter().Y, "white", "center");
        this.canvas.writeTryAgainButtonToCanvas("./assets/images/probeeropnieuw.png", 1101, 117, this.canvas.getCenter().Y - 500);
        if (this.score <= 500) {
            this.canvas.writeTextToCanvas('Helaas! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
        };

        if (this.score > 500 && this.score <= 1000) {
            this.canvas.writeTextToCanvas('Goed gedaan! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
        };

        if (this.score > 1000) {
            this.canvas.writeTextToCanvas('Perfect! Probeer het nog een keer. Je score was:', 40, this.canvas.getCenter().X, this.canvas.getCenter().Y - 175, "white", "center");
        };
    };
};
