class Block extends Entity {

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number
    ) {
        super(canvas, imgSource, xPos, yPos, width, height);
    };
};