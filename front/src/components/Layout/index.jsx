import React from 'react';
import { Avatar } from 'antd';
import Menu from '../Menu';
import './styles.less';

const LayoutComponent = (props) => {
    const {
      sideContent,
      children,
    } = props;

  return (
    <div
      className="layout"
    >
      <div className="layout__header">
        <div className="logo">
          ПУЛЬС
        </div>
        <div className="user">
          <Avatar
            size={27}
            gap={6}
            className="avatar"
          >
            RG
          </Avatar>
          Мария Владимировна
        </div>
      </div>
      <div
        className="layout__body"
      >
        <Menu>
          {sideContent}
        </Menu>
        <div
          className="layout__content"
        >
          {children}
        </div>
      </div>
    </div>
  )
};

LayoutComponent.displayName = 'Layout';

export default LayoutComponent;