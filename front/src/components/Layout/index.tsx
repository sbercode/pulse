import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import HeaderComponent from "../Header";

interface LayoutInterface {
    children?: React.ReactNode,
    headerContent?: React.ReactNode,
}

const { Header, Content } = Layout;

const LayoutComponent = (props: LayoutInterface) => {
    const {
        children,
        headerContent,
    } = props;

  return <Layout>
      <Header>
          <HeaderComponent>
              {headerContent},
          </HeaderComponent>
      </Header>
      <Content>
          <Row wrap={false}>
              <Col flex="auto"/>
              <Col flex="480px">{children}</Col>
              <Col flex="auto"/>
          </Row>
      </Content>
  </Layout>
};

LayoutComponent.displayName = 'Layout';

export default LayoutComponent;