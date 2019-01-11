///<reference path="Canvas.ts"/>

class Game {

    private readonly startView: StartView;

    public constructor() {
        this.startView = new StartView();
        this.playBackgroundAudio();
        window.setInterval(this.playBackgroundAudio, 100000);
        this.draw();
    };

    /**
     * The funtion to start the startview
     */
    draw = () => {
        this.startView.createScreen();
    };

    public playBackgroundAudio() {
        let audio = new Audio();
        audio.src = "./assets/sounds/backgroundmusic.mp3";
        audio.load();
        audio.play();
    };
};

/**
 * The function to to carry out the function init when the browser has loaded the page
 */
window.addEventListener('load', init);

/**
 * The function to start the game
 */
function init(): void {
    const gameName = new Game();
};