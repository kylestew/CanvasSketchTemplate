import "./style.css";

import Sketch from "./src/sketch";
import { createState, StateDidChangeEvent } from "./src/state";
import createGUI from "./src/gui";

let state, sketch;

init();

async function init() {
    const canvas = document.getElementById("render-canvas");
    sketch = new Sketch(canvas);

    state = await createState();
    window.addEventListener(StateDidChangeEvent, render);

    createGUI(state);

    window.onresize = onWindowResize;
    onWindowResize(); // set initial size - will fire first render
}

function render() {
    // don't render until our state is ready
    if (state) {
        sketch.render(state);
    }
}

function onWindowResize() {
    // match canvas size to window size
    const canvas = document.getElementById("render-canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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
