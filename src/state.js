import imageUrl from "/assets/sample_image.jpg";

const state = {
  backgroundColor: "#ff00ff",
  imageScale: 0.5,
};

const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });

/*
 * Pass an update function to be called when state changes
 */
async function createState(updateFn) {
  state.updateFn = updateFn;

  // this is a good place for async loaders
  state.image = await loadImage(imageUrl);

  return state;
}

export default createState;
