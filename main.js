const puppeteer = require('puppeteer');

class Task {

    constructor(...steps) {
        this.ptr = -1;
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

class TaskStepURL {
    constructor(url, waitUntil) {
        this.url = url;
        this.waitUntil = waitUntil;
    }
}

class TaskStepEval {
    constructor(fn, key) {
        this.fn = fn;
        this.key = key;
    }
}

class Runner {
    constructor() {
        this.browser = null;
    }

    async launch() {
        this.browser = await puppeteer.launch();
    }

    async exec(t) {
        const page = await this.browser.newPage();
        let ns;
        const state = new Map();
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

const fn = () => document.querySelector('[itemprop="price"]').textContent.trim();
const chemistURL = 'https://www.chemistwarehouse.com.au/buy/88027/a2-milk-powder-manuka-honey-400g';
const epharmacyURL = 'http://www.epharmacy.com.au/product.asp?id=88027&pname=A2+Milk+Powder+Manuka+Honey+400g';

const t1 = new Task(new TaskStepURL(chemistURL, 'networkidle2'), new TaskStepEval(fn, 'price'));
const t2 = new Task(new TaskStepURL(epharmacyURL, 'networkidle2'), new TaskStepEval(fn, 'price'));
const r = new Runner();
(async function f() {
    await r.launch();
    await Promise.all([r.exec(t1, r.exec(t2))]);
    await r.close();
})();