/// <reference path ='Viewbase.ts' />

class StartView extends ViewBase {

    public constructor() {
        super();
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    };

    /**
     * A function to create the startscreen at the beginning of the game
     */
    createScreen = () => {
        this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, this.canvas.getCenter().Y - 275, "white", "center");
        this.canvas.writeStartButtonToCanvas('./assets/images/startscreenButton.png', 294, 58, this.canvas.getCenter().Y - 200);
    };
};