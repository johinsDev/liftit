import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root')

ReactDOM.render(<App />, rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
