import "./style.css";

import Sketch from "./src/sketch";
import createState from "./src/state";
import createGUI from "./src/gui";

let state, sketch;

init();

async function init() {
  const canvas = document.getElementById("render-canvas");
  sketch = new Sketch(canvas);

  window.onresize = onWindowResize;
  onWindowResize(); // set initial size

  state = await createState(updateState);
  updateState(); // push initial state

  createGUI(state);
}

function updateState() {
  sketch.updateState(state);
  render();
}

function render() {
  if (state) {
    sketch.render(state);
  }
}

function onWindowResize() {
  // match canvas size to window size
  const canvas = document.getElementById("render-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

window.onkeydown = function (evt) {
  if (evt.key == "s") {
    saveFrame();
  }
};

function download(dataURL, name) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = name;
  link.click();
}

function saveFrame() {
  let canvas = document.getElementById("render-canvas");
  var dataURL = canvas.toDataURL("image/png");
  download(dataURL, "image");
}
