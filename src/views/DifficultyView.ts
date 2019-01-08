///<reference path="Viewbase.ts"/>

class DifficultyView extends ViewBase {

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
    }

    createScreen = () => {
        this.canvas.writeTextToCanvas('Europe Explorer', 100, this.canvas.getCenter().X, 100, "white", "center");
        this.canvas.writeTextToCanvas('Kies een niveau:', 40, this.canvas.getCenter().X, 165, "white", "center");
        this.canvas.writeEasyDifficultyButtonToCanvas("./assets/images/makkelijk.png", 302, 70, this.canvas.getCenter().Y - 200);
        this.canvas.writeTopoDifficultyButtonToCanvas("./assets/images/topografie.png", 348, 73, this.canvas.getCenter().Y - 350);
        this.canvas.writeDifficultDifficultyButtonToCanvas("./assets/images/moeilijk.png", 253, 71, this.canvas.getCenter().Y - 500);
    }
}