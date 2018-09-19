import {Task, TaskRunner, TaskStepEval, TaskStepURL} from "./runner";

const fn = () => document.querySelector('[itemprop="price"]').textContent.trim();
const chemistURL = 'https://www.chemistwarehouse.com.au/buy/88027/a2-milk-powder-manuka-honey-400g';
const epharmacyURL = 'http://www.epharmacy.com.au/product.asp?id=88027&pname=A2+Milk+Powder+Manuka+Honey+400g';

const t1 = new Task(new TaskStepURL(chemistURL, 'networkidle2'), new TaskStepEval(fn, 'price'));
const t2 = new Task(new TaskStepURL(epharmacyURL, 'networkidle2'), new TaskStepEval(fn, 'price'));
const r = new TaskRunner();
// @ts-ignore
(async () => {
    await r.launch();
    // @ts-ignore
    await Promise.all([r.exec(t1), r.exec(t2)]);
    await r.close();
})();