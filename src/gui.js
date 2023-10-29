import * as dat from "dat.gui";

// DAT.gui updates the state object we passed in to createGUI
function createGUI(state, canvas) {
    const gui = new dat.GUI();

    var optionsFolder = gui.addFolder("Options");
    optionsFolder.open();

    optionsFolder
        .addColor(state, "backgroundColor") //
        .name("Background");

    // track mouse over canvas
    canvas.addEventListener("mousemove", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        state.mousePos = [x, y];
    });
}

export default createGUI;
