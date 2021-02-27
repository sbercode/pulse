import React from 'react';
import { Switch, Route, RouteProps } from "react-router-dom";
import Feed from './Feed';

const index: RouteProps[] = [
    {
        path: '/',
        exact: true,
        component: Feed,
        children: [],
    }
];

const Routes = () => (
    <Switch>
        {index.map(({ children, ...props }, key) => (
            <Route
                key={key}
                {...props}
            />
        ))}
    </Switch>
);


export default Routes;
