class Sketch {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
    }

    render(state) {
        const { backgroundColor, imageScale, image } = state;

        const ctx = this.ctx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.translate((width - width * imageScale) / 2, (height - height * imageScale) / 2);
        ctx.scale(imageScale, imageScale);
        ctx.drawImage(image, 0, 0, width, height);
        ctx.restore();
    }
}

export default Sketch;
