import React, { useContext, useEffect, useState } from 'react';
import { Typography, List, Row, Col, Tag, Card, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContex';
import { getUltimos } from '../helpers/getUltimos';

export const Cola = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  const { Title, Text } = Typography;

  useEffect(() => {
    socket.on('ticketAsignado', (asignados) => {
      setTickets(asignados);
    });
    return () => {
      socket.off('ticketAsignado');
    };
  }, [socket]);

  useEffect(() => {
    getUltimos().then((data) => setTickets(data));
  }, []);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>

      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano"> {item.agente} </Tag>,
                    <Tag color="magenta"> {item.escritorio} </Tag>,
                  ]}
                >
                  <Title>No. {item.number} </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta"> {item.number} </Tag>

                      <Text color="secondary"> Agente: </Text>
                      <Tag color="volcano"> {item.agente} </Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
