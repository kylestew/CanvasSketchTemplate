import "./style.css";

import createState from "./src/state";
import createGUI from "./src/gui";
import render from "./src/render";
import update from "./src/update";

let ctx, state;

async function init() {
    const canvas = document.getElementById("render-canvas");
    ctx = canvas.getContext("2d");

    // create initial state
    state = await createState();
    // optionally watch state updates and call render when they occur
    state = watchState(state);

    // GUI can mutate state
    createGUI(state, canvas);

    window.onresize = onWindowResize;
    onWindowResize(); // set initial size - will fire first render

    // start animation loop
    requestAnimationFrame(loop);
}
init();

function loop(timestamp) {
    update(state, timestamp);

    render(ctx, state);

    requestAnimationFrame(loop);
}

function stateDidUpdate() {
    if (state) {
        render(ctx, state);
    }
}

function watchState(state) {
    // use a Proxy to publish state change events
    const proxiedState = new Proxy(state, {
        set(obj, prop, value) {
            // apply update
            Reflect.set(obj, prop, value);

            stateDidUpdate();

            return true;
        },
    });
    return proxiedState;
}

function onWindowResize() {
    // match canvas size to window size
    const canvas = document.getElementById("render-canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    stateDidUpdate();
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
