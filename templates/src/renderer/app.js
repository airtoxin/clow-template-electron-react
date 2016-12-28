import React from 'react';
import lodash from 'lodash';
import { render } from 'react-dom';
import { root } from 'baobab-react/higher-order';
import App from './containers/App';
import * as localStorageService from './services/localstorage';
import middlewares from './middlewares';
import tree from './tree';

// set middlewares
const mdls = lodash.reverse(middlewares.slice());
tree.on('update', (updatee) => {
  mdls.reduce(
    (next, middleware) => (tr, updt) => middleware(tr, updt, next),
    () => {},
  )(tree, updatee);
});

// restore values from local storage
Object.entries(localStorageService.getAll()).forEach(([key, value]) => {
  tree.set(key.split('/'), value);
});
tree.commit();

const Rooted = root(tree, App);

render(<Rooted />, document.getElementById('app'));
