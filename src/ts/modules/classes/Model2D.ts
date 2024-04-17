import { Matrix } from "./addClasses/Matrix.js";
import { Vector } from "./addClasses/Vector.js";

export class Model2D {
    private vertices: Matrix;
    private edges: Matrix;
    private N: number;

    constructor() {
        this.N = 0;
        this.vertices = new Matrix(3, 0);
        this.edges = new Matrix(0, 0);
    }

    get getN() {
        return this.N;
    }

    get getVertices() {
        return this.vertices;
    }

    get getEdges() {
        return this.edges;
    }

    addVerticeToModel(coordinates: Vector) {
        this.N++;
        this.vertices.fillByVector(coordinates);

        const empty = new Vector(this.N);
        empty.fillVector(this.N, 0);
        this.edges.addToQuad(empty);
    }

    addEdgeToModel(i: number, j: number) {
        this.edges.fillByElement(i + 1, j + 1, 1);
        this.edges.fillByElement(j + 1, i + 1, 1);
    }

    copyModel(vertices: Matrix, edges: Matrix, N: number) {
        this.vertices = vertices;
        this.edges = edges;
        this.N = N;
    }

    findVertice(coordinates: Vector) {
        for (let j = 0; j < this.N; j++)
            if (this.vertices.getElement(0, j) === coordinates.getElement(0))
                if (this.vertices.getElement(1, j) === coordinates.getElement(1))
                    return j;
        return -1;
    }

    deleteEdgeByVertices(first: Vector, second: Vector) {
        const i = this.findVertice(first);
        const j = this.findVertice(second);

        this.edges.fillByElement(i + 1, j + 1, 0);
        this.edges.fillByElement(j + 1, i + 1, 0);
    }

    deleteEdgeByVertice(i: number) {
        this.edges.deleteRow(i);
        this.edges.deleteColumn(i);
    }

    deleteVertice(coordinates: Vector) {
        if (this.findVertice(coordinates) > -1) {
            const i = this.findVertice(coordinates);
            this.vertices.deleteColumn(i);
            this.deleteEdgeByVertice(i);
            this.N--;
        }
    }

    deleteModel() {
        this.vertices.deleteCols();
        this.edges.deleteMatrix();
        this.N = 0;
    }
}
