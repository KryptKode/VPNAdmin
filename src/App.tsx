import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  RouteProps
} from 'react-router-dom';
import {
  HomePage, HOME_ROUTE,
  LoginPage, LOGIN_ROUTE,
  ServerInfoPage, SERVER_ROUTE,
  Page404
} from './pages';

import './App.css';
import { getLoggedIn } from './utils/localStorage';

const App: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>

        <Switch>
          <PrivateRoute exact path={HOME_ROUTE}>
            <HomePage/>
          </PrivateRoute>
          <PrivateRoute path={`${SERVER_ROUTE}/:id`} >
            <ServerInfoPage/>
          </PrivateRoute>
          <PrivateRoute exact path={SERVER_ROUTE}>
            <ServerInfoPage/>
          </PrivateRoute>
          <Route exact path={LOGIN_ROUTE} component={LoginPage} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  //check if authenticated
  const loggedIn = getLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn.loggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: LOGIN_ROUTE,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
};


export default App;
