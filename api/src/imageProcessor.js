const path = require('path');
const { Worker, isMainThread } = require('worker_threads');

const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js');
const pathToMonochromeWorker = path.resolve(__dirname, 'monochromeWorker.js');

function imageProcessor(filename) {
  const sourcePath = uploadPathResolver(filename);
  const resizedDestination = uploadPathResolver(`resized-${filename}`);
  const monochromeDestination = uploadPathResolver(`monochrome-${filename}`);

  return new Promise((resolve, reject) => {
    // check if we are in main thread
    if (isMainThread) {
      try {
        resizeWorker = new Worker(pathToResizeWorker, {
          workerData: {
            source: sourcePath,
            destination: resizedDestination,
          },
        });

        monochromeWorker = new Worker(pathToMonochromeWorker, {
          workerData: {
            source: sourcePath,
            destination: monochromeDestination,
          },
        });

      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('not on main thread'));
    }
    resolve();
  });
}

function uploadPathResolver(filename) {
  return path.resolve(__dirname, '../uploads', filename);
}

module.exports = imageProcessor;
