/// <reference path ='Viewbase.ts' />

class StartView extends ViewBase {

    public constructor() {
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        document.body.style.background = "url('./assets/images/backgrounds/startBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
    }

    createScreen = () => {
        this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeStartButtonToCanvas('./assets/images/startscreenButton.png', 294, 58, this.canvas.getCenter().Y - 200);
    }
}