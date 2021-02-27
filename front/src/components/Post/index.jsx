import React, {useState} from 'react';
import { Avatar, Card, Col, Image, Row, Typography } from 'antd';
import moment from 'moment';
import { CommentOutlined, HeartOutlined, MoreOutlined } from '@ant-design/icons';
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
  } = props;

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
    axios.get('http://localhost:8000/posts/' + id + '/like')
        .then(res => {
          console.log(res.data)
          //setPosts(res.data)
          props.likesCount += 1;
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  return (
    <Card
      cover={cover}
      title={<Typography.Text type={'secondary'}>{moment(Date.now()).format('D MMMM')}</Typography.Text>}
    >
      <Typography.Title level={2} >
        {name}
      </Typography.Title>
      {content}
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
            <Col onClick={doLike}>{likesCount} <HeartOutlined /></Col>
            <Col>7 <CommentOutlined /></Col>
            <Col><MoreOutlined rotate={90}/></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Post;