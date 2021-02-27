import React from 'react';
import * as Icons from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';
import './styles.less';

const links = [
  {
    path: '/',
    exact: true,
    icon: Icons.HomeOutlined,
    title: 'Рабочий стол',
  },
  {
    path: '/user',
    icon: Icons.UserOutlined,
    title: 'Профиль',
  },
  {
    path: '/faq',
    icon: Icons.QuestionCircleOutlined,
    title: 'Помощь',
  },
  {
    path: '/settings',
    icon: Icons.SettingOutlined,
    title: 'Настройки',
  },
];

const CustomLink = props => {
  const {
    path,
    icon: Icon,
    title,
    exact,
  } = props;

  return (
    <NavLink
      className="menu__link"
      activeClassName="active"
      exact={exact}
      to={path}
    >
      <Icon />
      {title}
    </NavLink>
  );
}

const Menu = (props) => {

  return (
    <div
      className="menu"
    >
      <div className="menu__left">
        {
          links.map((menuItem, key) => {
            return (
              <CustomLink
                key={key}
                {...menuItem}
              />);
          })
        }
      </div>
      <div
        className="menu__right"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Menu;