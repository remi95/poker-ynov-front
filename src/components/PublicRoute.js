import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import store from "../store";

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            store.getState().userReducer.token
                ? <Redirect to={{pathname: '/'}}/>
                : <Component {...props} />
            )
        }
    />
);

export default PublicRoute;