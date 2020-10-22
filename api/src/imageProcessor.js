const path = require('path');
const { Worker, isMainThread } = require('worker_threads');

const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js');
const pathToMonochromeWorker = path.resolve(__dirname, 'monochromeWorker.js');

function imageProcessor(filename) {
  const sourcePath  = uploadPathResolver(filename);
  return new Promise((resolve, reject) => {
    // check if we are in main thread
    if (isMainThread) {
      resolve();
    } else {
      reject(new Error('not on main thread'));
    }
  });
}

function uploadPathResolver(filename) {
  return path.resolve(__dirname, '../uploads', filename);
}

module.exports = imageProcessor;
