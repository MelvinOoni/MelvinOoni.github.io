///<reference path="Canvas.ts"/>

class Game{

    private readonly canvas: Canvas;
    private readonly startView: StartView;

    public constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.startView = new StartView();
        this.draw();
    }

    draw = () => {
        this.startView.createScreen();
    }
}

window.addEventListener('load', init);

function init(): void {
    const gameName = new Game();
}