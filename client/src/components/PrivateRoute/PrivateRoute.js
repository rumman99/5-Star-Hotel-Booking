import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { userContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {

    const [userInfo]= useContext(userContext);
    console.log(userInfo);
    return (
        <Route
        {...rest}
        render={({ location }) =>
        userInfo.email ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
};

export default PrivateRoute;