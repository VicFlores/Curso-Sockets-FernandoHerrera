import React from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';

export const CrearTicket = () => {
  useHideMenu(true);

  const { Title, Text } = Typography;

  const nuevoTicket = () => {
    console.log('Nuevo ticket');
  };

  return (
    <>
      <Row style={{ marginTop: 40 }}>
        <Col span={12} offset={6} align="center">
          <Title level={3}>
            Presione el boton para generar un nuevo ticket
          </Title>

          <Button
            type="Success"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            style={{ marginTop: 12 }}
            onClick={nuevoTicket}
          >
            Nuevo Ticket
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 100 }}>
        <Col span={12} offset={6} align="center">
          <Text style={{ fontSize: 30 }}>Su numero</Text>
          <br />

          <Text type="success" style={{ fontSize: 55 }}>
            69
          </Text>
        </Col>
      </Row>
    </>
  );
};
