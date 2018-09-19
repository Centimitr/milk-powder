export class Task {
    ptr = -1;
    steps = [];

    constructor(...steps) {
        this.steps = steps;
    }

    next() {
        this.ptr += 1;
        if (this.ptr + 1 > this.steps.length) {
            return null;
        }
        return this.steps[this.ptr];
    }
}

