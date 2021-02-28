import React from 'react';
import { Input, Tabs, Skeleton, Space } from 'antd';

const { TabPane } = Tabs;

const Menu = () => {
  const content = <>
    {Array(5).fill(null).map(() => (
      <>
        <Skeleton
          title={false}
          paragraph={{ rows: 2, width: '50%' }}
          avatar={{shape: 'circle'}}
          round
        />
      </>
    ))}
  </>;

  return (
    <>
      <Input.Search
        className="feed-menu__search"
        placeholder="Поиск..."
        size="large"
      />
      <div
        className="feed-menu__content"
      >
        <Tabs
          tabBarGutter={50}
          animated
        >
          <TabPane
            key={1}
            tab="Часто используемые"
          >
            {content}
          </TabPane>
          <TabPane
            key={2}
            tab="Все"
          >
            {content}
          </TabPane>
        </Tabs>
      </div>
    </>
  )
};

export default Menu;