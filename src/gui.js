import * as dat from "dat.gui";

// DAT.gui updates the state object we passed in to createGUI
function createGUI(state) {
    const gui = new dat.GUI();

    var optionsFolder = gui.addFolder("Options");
    optionsFolder.open();

    optionsFolder
        .addColor(state, "backgroundColor") //
        .name("Background");

    optionsFolder
        .add(state, "imageScale", 0.1, 1.0, 0.01) //
        .name("Image Scale");
}

export default createGUI;
