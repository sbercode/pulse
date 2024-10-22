import React, {useState} from 'react';
import { Avatar, Card, Col, Image, Row, Typography, Tag, Space } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  SoundOutlined,
  HeartOutlined,
  MoreOutlined,
  HeartFilled,
  SoundFilled
} from '@ant-design/icons';
import lodash from 'lodash';
import YouTube from 'react-youtube';
import axios from "axios";

const Post = (props) => {

  const {
    id,
    name,
    nodes,
    likesCount,
    user,
    creationDate,
    modificationDate,
    tags,
  } = props;

  const [state, setState] = React.useState({ like: false });

  let cover = '';
  let content = '';
  const firstContent = lodash.get(nodes, '0.content');
  const source = lodash.get(firstContent, 'source');

  switch (nodes[0]) {
    case 'VIDEO': {
      if (source.match('.youtube.')) {
        const id = lodash.get(source.match(/\?v=(?<id>.*)$/), 'groups.id');

        cover = <YouTube videoId={id}/>;
      } else {
        cover = <video src={source}/>;
      }

      break;
    }
    case 'AUDIO': {
      cover = <Image src={source}/>;

      break;
    }
  }

  if (!cover) {
    content = (
      <Typography.Paragraph
        eclipses={{
          rows: 5,
          expandable: true,
        }}
      >
        {firstContent.value}
      </Typography.Paragraph>
    );
  }

  function doLike() {
    axios.get('http://188.187.62.96:8000/posts/' + id + (state.like ? '/unlike': '/like'))
      .then(() => {
        setState(state => ({ like: !state.like }));
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function doSound() {
    setState(state => ({...state, voice: true }));
  }

  return (
    <Card
      cover={cover}
      title={<Typography.Text type={'secondary'}>{moment(Date.now()).format('D MMMM')}</Typography.Text>}
    >
      <Link
        style={{ color: 'inherit' }}
        to={`/post/${id}`}
      >
        <Typography.Title level={2} >
          {name}
        </Typography.Title>
      </Link>


      {content}
      <Space direction={'horizontal'}
        style={{paddingBottom: 10}}
      >
        {tags.map((tag, key) => (<Tag color={'success'} key={key} >{tag}</Tag>))}
      </Space>
      <Row
        gutter={7}
        align={'middle'}
      >
        <Col>
          <Avatar
          >
            SS
          </Avatar>
        </Col>
        <Col>
          <Row>
            {user != null ? user.firstName : 'Semen'} {user != null ? user.lastName : 'Salychev'}
          </Row>
          <Row>
            <Typography.Text type={'secondary'} >
              @shampinon
            </Typography.Text>
          </Row>
        </Col>
        <Col flex={'auto'}>
          <Row
            gutter={20}
            justify={'end'}
          >
            <Col
              style={{ cursor: 'pointer' }}
              onClick={doLike}
            >
              {likesCount + state.like}
              {' '}
              {
                state.like
                  ? <HeartFilled style={{ color: '#c00' }}/>
                  : <HeartOutlined/>
              }
            </Col>
            <Col
              style={{ cursor: 'pointer' }}
              onClick={doSound}
            >
              {
                state.voice
                  ? <SoundFilled style={{ color: '#3bbbd9' }}/>
                  : <SoundOutlined/>
              }
            </Col>
            <Col
              style={{ cursor: 'pointer' }}
            >
              <MoreOutlined rotate={90}/>
            </Col>
          </Row>
        </Col>
      </Row>
      {
        state.voice &&
        <audio autoPlay src={`http://188.187.62.96:8000/converter/voice/nick/${id}.ogg`} />
      }
    </Card>
  );
};

export default Post;