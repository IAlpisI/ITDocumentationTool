import React from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: any) => {
    let history = useHistory();

    const routeComponent = (props: any) =>
        localStorage.getItem('role')
            ? React.createElement(component, props)
            : history.push('./login');

    return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
