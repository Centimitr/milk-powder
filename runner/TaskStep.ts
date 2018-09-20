export class TaskStepURL {
    url: string;
    params: object;

    constructor(url, params = {}) {
        this.url = url;
        this.params = params
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
