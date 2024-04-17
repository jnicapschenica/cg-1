import { Matrix } from "./Matrix.js";

export class Vector {
    private vector: Array<number>;
    private N: number;

    constructor(N: number) {
        this.N = N;

        const A: Array<number> = new Array(this.N);

        for (let i = 0; i < A.length - 1; i++)
            A[i] = 0;
        A[A.length - 1] = 1;

        this.vector = A;
    }

    get getN() {
        return this.N;
    }

    getElement(i: number) {
        return this.vector[i];
    }

    printVector() {
        let str = '';

        for (let i = 0; i < this.N; i++)
            str += this.vector[i] + " ";

        console.log(str);
    }

    fillVector(i: number, value: number) {
        this.vector[i - 1] = value;
    }

    multiplyMatrixVector(A: Matrix, B: Vector) {
        for (let i = 0; i < this.N; i++) {
            this.vector[i] = 0;

            for (let j = 0; j < this.N; j++) {
                this.vector[i] += A.getElement(i, j) * B.getElement(j);
            }
        }
    }

}