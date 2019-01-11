class Entity {

    protected xPos: number;
    protected yPos: number;
    protected height: number;
    protected width: number;
    protected imgSource: string;
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
    };

    /**
     * A function to draw the image of the childs of this class
     */
    public draw() {
        this.canvas.writeImageToCanvas(this.imgSource, this.xPos, this.yPos);
    };

    /**
     * A function to return the X position from the childs of this class
     */
    public getX(): number {
        return this.xPos;
    };

    /**
     * A function to return the Y position from the childs of this class
     */
    public getY(): number {
        return this.yPos;
    };

    /**
     * A function to return the width from the childs of this class
     */
    public getWidth(): number {
        return this.width;
    };

    /**
     * A function to return the height from the childs of this class
     */
    public getHeight(): number {
        return this.height;
    };
};