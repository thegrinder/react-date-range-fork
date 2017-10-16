import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './components/Main';

ReactDom.render(<Main />, document.getElementById('root'));

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Main);

if (module.hot) {
  module.hot.accept("./components/Main", () => {
    render(Main);
  });
}