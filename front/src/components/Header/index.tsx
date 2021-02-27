import React from 'react';
import {Col, Row} from "antd";

interface HeaderInterface {
    children?: React.ReactNode,
}

const HeaderComponent = (props: HeaderInterface) => {

    return (
        <Row wrap={false}>
            <Col flex="auto"/>
            <Col flex="480px">{props.children}</Col>
            <Col flex="auto"/>
        </Row>
    );
};

HeaderComponent.displayName = 'Header';

export default HeaderComponent;