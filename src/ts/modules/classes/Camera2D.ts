export class Camera2D {
    private X0: number;
    private Y0: number;
    private W: number;
    private H: number;
    private p: number;

    constructor(W: number, H: number) {
        this.X0 = W / 2;
        this.Y0 = H / 2;
        this.W = W;
        this.H = H;
        this.p = 10;

        const obj = document.getElementById("c1") as HTMLCanvasElement;
        obj.width = W;
        obj.height = H;

        this.drawCells(this.X0, this.Y0, W, H, this.p);
        this.drawAxes(this.X0, this.Y0, W, H);
        this.drawArrows(this.X0, this.Y0, W);
    }

    drawAxes(x0: number, y0: number, w: number, h: number) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.strokeStyle = '#666666';

            ctx.beginPath();
            ctx.moveTo(x0, 0);
            ctx.lineTo(x0, h);
            ctx.stroke();

            ctx.moveTo(0, y0);
            ctx.lineTo(w, y0);
            ctx.stroke();
        }
    }

    drawArrows(x0: number, y0: number, w: number) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(x0 - 5, 6);
            ctx.lineTo(x0, 1);
            ctx.lineTo(x0 + 5, 6);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(w - 6, y0 - 5);
            ctx.lineTo(w - 1, y0);
            ctx.lineTo(w - 6, y0 + 5);
            ctx.stroke();
        }
    }

    drawCells(x0: number, y0: number, w: number, h: number, p: number) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.strokeStyle = '#DDDDDD';
            for (let i = x0, j = x0; i <= w || j >= 0; i += p, j -= p) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, h);
                ctx.moveTo(j, 0);
                ctx.lineTo(j, h);
                ctx.stroke();
            }

            for (let i = y0, j = y0; i <= h || j >= 0; i += p, j -= p) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(w, i);
                ctx.moveTo(0, j);
                ctx.lineTo(w, j);
                ctx.stroke();
            }
        }
    }

    drawDot(x: number, y: number) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.beginPath();
            ctx.ellipse(this.worldToScreen(this.X0, this.Y0, x, y, this.p)[0],
                this.worldToScreen(this.X0, this.Y0, x, y, this.p)[1],
                2, 2, 0, 0, 2 * Math.PI)

            ctx.fill();
        }
    }

    drawEdge(x1: number, y1: number, x2: number, y2: number) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(this.worldToScreen(this.X0, this.Y0, x1, y1, this.p)[0], this.worldToScreen(this.X0, this.Y0, x1, y1, this.p)[1]);
            ctx.lineTo(this.worldToScreen(this.X0, this.Y0, x2, y2, this.p)[0], this.worldToScreen(this.X0, this.Y0, x2, y2, this.p)[1]);
            ctx.stroke();
        }
    }

    worldToScreen(x0: number, y0: number, x_world: number, y_world: number, p: number) {
        let x_screen: number;
        let y_screen: number;

        x_screen = Math.floor(x0 + p * x_world);
        y_screen = Math.floor(y0 - p * y_world);

        return [x_screen, y_screen];
    }

    screenToWorld(x_screen: number, y_screen: number) {
        let x_world: number;
        let y_world: number;

        x_world = (x_screen - this.X0 + 0.5) / this.p;
        y_world = -(y_screen - this.Y0 + 0.5) / this.p;

        return [x_world, y_world];
    }

    clearCanvas() {
        const obj = document.getElementById("c1") as HTMLCanvasElement;

        if (obj.getContext) {
            const ctx: CanvasRenderingContext2D = obj.getContext("2d");

            ctx.clearRect(0, 0, this.W, this.H);
        }

        this.drawCells(this.X0, this.Y0, this.W, this.H, this.p);
        this.drawAxes(this.X0, this.Y0, this.W, this.H);
        this.drawArrows(this.X0, this.Y0, this.W);
    }

    translateCanvas(deltaX: number, deltaY: number) {
        this.X0 += deltaX;
        this.Y0 += deltaY;
    }

    scaleCanvas(x0: number, y0: number, x_center: number, y_center: number, k: number) {
        this.X0 = x_center - k * (x_center - x0);
        this.Y0 = y_center - k * (y_center - y0);
        this.p *= k;
    }

    getCoordinates(event: WheelEvent) {
        const obj = document.getElementById("c1") as HTMLCanvasElement;
        event.preventDefault();

        const rect = obj.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const k = 1 - event.deltaY * 0.25 / 100;

        this.scaleCanvas(this.X0, this.Y0, mouseX, mouseY, k);
    }

    changeResolution(k: number) {
        this.p *= Math.pow(2, k)
    }

    changeWidth(deltaW: number) {
        const W = this.W + deltaW;

        this.X0 *= W / this.W;
        this.W = W;

        const obj = document.getElementById("c1") as HTMLCanvasElement;

        obj.width = this.W;

        const box = document.getElementById("box") as HTMLDivElement;
        box.style.width = this.W + "px";
    }

    changeHeight(deltaH: number) {
        const H = this.H + deltaH;

        this.Y0 *= H / this.H;
        this.H = H;

        const obj = document.getElementById("c1") as HTMLCanvasElement;

        obj.height = this.H;

        const box = document.getElementById("box") as HTMLDivElement;
        box.style.height = this.H + "px";
    }

    reset() {
        this.X0 = this.W / 2;
        this.Y0 = this.H / 2;
    }
}