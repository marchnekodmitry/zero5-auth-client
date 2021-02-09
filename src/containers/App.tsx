import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { CssBaseline, StylesProvider } from '@material-ui/core';

import store from '@/store';

import Home from '@/containers/Home';
import SignIn from '@/containers/SignIn';
import SignUp from '@/containers/SignUp';
import Code from '@/containers/Code';

import PrivateRoute from '@/components/helpers/PrivateRoute';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <GlobalStyle />

        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/code" component={Code} />
        </Switch>
      </StylesProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
