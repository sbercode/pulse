import React from 'react';
import { Switch, Route } from "react-router-dom";
import {Skeleton, Empty, Space} from "antd";
import Feed from './Feed';
import Post from './Post';
import Profile from './Profile';

const ModulesRoutes = () => {

    return (
        <Switch>
            <Route
                component={Feed}
                path="/"
                exact
            />
            <Route
                component={Post}
                path="/post/:id"
            />
            <Route
                component={Profile}
                path="/user"
            />
            <Route render={() => (
                <Space
                    style={{width: '100%', paddingTop: 30}}
                    direction={"vertical"}
                    size={30}
                >
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 10
                        }}
                    />
                    <Empty/>
                    <Skeleton
                        title={false}
                        paragraph={{
                            rows: 10
                        }}
                    />
                </Space>
            )}/>
        </Switch>
    )
};

export const MenuRoutes = () => (
    <Switch>
        <Route
            component={Feed.Menu}
        />
    </Switch>
);

export default ModulesRoutes;
