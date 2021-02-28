import React, { useEffect } from 'react';
import { Avatar, Card, Col, Image, Row, Typography, Skeleton } from 'antd';
import {
  CommentOutlined,
  HeartOutlined,
  MoreOutlined,
  HeartFilled,
  SoundOutlined,
  SoundFilled,
} from '@ant-design/icons';
import axios from "axios";
import './styles.less';

const Post = (props) => {
  const {
    match: {
      params: {
        id
      }
    }
  } = props;

  const [post, setPost] = React.useState({});
  const [state, setState] = React.useState({ like: false });
  React.useEffect(() => {
    axios.get(`http://188.187.62.96:8000/posts/${id}`)
      .then(res => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);


  const {
    name,
    nodes = [],
    likesCount,
    user,
    creationDate,
    modificationDate,
  } = post || {};

  const content = React.useMemo(() => nodes.map((node, key) => {
    switch (node.type) {
      case 'VIDEO': {
        return (
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <video controls style={{ width: '100%'}} src={node.content.source}/>
          </div>
        );
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
    <div
      className={'post__content'}
    >
      <Card
        className={'post__card'}
      >
        {
          !post
            ? <Skeleton animated/>
            : (
              <>
                <Typography.Title>
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
              </>
            )

        }

        {
          state.voice &&
          <audio autoPlay src={`http://188.187.62.96:8000/converter/voice/nick/${id}.ogg`} />
        }

      </Card>
    </div>

  );
};


export default Post;
