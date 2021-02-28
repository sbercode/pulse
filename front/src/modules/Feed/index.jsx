import React, {useEffect, useState} from 'react';
import {Space, Select, Tabs} from 'antd';
import {PlayCircleOutlined, FileTextOutlined} from '@ant-design/icons';
import Post from "../../components/Post";
import Form from "../../components/Form";
import Menu from './Menu';
import './styles.less';
import axios from "axios";

const {Option} = Select;
const {TabPane} = Tabs;

const tabs = [
  {
    icon: PlayCircleOutlined,
    title: "Видео",
    type: 'VIDEO',
  },
  {
    title: "Подкасты",
    type: 'AUDIO',
  },
  {
    icon: FileTextOutlined,
    title: "Текст",
    type: 'AUDIO',
  }
];

const Feed = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://188.187.62.96:8000/posts')
        .then(res => {
          console.log(res.data)
          setPosts(res.data)
        })
        .catch(function (error) {
          console.log(error);
        })
  }, []);

  return (
    <div className="feed__container">
      <Tabs>
        {tabs.map(({icon: Icon, title}, key) => (
          <TabPane
            key={key}
            tab={(
              <div style={{display: 'flex', alignItems: 'center'}}>
                {Icon && <Icon style={{fontSize: '20px'}}/>}
                {title}
              </div>
            )}
          />))}
      </Tabs>
      <Form />
      <Space
        style={{alignContent: 'stretch', width: '100%'}}
        direction={'vertical'}
        size={60}
      >
        {posts.map((el, key) => (
          <Post
            key={key}
            {...el}
          />
        ))}
      </Space>
    </div>
  )
}

Feed.Menu = Menu;

export default Feed;
