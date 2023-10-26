const loadImage = (url) =>
    new Promise((resolve, reject) => {
        // I don't remember why I did this so weirdly
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (err) => reject(err));
        img.src = url;
    });

export { loadImage };
