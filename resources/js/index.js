


// new code
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createBrowserHistory } from "history";
import axiosInstance from "./config/axios-instance";
import store from "./stores/store-dev";

import App from "./App";

import "antd/dist/antd.min.css";
import "./stylesheets/main.scss";

import { connectTheUser, getAuthUser } from "./actions/auth-actions/actions";


import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
});

export const history = createBrowserHistory();

const token = localStorage.getItem("halber_token");

if (token) {
    // if token exists in local storage!
    store.dispatch(connectTheUser(token));
}

store.subscribe(() => {
    const reduxSubs = store.getState();
    if (reduxSubs.authReducer.token) {
        axiosInstance.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${reduxSubs.authReducer.token}`;
        axiosInstance.defaults.headers[
            "Authorization"
            ] = `Bearer ${reduxSubs.authReducer.token}`;
    }
});



const WrappedApp = props => {

    useEffect(() => {
        if (token) {
            // We need to check if the token are valid or not by getting the auth user
            props.store.dispatch(getAuthUser());
        }
    }, [props.store]);

    return (
        <>{props.children}</>
    );
};

const mapStateToProps = reduxStore => {
    return {
        isLoadingUser: reduxStore.authReducer.isLoadingUser
    };
};

const ConnectedWrappedApp = connect(mapStateToProps)(WrappedApp);

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
        <ConnectedWrappedApp store={store}>
            <Router history={history}>
                <App />
            </Router>
        </ConnectedWrappedApp>
        </ApolloProvider>
    </Provider>,
    document.getElementById("root")
);
