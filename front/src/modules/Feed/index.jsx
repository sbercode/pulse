import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { Card, Space, Image, Typography, Avatar, Col, Row, Select, Tabs } from 'antd';
import { PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import Post from "../../components/Post";
import './styles.less';

const { Option } = Select;
const { TabPane } = Tabs;

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
  const { posts = [{
    "id": "603a040a87d8bd600168665e",
    "name": "Hello World!HWorld!Hello World!Hello World!Hello World!Hello World!lorld!Hello World!Hello World!Hello World!Hello World!Hello World!",
    "nodes": [
      {
        "type": "TEXT",
        "content": {
          "value": "Some text here."
        }
      },
      {
        "type": "IMAGE",
        "content": {
          "source": "https://www.cats.org.uk/media/1400/choosing-a-cat.jpg"
        }
      },
      {
        "type": "VIDEO",
        "content": {
          "source": "https://www.youtube.com/watch?v=XBN60zDqWVg"
        }
      },
      {
        "type": "AUDIO",
        "content": {
          "value": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
      },
      {
        "type": "POLL",
        "content": {
          "question": "Do aliens exist?",
          "answers": [
            {
              "value": "Yes",
              "count": 2
            },
            {
              "value": "No",
              "count": 6
            },
            {
              "value": "I don't know",
              "count": 1
            }
          ]
        }
      }
    ]
  },{
    "id": "603a040a87d8bd600168665e",
    "name": "Hello World!",
    "nodes": [
      {
        "type": "TEXT",
        "content": {
          "value": "Some text here."
        }
      },
      {
        "type": "IMAGE",
        "content": {
          "source": "https://www.cats.org.uk/media/1400/choosing-a-cat.jpg"
        }
      },
      {
        "type": "VIDEO",
        "content": {
          "source": "https://www.youtube.com/watch?v=XBN60zDqWVg"
        }
      },
      {
        "type": "AUDIO",
        "content": {
          "value": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
      },
      {
        "type": "POLL",
        "content": {
          "question": "Do aliens exist?",
          "answers": [
            {
              "value": "Yes",
              "count": 2
            },
            {
              "value": "No",
              "count": 6
            },
            {
              "value": "I don't know",
              "count": 1
            }
          ]
        }
      }
    ]
  },{
    "id": "603a040a87d8bd600168665e",
    "name": "Hello World!",
    "nodes": [
      {
        "type": "TEXT",
        "content": {
          "value": "Some text here."
        }
      },
      {
        "type": "IMAGE",
        "content": {
          "source": "https://www.cats.org.uk/media/1400/choosing-a-cat.jpg"
        }
      },
      {
        "type": "VIDEO",
        "content": {
          "source": "https://www.youtube.com/watch?v=XBN60zDqWVg"
        }
      },
      {
        "type": "AUDIO",
        "content": {
          "value": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        }
      },
      {
        "type": "POLL",
        "content": {
          "question": "Do aliens exist?",
          "answers": [
            {
              "value": "Yes",
              "count": 2
            },
            {
              "value": "No",
              "count": 6
            },
            {
              "value": "I don't know",
              "count": 1
            }
          ]
        }
      }
    ]
  },] } = props;

  return (
    <div className="feed__container">
      <Tabs
        tabBarStyle={{ border: 'none' }}
      >
        {tabs.map(({ icon: Icon, title }, key) => (
          <TabPane
            key={key}
            tab={(
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {Icon && <Icon style={{ fontSize: '20px' }}/>}
                {title}
              </div>
            )}
          />))}
      </Tabs>
      <Space
        style={{ alignContent: 'stretch', width: '100%' }}
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

Feed.Menu = (props) => <div>as</div>;

export default Feed;