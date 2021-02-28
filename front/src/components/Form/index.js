import React from 'react';
import { Avatar, Button, Card, Input, Upload, Select } from 'antd';
import * as Icons from '@ant-design/icons';
import lodash from 'lodash';
import axios from 'axios';
import './styles.less';


const Form = (props) => {
  const [state, setState] = React.useState({ show: false, tags: [], text: '', title: '' });
  const tagChange = React.useCallback(lodash.throttle(() => {
    axios.get('http://h.igrogood.ru:8080/?text=' + encodeURI(state.text)).then(({ data = [] }) => setState({ tags: data }))
  }, 500), [state.text]);

  return (
    <Card>
      <div className={'form__card'}>
        <div className={'form__header'}>
          <Avatar>RG</Avatar>
          <Select
            style={{ width: '100%' }}
            onSearch={tagChange}
            onChange={console.error}
            onSelect={value => setState({ tag: value })}
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
            onChange={({ value }) => setState({ title: value })}
            placeholder="Заголовок..."
          />
          <Input.TextArea
            bordered={false}
            autoSize={{ minRows: 2 }}
            value={state.text}
            onChange={({ value }) => setState({ text: value })}
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
              <Icons.AuditOutlined/>
            </Upload>
            <Icons.SettingOutlined/>
          </div>
          <Button
            type={'primary'}
            size={'large'}
          >
            Публиковать
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Form;