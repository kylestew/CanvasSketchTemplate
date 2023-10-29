import "./lib/canvas-extensions.js";

import { arc, asCubic, group, pathFromCubics, closestPoint } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { dist } from "@thi.ng/vectors";

const W = 600;
const ORIGIN = [W / 2, W / 2];

const PICK_DIST = 10;
const PICK_COL = "cyan";

export default function render(ctx, state) {
    const { backgroundColor, mousePos, arcs } = state;

    ctx.clear(backgroundColor);

    draw(
        ctx,
        // group arcs and convert to hiccup tree required by `draw()`
        // (see hiccup-canvas readme for details)
        group(
            {},
            arcs.map(({ r, w, col, theta, spread }) => {
                // build (elliptic) arc from config
                const a = arc(ORIGIN, r, 0, theta, theta + spread);
                // convert to cubic path due to HTML Canvas API limitations
                // (doesn't support elliptic arcs, so we need to convert them...)
                // also perform shape picking by computing distance to
                // closest point on arc to mouse pos. adjust color based on result

                let color = col;
                if (mousePos != null) color = dist(mousePos, closestPoint(a, mousePos)) < PICK_DIST ? PICK_COL : col;

                return pathFromCubics(asCubic(a), {
                    weight: w,
                    stroke: color,
                });
            })
        )
    );
}
