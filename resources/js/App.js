import React from "react";
import { Route, Switch, withRouter,Redirect } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import {useSelector} from "react-redux";
import SigninPage from "./pages/signin-page/SigninPage";


const App = props => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  return (
    <div className={"app"}>
      <Navbar/>
      <Switch location={props.history.location}>
        <GuestRoute authenticated={isLoggedIn} path={"/login"} component={SigninPage}/>
        <AuthRoute authenticated={isLoggedIn} path={"/"} component={HomePage}/>
      </Switch>
    </div>
  );
};
function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
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
}


export default withRouter(App);
