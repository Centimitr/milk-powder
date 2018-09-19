export class TaskStepURL {
    url: string;
    waitUntil: string;

    constructor(url, waitUntil) {
        this.url = url;
        this.waitUntil = waitUntil;
    }
}

export class TaskStepEval {
    fn: Function;
    key: string;

    constructor(fn, key) {
        this.fn = fn;
        this.key = key;
    }
}
