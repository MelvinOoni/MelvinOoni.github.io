class Entity{

    protected xPos: number;
    protected yPos: number;
    protected height: number;
    protected width: number;
    protected imgSource:string;
    protected canvas: Canvas;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number, 
        height: number
        ) {
        this.canvas = new Canvas(canvas)
        this.imgSource = imgSource;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    public draw(){
        this.canvas.writeImageToCanvas(this.imgSource,this.xPos,this.yPos);
    }

    public getX(): number {
        return this.xPos;
    }

    public getY(): number {
        return this.yPos;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}