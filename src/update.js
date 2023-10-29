export default function update(state, timestamp) {
    state.arcs.forEach((a) => (a.theta += a.speed));
}
