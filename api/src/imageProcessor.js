const path = require('path');
const { Worker, isMainThread } = require('worker_threads');

const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js');

function imageProcessor() {
  return new Promise((resolve, reject) => {
    // check if we are in main thread
    if (isMainThread) {
      resolve();
    } else {
      reject(new Error('not on main thread'));
    }
  });
}

module.exports = imageProcessor;
