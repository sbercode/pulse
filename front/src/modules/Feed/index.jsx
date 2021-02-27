import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { Card, Space, Image, Typography, Avatar, Col, Row, Select } from 'antd';
import { MoreOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import LayoutComponent from "../../components/Layout";

const { Option } = Select;

const Feed = (props) => {
  const { posts = [{
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
        <LayoutComponent
          headerContent={<Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[1, 2]}
          >
            <Option value={1}>Tag 1</Option>
            <Option value={2}>Tag 2</Option>
            <Option value={3}>Tag 3</Option>
          </Select>}
        >
          <Space
            direction={'vertical'}
            style={{ width: '100%' }}
          >
            {posts.map((el, key) => {
              const {
                name,
                nodes,
              } = el;

              const image = lodash.get(lodash.find(nodes, node => node.type === 'IMAGE'), ['content', 'source']);

              return (
                <Card
                  key={key}
                  cover={!!image && <Image preview={false} src={image}/>}
                  title={<Typography.Text type={'secondary'}>{moment(Date.now()).format('D MMMM')}</Typography.Text>}
                >
                  <Typography.Title level={2} >
                    {name}
                  </Typography.Title>
                  <Row
                    gutter={7}
                    align={'middle'}
                  >
                    <Col>
                      <Avatar>SS</Avatar>
                    </Col>
                    <Col>
                      <Row>
                          Semen Salychev
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
                        <Col>130 <HeartOutlined /></Col>
                        <Col>7 <CommentOutlined /></Col>
                        <Col><MoreOutlined rotate={90}/></Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Space>

        </LayoutComponent>
    )
}

export default Feed;