import lodash from 'lodash';
import * as localStorageService from './services/localstorage';
import apiClientService from './services/api-client';

const MAX_PASSED_QUEUE_SIZE = 50;

const matchPath = (updatee, path) => lodash.isEqual(updatee.data.paths[0], path);

const getTarget = updatee => updatee.target.get(updatee.data.paths[0]);

function splitPaths(tree, updatee, next) {
  updatee.data.paths.forEach((path) => {
    const copy = lodash.cloneDeep(updatee);
    copy.data.paths = [path];
    next(tree, copy);
  });
}

function serializeCount(tree, updatee, next) {
  if (matchPath(updatee, ['count'])) {
    const value = getTarget(updatee);
    localStorageService.set(updatee.data.paths[0].join('/'), value);
  }
  next(tree, updatee);
}

function log(tree, updatee, next) {
  /* eslint-disable no-console */
  console.group('update:', updatee.data.paths[0]);
  console.log(updatee.target.get(updatee.data.paths[0]));
  console.groupEnd();
  next(tree, updatee);
  /* eslint-enable */
}

export default [
  splitPaths,
  serializeCount,
  log,
];
