import * as puppeteer from "puppeteer";
import {TaskStepEval, TaskStepURL} from "./TaskStep";

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
            // @ts-ignore
            switch (ns.constructor.name) {
                case TaskStepURL.name:
                    await page.goto(ns.url, ns.params);
                    break;
                case TaskStepEval.name:
                    const v = await page.evaluate(ns.fn);
                    state.set(ns.key, v);
                    break;
            }
        }
        console.table(state);
        await page.close();
    }

    async close() {
        await this.browser.close();
    }
}