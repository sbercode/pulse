import React from 'react';
import { Avatar, Button, Card, Input, Upload, Select } from 'antd';
import * as Icons from '@ant-design/icons';
import lodash from 'lodash';
import axios from 'axios';
import photo from '../../modules/Profile/img/photo.png';
import './styles.less';


const initialState = { show: false, tags: [], text: '', title: '' };

const Form = (props) => {
  const [state, setState] = React.useState(initialState);
  const tagChange = lodash.throttle(() => {
    console.log(state);
    axios.get('http://h.igrogood.ru:8080/?text=' + encodeURI(state.text)).then(({ data = [] }) => setState({ ...state, tags: data }))
  }, 500);

  return (
    <Card>
      <div className={'form__card'}>
        <div className={'form__header'}>
          <Avatar src={photo}>RG</Avatar>
          <Select
            style={{ width: '100%' }}
            onSearch={tagChange}
            onSelect={value => console.log(value)}
            onFocus={tagChange}
            showArrow={false}
            bordered={false}
            mode={'tags'}
            defaultActiveFirstOption={false}
            notFoundContent={false}
            placeholder="Введите тему публикации..."
          >
            {(state.tags || []).map((tag, key) =>
              <Select.Option value={tag} key={key}>{tag}</Select.Option>
            )}
          </Select>
        </div>
        <div>
          <Input
            className="form__title"
            bordered={false}
            value={state.title}
            onChange={({ target: { value } }) => setState({ ...state, title: value })}
            placeholder="Заголовок..."
          />
          <Input.TextArea
            bordered={false}
            autoSize={{ minRows: 2 }}
            value={state.text}
            onChange={({ target: { value } }) => setState({ ...state, text: value })}
            placeholder="Текст публикации..."
          />
        </div>

        <div
          className={'form__controll'}
        >
          <div
            className={'icons'}
            size={20}
          >
            <Icons.SmileOutlined/>
            <Upload>
              <Icons.FileTextOutlined/>
            </Upload>
            <Upload>
              <Icons.VideoCameraOutlined/>
            </Upload>
            <Upload>
              <Icons.AudioOutlined/>
            </Upload>
            <Icons.SettingOutlined/>
          </div>
          <Button
            type={'primary'}
            size={'large'}
            loading={state.isLoading}
            onClick={() => {
              setState({ ...state, isLoading: true });
              console.log(state);
              axios.post('http://188.187.62.96:8000/posts', {
                name: state.title,
                tags: state.tags,
                nodes: [
                  {
                    type: "TEXT",
                      content: {
                      value: state.text,
                    }
                  }
                ]
                }).then(({ data = [] }) => setState({ ...initialState, isLoading: false }))

            }}
          >
            Публиковать
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Form;