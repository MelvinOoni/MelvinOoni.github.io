abstract class ViewBase {

    protected canvas: Canvas;

    protected constructor() {
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    };

    /**
     * The function createScreen who needs to be implemented by every child of this class
     */
    protected abstract createScreen(): void
};