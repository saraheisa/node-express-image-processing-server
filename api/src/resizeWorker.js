const gm = require('gm');
const { workerData, parentPort } = require('worker_threads');

gm(workerData.source).resize(100, 100);
