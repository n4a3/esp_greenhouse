import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Collapse, Alert, Row, Col, CloseButton } from "react-bootstrap";

interface OwnProps {
  onClose: () => void;
}

type GlobalAlertProps = OwnProps & IGlobalAlert;

const GlobalAlert: React.FC<GlobalAlertProps> = ({
  id,
  message,
  variant,
  autoClose,
  onClose,
}) => {
  const [show, setShow] = useState(true);

  const hide = () => setShow(false);

  useEffect(() => {
    let timer: number;

    if (autoClose) {
      timer = window.setTimeout(hide, autoClose === true ? 4000 : autoClose);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [autoClose]);

  const time = new Date(id).toLocaleTimeString();

  return (
    <Collapse in={show} appear onExited={onClose}>
      <Alert variant={variant}>
        <Row>
          <Col className="flex-grow-1 flex-shrink-0 text-secondary">{time}</Col>
          <Col className="flex-grow-0 flex-shrink-1">
            <CloseButton onClick={hide} />
          </Col>
        </Row>
        <Row>
          <Col>{message}</Col>
        </Row>
      </Alert>
    </Collapse>
  );
};

export default GlobalAlert;
