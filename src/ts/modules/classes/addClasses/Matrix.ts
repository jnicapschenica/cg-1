import { Vector } from "./Vector.js";

export class Matrix {
    private matrix: Array<Array<number>>;
    private rows: number;
    private columns: number;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.columns = cols;

        const A: Array<Array<number>> = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            A[i] = new Array(this.columns);
        }

        for (let i = 0; i < A.length; i++)
            for (let j = 0; j < A[i].length; j++)
                if (i === j) A[i][j] = 1;
                else A[i][j] = 0;

        this.matrix = A;
    }

    getElement(i: number, j: number) {
        return this.matrix[i][j];
    }

    get getRows() {
        return this.rows
    }

    get getCols() {
        return this.columns
    }

    printMatrix() {
        let str = '';

        for (let i = 0; i < this.rows; i++) {
            str = '';

            for (let j = 0; j < this.columns; j++)
                str += this.matrix[i][j] + " ";

            console.log(str);
        }
    }

    fillByElement(i: number, j: number, value: number) {
        this.matrix[i - 1][j - 1] = value;
    }

    fillByVector(vector: Vector) {
        for (let i = 0; i < this.rows; i++) {
            this.matrix[i].push(vector.getElement(i));
        }
        this.columns++;
    }

    addRow(vector: Vector) {
        const help: Array<number> = [];
        for (let i = 0; i < vector.getN; i++) {
            help.push(vector.getElement(i));
        }
        this.matrix.push(help)
        this.rows++;
    }

    addToQuad(vector: Vector) {
        this.addRow(vector);
        this.fillByVector(vector);
        this.fillByElement(this.rows, this.columns, 1);
    }

    multiplyMatrixMatrix(A: Matrix, B: Matrix) {
        const C: Array<Array<number>> = new Array(A.getRows);

        for (let i = 0; i < A.getRows; i++) {
            C[i] = new Array(B.getCols);
        }

        for (let i = 0; i < A.getRows; i++) {
            for (let j = 0; j < B.getCols; j++) {
                C[i][j] = 0;

                for (let k = 0; k < this.rows; k++) {
                    C[i][j] += A.getElement(i, k) * B.getElement(k, j);
                }
            }
        }

        for (let i = 0; i < A.getRows; i++) {
            for (let j = 0; j < B.getCols; j++) {
                this.fillByElement(i + 1, j + 1, C[i][j]);
            }
        }
    }

    deleteColumn(j: number) {
        for (let i = 0; i < this.rows; i++)
            this.matrix[i].splice(j, 1);

        this.columns--;
    }

    deleteRow(i: number) {
        this.matrix.splice(i, 1);
        this.rows--;
    }

    deleteMatrix() {
        this.matrix.splice(0, this.rows);
        this.rows = 0;
        this.columns = 0;
    }

    deleteCols() {
        for (let i = 0; i < this.rows; i++)
            this.matrix[i].splice(0, this.columns);
        this.columns = 0;
    }

    clearMatrix() {
        const A: Array<Array<number>> = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            A[i] = new Array(this.columns);
        }

        for (let i = 0; i < A.length; i++)
            for (let j = 0; j < A[i].length; j++)
                if (i === j) A[i][j] = 1;
                else A[i][j] = 0;

        this.matrix = A;
    }
}
