CanvasRenderingContext2D.prototype.clear = function (clearColor = "#000") {
    // Save the current transformation matrix and state
    this.save();

    // Use the identity matrix to clear the canvas
    this.setTransform(1, 0, 0, 1, 0, 0);

    // Clear the entire canvas using a transparent color
    this.fillStyle = clearColor;
    this.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Restore the saved transformation matrix and state
    this.restore();
};

console.log("CANVAS EXTENSIONS LOADED 🎉");
