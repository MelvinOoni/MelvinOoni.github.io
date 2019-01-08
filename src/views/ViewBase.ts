abstract class ViewBase {

    protected canvas: Canvas;

    protected constructor() {
    }

    public render(): void{
        this.canvas.clearCanvas();
        this.createScreen();
    }

    protected abstract createScreen(): void 
}