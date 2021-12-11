import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

export const Ingresar = () => {
  useHideMenu(false);
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());
  const { Title, Text } = Typography;

  const onFinish = (values) => {
    localStorage.setItem('agente', values.agente);
    localStorage.setItem('escritorio', values.escritorio);
    navigate('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (usuario.agente && usuario.escritorio) {
      navigate('/escritorio');
    }
  }, [usuario, navigate]);

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />

      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: 'Por favor, ingresa tu nombre',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: 'Por favor, ingresa el numero de escritorio',
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<SaveOutlined />}
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
