import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import {Provider} from 'mobx-react';
import locale from 'antd/lib/locale/ru_RU';
import Routes, { MenuRoutes } from './modules';
import Layout from './components/Layout';

const stores = {};

const App = () => (
    <Provider {...stores}>
        <BrowserRouter>
            <ConfigProvider
                locale={locale}
            >
                <Layout sideContent={<MenuRoutes/>} >
                    <Routes/>
                </Layout>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
);

export default App;