import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import store from "../store";

const PrivateRoute = ({ component: Component, ...rest}) => (
        <Route
            {...rest}
            render={props => (
                    store.getState().userReducer.token
                        ? <Component {...props} />
                        : <Redirect to={{pathname: '/login'}}/>
                )
            }
        />
);

export default PrivateRoute;