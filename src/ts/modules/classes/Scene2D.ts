import { Camera2D } from "./Camera2D.js";
import { Model2D } from "./Model2D.js";
import { AffineTransformation } from "./addClasses/AffineTransformation2D.js";

export class Scene {
    private Camera: Camera2D;
    private Model: Model2D;
    private AffinedModel: Model2D;
    private AccumulatedAffine: AffineTransformation;

    constructor(width: number, height: number) {
        this.Camera = new Camera2D(width, height);
        this.Model = new Model2D();
        this.AffinedModel = new Model2D();
        this.AccumulatedAffine = new AffineTransformation(3, 3);
    }

    get getCameraMethods() {
        return this.Camera;
    }

    get getModel() {
        return this.Model;
    }

    get getAffinedModel() {
        return this.AffinedModel;
    }

    get getAccumulatedAffine() {
        return this.AccumulatedAffine;
    }

    Render(model: Model2D) {
        this.Camera.clearCanvas();

        for (let i = 0; i < model.getN; i++)
            this.Camera.drawDot(model.getVertices.getElement(0, i), model.getVertices.getElement(1, i));
        for (let i = 0; i < model.getN; i++)
            for (let j = 0; j < i; j++)
                if (model.getEdges.getElement(i, j) === 1)
                    this.Camera.drawEdge(model.getVertices.getElement(0, i), model.getVertices.getElement(1, i), model.getVertices.getElement(0, j), model.getVertices.getElement(1, j));
    }
}