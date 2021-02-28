import React, { useEffect } from 'react';
import { Avatar, Card, Col, Image, Row, Typography, Skeleton } from 'antd';
import { CommentOutlined, HeartOutlined, MoreOutlined, HeartFilled } from '@ant-design/icons';
import axios from "axios";

const Post = (props) => {


  const [post, setPost] = React.useState({});
  const [state, setState] = React.useState({ like: false });
  React.useEffect(() => {
    axios.get(`http://188.187.62.96:8000/post/${id}`)
      .then(res => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);


  const {
    id,
    name,
    nodes = [],
    likesCount,
    user,
    creationDate,
    modificationDate,
  } = post;

  const content = React.useMemo(() => nodes.map((node, key) => {
    switch (node.type) {
      case 'VIDEO': {
        return <video src={node.content.source}/>;
        break;
      }
      case 'AUDIO': {
        return <Image src={node.content.source}/>;

      }
      default: {
        return (
          <Typography.Paragraph
            key={key}
          >
            {node.content.value}
          </Typography.Paragraph>
        );
      }
    }
  }), [nodes])

  if (!post) {
    return (
      <Card>
        <Skeleton animated/>
      </Card>
    );
  }



  function doLike() {
    axios.get('http://localhost:8000/posts/' + id + state.like ? '/unlike': '/like')
      .then(res => {
        setState(state => ({ like: !state.like }));
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Card
    >
      <Typography.Title>
        {props.post.name}
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
            {user ? user.firstName : 'Semen'} {user != null ? user.lastName : 'Salychev'}
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
            <Col onClick={doLike}>
              {likesCount + state.like}
            {state.like
              ? <HeartOutlined style={{ background: '#c00' }}/>
              : <HeartOutlined/>}
            </Col>
            <Col>7 <CommentOutlined /></Col>
            <Col><MoreOutlined rotate={90}/></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};


export default Post;
