import * as dat from "dat.gui";

function createGUI(state) {
  const gui = new dat.GUI();

  var optionsFolder = gui.addFolder("Options");
  optionsFolder.open();

  optionsFolder
    .addColor(state, "backgroundColor")
    .name("Background")
    .onChange(state.updateFn);

  optionsFolder
    .add(state, "imageScale", 0.1, 1.0, 0.01)
    .name("Image Scale")
    .onChange(state.updateFn);
}

export default createGUI;
