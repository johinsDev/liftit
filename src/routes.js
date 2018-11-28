import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import CreateBooking from './modules/bookings/create/CreateBooking';
import ListBooking from './modules/bookings/list/listBooking';
import Login from './modules/auth/login/Login';
import Register from './modules/auth/register/Register';
import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { Provider } from 'react-redux';
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import store from './store';
import decode from 'jwt-decode';

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  try {
    decode(token);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ))}
  />
);

class routes extends Component {
  render() {
    return (
      <main>
        <Provider store={store}>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <>
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/sign-up" exact={true} component={Register} />
                <PrivateRoute path="/create-booking" component={CreateBooking} />
                <PrivateRoute path="/bookings" component={ListBooking} />
              </Switch>
            </BrowserRouter>
            </>
          </JssProvider>
        </Provider>
      </main>
    );
  }
}

export default routes;