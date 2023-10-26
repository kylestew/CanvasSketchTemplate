import { loadImage } from "./lib/loaders";

const StateDidChangeEvent = "stateDidChange";

const imageUrl = "/assets/sample_image.jpg";

const state = {
    backgroundColor: "#ff00ff",
    imageScale: 0.5,
    image: null,
};

async function createState() {
    // opportunity to run any long processes (async loaders)
    state.image = await loadImage(imageUrl);

    // use a Proxy to publish state change events
    const proxiedState = new Proxy(state, {
        set(obj, prop, value) {
            // apply update
            Reflect.set(obj, prop, value);

            // publish update event
            window.dispatchEvent(new Event(StateDidChangeEvent));

            return true;
        },
    });
    return proxiedState;
}

export { createState, StateDidChangeEvent };
