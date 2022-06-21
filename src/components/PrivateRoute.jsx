import React from "react";
import { Redirect, Route } from "react-router-dom";
function PrivateRoute({ component: Component, ...rest }) {
    
    const accountState = JSON.parse(window.localStorage.getItem("user"));
    return (
      <Route
        {...rest}
        render={(props) =>
          accountState ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;
