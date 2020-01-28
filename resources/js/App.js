import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";

/*import SigninPage from "./pages/signin-page/SigninPage";
import SignUpPage from "./pages/signup-page/SignUpPage";*/
const App = props => {
  return (
    <div className={"app"}>
      <Navbar/>
      <Switch location={props.history.location}>
        <Route exact path={"/"} component={HomePage} />
      </Switch>
    </div>
  );
};
/*function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function GuestRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}*/


export default withRouter(App);
