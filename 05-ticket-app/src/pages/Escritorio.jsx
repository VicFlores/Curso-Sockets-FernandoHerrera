import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { useNavigate } from 'react-router';
import { SocketContext } from '../context/SocketContex';

export const Escritorio = () => {
  useHideMenu(false);

  const [usuario] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { Title, Text } = Typography;

  const salir = () => {
    localStorage.clear();
    navigate('/ingresar');
  };

  const nextTicket = () => {
    socket.emit('nextTicket', usuario, (ticket) => {
      setTicket(ticket);
    });
  };

  useEffect(() => {
    if (!usuario.agente || !usuario.escritorio) {
      navigate('/ingresar');
    }
  }, [usuario, navigate]);

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}> {usuario.agente} </Title>
          <Text>Usted esta trabajando en el escritorio: </Text>
          <Text style={{ fontSize: 30 }} type="success">
            {usuario.escritorio}
          </Text>
        </Col>

        <Col span={4} align="right">
          <Button
            shape="round"
            type="danger"
            onClick={salir}
            icon={<CloseCircleOutlined />}
          >
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket con numero: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            onClick={nextTicket}
            shape="round"
            type="primary"
            icon={<ArrowRightOutlined />}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
