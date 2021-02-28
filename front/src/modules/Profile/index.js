import React from 'react';
import bronze from './img/bronze.png';
import photo from './img/photo.png';
import gold from './img/gold.png';
import silver from './img/silver.png';
import './css/style.css';
import { Avatar, Tabs, Skeleton } from 'antd';

const { TabPane } = Tabs;

const Profile = () => {
  return (
    <div className="container">
      <h1>Бонусы и скидки</h1>
      <h2>Иванова Мария Владимировна</h2>
      <div className="profile-top">
        <div className="profile-top_stats">
          <div className="profile-top_stats__photo">
            <Avatar size={92} src={photo} alt="photo"/>
          </div>
          <ul className="profile-top_stats__list">
            <li>20<small>Публикаций</small></li>
            <li>1205<small>Лайков</small></li>
            <li>35995<small>Просмотров</small></li>
          </ul>
        </div>
        <div className="profile-top_bonuns">
          2000<small>Бонусов спасибо</small>
        </div>
      </div>

      <Tabs>
        <TabPane
          key={1}
          tab="Получено"
        >
          <ul className="profile-attainments">
            <li>
              <img src={gold} alt="gold"/>
              <p>Эксперт</p>
            </li>

            <li>
              <img src={silver} alt="gold"/>
              <p>Отличник</p>
            </li>

            <li>
              <img src={bronze} alt="gold"/>
              <p>Крутой</p>
            </li>
          </ul>

          <h2>Достижение “Эксперт”</h2>
          <p>Достижение выдается за размещение публикаций. Бронза - 10 публикаций, серебро - 50
            публикаций, золото - 150 публикаций.</p>
        </TabPane>
        <TabPane
          key={2}
          tab="Доступно"
        >
          <Skeleton
            paragraph={{
              rows: 7,
            }}
          />
        </TabPane>
      </Tabs>

    </div>
  );
};

export default Profile;
