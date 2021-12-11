import React from 'react';
import { Typography, List, Row, Col, Tag, Card, Divider } from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';

const data = [
  {
    ticketNo: 33,
    escritorio: 3,
    agente: 'Vic Flores',
  },
  {
    ticketNo: 34,
    escritorio: 2,
    agente: 'Carlos Santana',
  },
  {
    ticketNo: 35,
    escritorio: 5,
    agente: 'Adolf Hitler',
  },
  {
    ticketNo: 36,
    escritorio: 3,
    agente: 'Vic Flores',
  },
  {
    ticketNo: 37,
    escritorio: 6,
    agente: 'Claudia Lars',
  },
  {
    ticketNo: 38,
    escritorio: 3,
    agente: 'Vic Flores',
  },
  {
    ticketNo: 39,
    escritorio: 2,
    agente: 'Carlos Santana',
  },
  {
    ticketNo: 40,
    escritorio: 8,
    agente: 'Adolf Pineda',
  },
  {
    ticketNo: 41,
    escritorio: 3,
    agente: 'Vic Flores',
  },
  {
    ticketNo: 42,
    escritorio: 6,
    agente: 'Claudia Lars',
  },
];

export const Cola = () => {
  useHideMenu(true);

  const { Title, Text } = Typography;

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>

      <Row>
        <Col span={12}>
          <List
            dataSource={data.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano"> {item.agente} </Tag>,
                    <Tag color="magenta"> {item.escritorio} </Tag>,
                  ]}
                >
                  <Title>No. {item.ticketNo} </Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={data.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.ticketNo}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta"> {item.ticketNo} </Tag>

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
