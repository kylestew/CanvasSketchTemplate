import { fit01, TAU } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { hsl } from "@thi.ng/color";
import { map, normRange } from "@thi.ng/transducers";
import { circle, withAttribs, asPolygon } from "@thi.ng/geom";

const W = 600;

export default async function createState() {
    return {
        backgroundColor: "#330033",
        mousePos: null,
        arcs: [
            ...map(
                (i) => ({
                    // radius
                    r: fit01(i, 50, W * 0.4),
                    // stroke width
                    w: SYSTEM.minmax(1, 5),
                    // randomized HSLA color
                    col: hsl([SYSTEM.norm(0.1), SYSTEM.minmax(0.5, 1), 0.5]),
                    // start angle
                    theta: SYSTEM.float(TAU),
                    // angle spread
                    spread: SYSTEM.float(TAU),
                    // rotation speed
                    speed: SYSTEM.norm(0.02),
                }),
                normRange(20)
            ),
        ],
    };
}
