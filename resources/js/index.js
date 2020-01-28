import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";

import "antd/dist/antd.min.css";
import "./stylesheets/main.scss";

export const history = createBrowserHistory();
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
});

ReactDOM.render(

    <ApolloProvider client={client}>
        <Router history={history}>
            <App />
        </Router></ApolloProvider>,
  document.getElementById("root")
);
