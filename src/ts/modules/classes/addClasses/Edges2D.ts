import { Vertice2D } from "./Vertices2D.js";

export class Edge2D {
    private first: Vertice2D;
    private second: Vertice2D;
    private edge:number;

    constructor(first:Vertice2D, second:Vertice2D, flag:number) {
        this.first = first;
        this.second = second;
        this.edge = flag;
    }
}
