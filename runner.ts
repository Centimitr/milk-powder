import * as puppeteer from "puppeteer";

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

export class TaskRunner {
    browser: any;

    async launch() {
        this.browser = await puppeteer.launch();
    }

    async exec(t) {
        const page = await this.browser.newPage();
        let ns;
        // @ts-ignore
        const state = new Map<string, any>();
        while (ns = t.next()) {
            if (ns instanceof TaskStepURL) {
                await page.goto(ns.url, {waitUntil: ns.waitUntil});
            } else if (ns instanceof TaskStepEval) {
                const v = await page.evaluate(ns.fn);
                state.set(ns.key, v);
            }
        }

        console.table(state);
        await page.close();
    }

    async close() {
        await this.browser.close();
    }
}