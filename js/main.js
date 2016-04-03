import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './reducers';
import {App, Home, About, Game} from './containers/index';

import keyPress from './actions/keyPress';
import dropTimer from './actions/timer';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const store = createStore(reducer);
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="game" component={Game} />
      <Route path="ppuzzles" component={Game} />
    </Route>
  </Router>
);

// TODO: can we move this somewhere else?
window.addEventListener('keydown', (e) => {
  var code = e.keyCode ? e.keyCode : e.which;
  store.dispatch(keyPress(code));
});

setInterval(() => {
  store.dispatch((dropTimer()));
}, 1000);

// store.subscribe(() => {
  // console.log(store.getState().move.matrix)}
// );

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('mount')
);
