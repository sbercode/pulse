import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import {Provider} from 'mobx-react';
import Routes from './modules';

const stores = {};

const App = () => (
    <Provider {...stores}>
        <BrowserRouter>
            <ConfigProvider>
                <Routes/>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);

export default App;