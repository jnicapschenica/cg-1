import { Matrix } from "./Matrix.js";

export class AffineTransformation extends Matrix{

    translate(x: number, y: number) {
        this.fillByElement(1, 3, x);
        this.fillByElement(2, 3, y);
    }

    rotate(phi: number) {
        this.fillByElement(1, 1, Math.cos(phi* Math.PI / 180));
        this.fillByElement(1, 2, Math.sin(-1 * phi* Math.PI / 180));
        this.fillByElement(2, 1, Math.sin(phi* Math.PI / 180));
        this.fillByElement(2, 2, Math.cos(phi* Math.PI / 180));
        this.fillByElement(1, 3, 0);
        this.fillByElement(2, 3, 0);
    }

    scale(Kx: number, Ky: number) {
        this.fillByElement(1, 1, Kx);
        this.fillByElement(2, 2, Ky);
    }

    mirror(Mx: number, My: number) {
        this.fillByElement(1, 1, Mx);
        this.fillByElement(2, 2, My);
    }

    reset() {
        this.fillByElement(1, 1, 1);
        this.fillByElement(1, 2, 0);
        this.fillByElement(1, 3, 0);
        this.fillByElement(2, 1, 0);
        this.fillByElement(2, 2, 1);
        this.fillByElement(2, 3, 0);
        this.fillByElement(3, 1, 0);
        this.fillByElement(3, 2, 0);
        this.fillByElement(3, 3, 1);
    }
}
