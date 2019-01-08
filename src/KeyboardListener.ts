class KeyBoardListener {

    private leftPressed: boolean;
    private rightPressed: boolean;
    private onePressed: boolean;
    private twoPressed: boolean;
    private threePressed: boolean;

    public constructor() {
        this.leftPressed = false;
        this.rightPressed = false;
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    /**
    * Function to handle the key down
    */
    private keyDownHandler = (event: KeyboardEvent) => {
        if (event.keyCode == 37) {
            this.leftPressed = true;
        }
        if (event.keyCode == 39) {
            this.rightPressed = true;
        }
        if (event.keyCode == 49 || event.keyCode == 97) {
            this.onePressed = true;
        }
        if (event.keyCode == 50 || event.keyCode == 98) {
            this.twoPressed = true;
        }
        if (event.keyCode == 51 || event.keyCode == 99) {
            this.threePressed = true;
        }
    }

    /**
    * Function to handle the key up 
    */
    private keyUpHandler = (event: KeyboardEvent) => {
        if (event.keyCode == 37) {
            this.leftPressed = false;
        }
        if (event.keyCode == 39) {
            this.rightPressed = false;
        }
        if (event.keyCode == 49 || event.keyCode == 97) {
            this.onePressed = false;
        }
        if (event.keyCode == 50 || event.keyCode == 98) {
            this.twoPressed = false;
        }
        if (event.keyCode == 51 || event.keyCode == 99) {
            this.threePressed = false;
        }
    }

    /**
     * Function to get the leftPressed property
     */
    public getLeftPressed(): boolean {
        return this.leftPressed;
    }

    /**
     * Function to get the rightPressed property
     */
    public getRightPressed(): boolean {
        return this.rightPressed;
    }

    /**
     * Function to get the onePressed property
     */
    public getOnePressed(): boolean {
        return this.onePressed;
    }

    /**
     * Function to get the twoPressed property
     */
    public getTwoPressed(): boolean {
        return this.twoPressed;
    }

    /**
     * Function to get the threePressed property
     */
    public getThreePressed(): boolean {
        return this.threePressed;
    }

    public resetAnswer(): void {
        this.onePressed = false;
        this.twoPressed = false;
        this.threePressed = false;
    }
}