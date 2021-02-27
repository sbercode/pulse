import React from 'react';
import { Switch, Route } from "react-router-dom";
import Feed from './Feed';

const ModulesRoutes = () => {

    return (
        <Switch>
            <Route
                component={Feed}
                path="/"
                exact
            />
            <Route
                component={Feed}
                path="/settings"
                exact
            />
        </Switch>
    )
};

export const MenuRoutes = () => (
    <Switch>
        <Route
            component={Feed.Menu}
            path="/"
            exact
        />
    </Switch>
);

export default ModulesRoutes;
