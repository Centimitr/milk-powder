import {Task} from "./runner/Task";
import {TaskStepEval, TaskStepURL} from "./runner/TaskStep";
import {TaskRunner} from "./runner/TaskRunner";

const fn = () => document.querySelector('[itemprop="price"]').textContent.trim();
const chemistURL = 'https://www.chemistwarehouse.com.au/buy/88027/a2-milk-powder-manuka-honey-400g';
const epharmacyURL = 'http://www.epharmacy.com.au/product.asp?id=88027&pname=A2+Milk+Powder+Manuka+Honey+400g';
const chemistURL2 = 'https://www.chemistwarehouse.com.au/buy/82825/goat-soap-100g-6-pack';
const epharmacyURL2 = 'http://www.epharmacy.com.au/product.asp?id=82825&pname=Goat-Soap-100g-6-Pack';

//networkidle2
const t1 = new Task(new TaskStepURL(chemistURL), new TaskStepEval(fn, 'price'));
const t2 = new Task(new TaskStepURL(epharmacyURL), new TaskStepEval(fn, 'price'));
const t3 = new Task(new TaskStepURL(chemistURL2), new TaskStepEval(fn, 'price'));
const t4 = new Task(new TaskStepURL(epharmacyURL2), new TaskStepEval(fn, 'price'));

const r = new TaskRunner();
// @ts-ignore
(async () => {
    await r.launch();
    // @ts-ignore
    // await Promise.all([r.exec(t1), r.exec(t2)]);
    await r.execAll([t1, t2]);
    await r.execAll([t3, t4]);
    await r.close();
})();