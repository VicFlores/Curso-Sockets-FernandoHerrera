import React, { useContext, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContex';

export const CrearTicket = () => {
  useHideMenu(false);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const { Title, Text } = Typography;

  const nuevoTicket = () => {
    socket.emit('newTicket', null, (ticket) => {
      setTicket(ticket);
    });
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

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={12} offset={6} align="center">
            <Text style={{ fontSize: 30 }}>Su numero</Text>
            <br />

            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
