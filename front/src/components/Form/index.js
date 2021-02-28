import React from 'react';
import { Avatar, Card, Input, Space, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import './styles.less';

const Form = (props) => {
  const [state, setState] = React.useState({ show: false });

  return (
    <Card>
      <div className={'form__card'}>
        <Avatar>RG</Avatar>
        {
          !state.show
            ? (
              <div
                type={'secondary'}
                class={'form__placeholder'}
                onClick={()=> setState({show: true})}
              >
                Создать новую публикацию...
              </div>
            )
            : (
              <div>
                <Input
                  bordered={false}
                  placeholder="Введите тему публикации..."
                />
              </div>
            )
        }

        <Space
          className={'icons'}
          size={20}
        >
          <Icons.FileTextOutlined/>
          <Icons.SettingOutlined/>
        </Space>
      </div>
    </Card>
  );
};

export default Form;