import { Vertice2D } from "./Vertices2D";

export class Homogeneous2D extends Vertice2D {
    private Z: number;

    constructor(X: number, Y: number, Z: number) {
        super(X, Y);
        this.Z = Z;
    }

}
