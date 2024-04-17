import { AffineTransformation } from "./modules/classes/addClasses/AffineTransformation2D.js";
import { Matrix } from "./modules/classes/addClasses/Matrix.js"
import { Vector } from "./modules/classes/addClasses/Vector.js";
import { Scene } from "./modules/classes/Scene2D.js";

const WIDTH = 800;
const HEIGHT = 500;

const scene = new Scene(WIDTH, HEIGHT);

let helpVertice = new Vector(3);

let affineTranslation = new AffineTransformation(3, 3);

let affineRotation = new AffineTransformation(3, 3);

let affineMirror = new AffineTransformation(3, 3);

let affineMirrorOY = new AffineTransformation(3, 3);
affineMirrorOY.mirror(1, -1);

let affineMirrorOX = new AffineTransformation(3, 3);
affineMirrorOX.mirror(-1, 1);

let affineMirrorXY = new AffineTransformation(3, 3);
affineMirrorXY.mirror(-1, -1);

let affineScale = new AffineTransformation(3, 3);

let queue = new Array<AffineTransformation>;

// let numV = JSON.parse(localStorage.getItem("numV"));
// let numE = JSON.parse(localStorage.getItem("numE"));

// interface edgeStorage {
//     first: {
//         x: number,
//         y: number
//     },
//     second: {
//         x: number,
//         y: number,
//     },
// }

// for (let i = 0; i < numV; i++) {
//     let storage = JSON.parse(localStorage.getItem("vertice" + i));
//     for (let j = 0; j < 3; j++) {
//         helpVertice.fillVector(j + 1, storage[j]);
//     }
//     scene.getModel.addVerticeToModel(helpVertice)
//     scene.getAffinedModel.addVerticeToModel(helpVertice)
// }

// for (let i = 0; i < numE; i++) {
//     let edge: edgeStorage;
//     edge = JSON.parse(localStorage.getItem("edge" + i));
//     let first_index: number;
//     let second_index: number;
//     for (let j = 0; j < scene.getModel.getVertices.getCols; j++) {
//         if (scene.getModel.getVertices.getElement(0, j) === edge.first.x)
//             if (scene.getModel.getVertices.getElement(1, j) === edge.first.y) first_index = j;
//         if (scene.getModel.getVertices.getElement(0, j) === edge.second.x)
//             if (scene.getModel.getVertices.getElement(1, j) === edge.second.y) second_index = j;
//     }
//     scene.getModel.addEdgeToModel(first_index, second_index);
//     scene.getAffinedModel.addEdgeToModel(first_index, second_index);
// }

document.getElementById("push_button").onclick = function () {
    let X = document.getElementById("push_X") as HTMLInputElement;
    helpVertice.fillVector(1, +X.value);
    let Y = document.getElementById("push_Y") as HTMLInputElement;
    helpVertice.fillVector(2, +Y.value);

    let flag: boolean = false;

    for (let j = 0; j < scene.getModel.getVertices.getCols; j++)
        if (scene.getModel.getVertices.getElement(0, j) === +X.value)
            if (scene.getModel.getVertices.getElement(1, j) === +Y.value)
                flag = true;
    if (!flag) {
        scene.getModel.addVerticeToModel(helpVertice);
        scene.getAffinedModel.addVerticeToModel(helpVertice);
        // let help = [];
        // for (let j = 0; j < 3; j++) {
        //     help.push(helpVertice.getElement(j))
        // }
        // localStorage.setItem("vertice" + numV++, JSON.stringify(help));
        // localStorage.setItem("numV", JSON.stringify(scene.getModel.getN));
    }

    let form = document.getElementById('push_form') as HTMLFormElement;
    form.reset();

    scene.Render(scene.getAffinedModel);
}

// document.getElementById("render_button").onclick = function () {
//     scene.Render(scene.getAffinedModel);
// }

document.getElementById("pop_button").onclick = function () {
    let X = document.getElementById("push_X") as HTMLInputElement;
    helpVertice.fillVector(1, +X.value);
    let Y = document.getElementById("push_Y") as HTMLInputElement;
    helpVertice.fillVector(2, +Y.value);

    let flag: boolean = false;

    for (let j = 0; j < scene.getModel.getVertices.getCols; j++)
        if (scene.getModel.getVertices.getElement(0, j) === +X.value)
            if (scene.getModel.getVertices.getElement(1, j) === +Y.value)
                flag = true;
    if (flag) {
        scene.getModel.deleteVertice(helpVertice);
        scene.getAffinedModel.copyModel(scene.getModel.getVertices, scene.getModel.getEdges, scene.getModel.getN);
    }

    let form = document.getElementById('push_form') as HTMLFormElement;
    form.reset();

    scene.Render(scene.getAffinedModel);
}

document.getElementById("connect_button").onclick = function () {
    let first = new Vector(3);
    let second = new Vector(3);

    let first_index: number;
    let second_index: number;

    let first_flag: boolean = false;
    let second_flag: boolean = false;

    let X_1 = document.getElementById("connect_X_1") as HTMLInputElement;
    first.fillVector(1, +X_1.value);
    let Y_1 = document.getElementById("connect_Y_1") as HTMLInputElement;
    first.fillVector(2, +Y_1.value);

    let X_2 = document.getElementById("connect_X_2") as HTMLInputElement;
    second.fillVector(1, +X_2.value);
    let Y_2 = document.getElementById("connect_Y_2") as HTMLInputElement;
    second.fillVector(2, +Y_2.value);

    for (let j = 0; j < scene.getModel.getVertices.getCols; j++)
        if (scene.getModel.getVertices.getElement(0, j) === +X_1.value)
            if (scene.getModel.getVertices.getElement(1, j) === +Y_1.value) {
                first_index = j;
                first_flag = true;
            }
    if (!first_flag) {
        scene.getModel.addVerticeToModel(first);

        // let help = [];
        // for (let j = 0; j < 3; j++) {
        //     help.push(first.getElement(j))
        // }
        // localStorage.setItem("vertice" + numV++, JSON.stringify(help));
        // localStorage.setItem("numV", JSON.stringify(scene.getModel.getN));

        first_index = scene.getModel.getN - 1;
    }

    for (let j = 0; j < scene.getModel.getVertices.getCols; j++)
        if (scene.getModel.getVertices.getElement(0, j) === +X_2.value)
            if (scene.getModel.getVertices.getElement(1, j) === +Y_2.value) {
                second_index = j;
                second_flag = true;
            }
    if (!second_flag) {
        scene.getModel.addVerticeToModel(second);

        // let help = [];
        // for (let j = 0; j < 3; j++) {
        //     help.push(second.getElement(j))
        // }
        // localStorage.setItem("vertice" + numV++, JSON.stringify(help));
        // localStorage.setItem("numV", JSON.stringify(scene.getModel.getN));

        second_index = scene.getModel.getN - 1;
    }

    scene.getModel.addEdgeToModel(first_index, second_index);
    scene.getAffinedModel.copyModel(scene.getModel.getVertices, scene.getModel.getEdges, scene.getModel.getN);

    // let edge: edgeStorage = {
    //     first: {
    //         x: +X_1.value,
    //         y: +Y_1.value
    //     },
    //     second: {
    //         x: +X_2.value,
    //         y: +Y_2.value,
    //     },
    // }
    // localStorage.setItem("edge" + numE++, JSON.stringify(edge));
    // localStorage.setItem("numE", JSON.stringify(numE));

    let form = document.getElementById('connect_form') as HTMLFormElement;
    form.reset();

    scene.Render(scene.getAffinedModel);
}

document.getElementById("disconnect_button").onclick = function () {
    let first = new Vector(3);
    let second = new Vector(3);

    let X_1 = document.getElementById("connect_X_1") as HTMLInputElement;
    first.fillVector(1, +X_1.value);
    let Y_1 = document.getElementById("connect_Y_1") as HTMLInputElement;
    first.fillVector(2, +Y_1.value);

    let X_2 = document.getElementById("connect_X_2") as HTMLInputElement;
    second.fillVector(1, +X_2.value);
    let Y_2 = document.getElementById("connect_Y_2") as HTMLInputElement;
    second.fillVector(2, +Y_2.value);

    scene.getModel.deleteEdgeByVertices(first, second);
    scene.getAffinedModel.copyModel(scene.getModel.getVertices, scene.getModel.getEdges, scene.getModel.getN);

    let form = document.getElementById('connect_form') as HTMLFormElement;
    form.reset();

    scene.Render(scene.getAffinedModel);
}

document.getElementById("clear_button").onclick = function () {
    scene.getModel.deleteModel();
    scene.getAffinedModel.deleteModel();
    scene.getAccumulatedAffine.reset();
    scene.getCameraMethods.clearCanvas();
}

document.getElementById("reset_affine_button").onclick = function () {
    scene.getAffinedModel.copyModel(scene.getModel.getVertices, scene.getModel.getEdges, scene.getModel.getN);
    scene.getAccumulatedAffine.reset();
    scene.Render(scene.getModel);
}

document.getElementById("reset_button").onclick = function () {
    scene.getCameraMethods.reset();
    scene.Render(scene.getAffinedModel);
}

document.getElementById("translation").onchange = function () {
    let translation = document.getElementById("translation") as HTMLInputElement;
    if (translation.checked) {
        let X = document.getElementById("translation_X") as HTMLInputElement;
        let Y = document.getElementById("translation_Y") as HTMLInputElement;

        affineTranslation.translate(+X.value, +Y.value);

        queue.unshift(affineTranslation);
    }
    else queue.splice(queue.indexOf(affineTranslation), 1);
}

document.getElementById("scale").onchange = function () {
    let scale = document.getElementById("scale") as HTMLInputElement;
    if (scale.checked) {
        let Kx = document.getElementById("scale_X") as HTMLInputElement;
        let Ky = document.getElementById("scale_Y") as HTMLInputElement;

        let kX: number;
        let kY: number;

        if (+Kx.value === 0) kX = 1; else kX = +Kx.value;
        if (+Ky.value === 0) kY = 1; else kY = +Ky.value;

        affineScale.scale(kX, kY);

        queue.unshift(affineScale);
    }
    else queue.splice(queue.indexOf(affineScale), 1);
}

document.getElementById("mirror").onchange = function () {
    let mirror = document.getElementById("mirror") as HTMLInputElement;
    if (mirror.checked) {
        let X_1 = document.getElementById("mirror_X_1") as HTMLInputElement;
        let Y_1 = document.getElementById("mirror_Y_1") as HTMLInputElement;
        let X_2 = document.getElementById("mirror_X_2") as HTMLInputElement;
        let Y_2 = document.getElementById("mirror_Y_2") as HTMLInputElement;

        function angle(cx: number, cy: number, ex: number, ey: number) {
            let dy = ey - cy;
            let dx = ex - cx;
            let phi = Math.atan2(dy, dx);
            phi *= 180 / Math.PI;
            return phi;
        }

        let mirrorTr = new AffineTransformation(3, 3);
        let mirrorRt = new AffineTransformation(3, 3);
        let mirror_Rt = new AffineTransformation(3, 3);
        let mirror_Tr = new AffineTransformation(3, 3);

        mirrorTr.translate((-1) * +X_1.value, (-1) * +Y_1.value);
        mirrorRt.rotate((-1) * angle(+X_1.value, +Y_1.value, +X_2.value, +Y_2.value))
        mirror_Rt.rotate(angle(+X_1.value, +Y_1.value, +X_2.value, +Y_2.value))
        mirror_Tr.translate(+X_1.value, +Y_1.value);

        affineMirror.multiplyMatrixMatrix(mirror_Tr, mirror_Rt);
        affineMirror.multiplyMatrixMatrix(affineMirror, affineMirrorOY);
        affineMirror.multiplyMatrixMatrix(affineMirror, mirrorRt);
        affineMirror.multiplyMatrixMatrix(affineMirror, mirrorTr);

        queue.unshift(affineMirror);
    }
    else queue.splice(queue.indexOf(affineMirror), 1);
}

document.getElementById("rotate").onchange = function () {
    let rotation = document.getElementById("rotate") as HTMLInputElement;
    if (rotation.checked) {
        let X = document.getElementById("rotate_X") as HTMLInputElement;
        let Y = document.getElementById("rotate_Y") as HTMLInputElement;
        let phi = document.getElementById("rotate_phi") as HTMLInputElement;

        let rotateTr = new AffineTransformation(3, 3);
        let rotate_Tr = new AffineTransformation(3, 3);

        rotateTr.translate((-1) * +X.value, (-1) * +Y.value);
        rotate_Tr.translate(+X.value, +Y.value);

        affineRotation.rotate(+phi.value);

        affineRotation.multiplyMatrixMatrix(rotate_Tr, affineRotation);
        affineRotation.multiplyMatrixMatrix(affineRotation, rotateTr);

        queue.unshift(affineRotation);
    }

    else queue.splice(queue.indexOf(affineRotation), 1);
}

document.getElementById("mirror_OX").onchange = function () {
    let mirror = document.getElementById("mirror_OX") as HTMLInputElement;
    if (mirror.checked)
        queue.unshift(affineMirrorOX);
    else queue.splice(queue.indexOf(affineMirrorOX), 1);
}

document.getElementById("mirror_OY").onchange = function () {
    let mirror = document.getElementById("mirror_OY") as HTMLInputElement;
    if (mirror.checked)
        queue.unshift(affineMirrorOY);
    else queue.splice(queue.indexOf(affineMirrorOY), 1);
}

document.getElementById("mirror_XY").onchange = function () {
    let mirror = document.getElementById("mirror_XY") as HTMLInputElement;
    if (mirror.checked)
        queue.unshift(affineMirrorXY);
    else queue.splice(queue.indexOf(affineMirrorXY), 1);
}

document.getElementById("affine_button").onclick = function () {
    let help = new Matrix(3, 3);

    queue.forEach(transformation => {
        help.multiplyMatrixMatrix(help, transformation);
    })

    scene.getAccumulatedAffine.multiplyMatrixMatrix(help, scene.getAccumulatedAffine)

    let help1 = new Matrix(3, scene.getAffinedModel.getN);

    help1.multiplyMatrixMatrix(scene.getAccumulatedAffine, scene.getModel.getVertices);

    scene.getAffinedModel.copyModel(help1, scene.getModel.getEdges, scene.getModel.getN);

    queue.splice(0, queue.length);

    let forms = document.querySelectorAll('form') as NodeListOf<HTMLFormElement>;
    forms.forEach(form => form.reset());

    scene.Render(scene.getAffinedModel);
}

const obj = document.getElementById("c1") as HTMLCanvasElement;
let Xstart: number;
let Ystart: number;

let trnsFlag: boolean = false;

obj.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
        trnsFlag = true;
        Xstart = event.clientX;
        Ystart = event.clientY;
    }
});

obj.addEventListener('mousemove', function (event) {
    if (trnsFlag) {
        const deltaX = event.clientX - Xstart;
        const deltaY = event.clientY - Ystart;

        scene.getCameraMethods.translateCanvas(deltaX, deltaY);

        Xstart = event.clientX;
        Ystart = event.clientY;

        scene.Render(scene.getAffinedModel);
    }
});

obj.addEventListener('mouseup', function (event) {
    if (event.button === 0) {
        trnsFlag = false;
    }
});

obj.addEventListener("wheel", function (event) {
    scene.getCameraMethods.getCoordinates(event);
    scene.Render(scene.getAffinedModel);
})

const X = document.getElementById("X") as HTMLParagraphElement;
const Y = document.getElementById("Y") as HTMLParagraphElement;

obj.onmousemove = function (event) {
    const rect = obj.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const html = scene.getCameraMethods.screenToWorld(mouseX, mouseY);

    X.innerHTML = "X: " + (Math.round((html[0] * 100)) / 100).toString();
    Y.innerHTML = "Y: " + (Math.round((html[1] * 100)) / 100).toString();
}

obj.onmouseout = function () {
    X.innerHTML = "X: ";
    Y.innerHTML = "Y: ";
}

document.getElementById("increase_button").onclick = function () {
    scene.getCameraMethods.changeResolution(-1);

    let help1 = new Matrix(3, scene.getAffinedModel.getN);
    affineScale.scale(2, 2);
    scene.getAffinedModel.getVertices.multiplyMatrixMatrix(affineScale, scene.getAffinedModel.getVertices);
    scene.getModel.getVertices.multiplyMatrixMatrix(affineScale, scene.getModel.getVertices);

    scene.Render(scene.getAffinedModel);
}

document.getElementById("decrease_button").onclick = function () {
    scene.getCameraMethods.changeResolution(+1);

    let help1 = new Matrix(3, scene.getAffinedModel.getN);
    affineScale.scale(Math.pow(2, -1), Math.pow(2, -1));
    scene.getAffinedModel.getVertices.multiplyMatrixMatrix(affineScale, scene.getAffinedModel.getVertices);
    scene.getModel.getVertices.multiplyMatrixMatrix(affineScale, scene.getModel.getVertices);

    scene.Render(scene.getAffinedModel);
}

// document.getElementById("resize_button").onclick = function () {
// }
// let width = document.getElementById("W") as HTMLInputElement;
// let height = document.getElementById("H") as HTMLInputElement;
// width.onchange= function () {
// }

const right = document.getElementById("right") as HTMLDivElement;
const bottom = document.getElementById("bottom") as HTMLDivElement;

let resizeXFlag: boolean = false;
let resizeYFlag: boolean = false;

right.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
        resizeXFlag = true;
        Xstart = event.clientX;
    }
});

document.addEventListener('mousemove', function (event) {
    if (resizeXFlag) {
        const deltaX = event.clientX - Xstart;
        
        scene.getCameraMethods.changeWidth(deltaX)

        Xstart = event.clientX;

        scene.Render(scene.getAffinedModel);
    }
});

document.addEventListener('mouseup', function (event) {
    if (event.button === 0 && resizeXFlag) {
        resizeXFlag = false;
    }
});

bottom.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
        resizeYFlag = true;
        Ystart = event.clientY;
    }
});

document.addEventListener('mousemove', function (event) {
    if (resizeYFlag) {
        const deltaY = event.clientY - Ystart;

        scene.getCameraMethods.changeHeight(deltaY)

        Ystart = event.clientY;

        scene.Render(scene.getAffinedModel);
    }
});

document.addEventListener('mouseup', function (event) {
    if (event.button === 0 && resizeYFlag) {
        resizeYFlag = false;
    }
});