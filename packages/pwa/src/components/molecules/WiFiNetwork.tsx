import { WifiNetwork } from "esp_greenhouse/src/types/api";
import { AuthMode } from "esp_greenhouse/src/types/index";
import { h } from "preact";
import React from "react";
import { Col, Dropdown, ProgressBar, Row } from "react-bootstrap";

interface OwnProps {
  onClick?: () => void;
}

type WiFiNetworkProps = WifiNetwork & OwnProps;

const WiFiNetwork: React.FC<WiFiNetworkProps> = ({
  ssid,
  signal,
  authMode,
  onClick,
}) => {
  const renderSignal = () => {
    const percent = Math.round(((signal + 100) / 65) * 100);

    const variant =
      percent >= 70 ? "success" : percent >= 40 ? "warning" : "danger";

    return <ProgressBar now={percent} variant={variant} />;
  };

  const renderMode = () => {
    const open = authMode === AuthMode.OPEN;

    if (open) {
      return "O";
    }
    return "S";
  };

  return (
    <Dropdown.Item onClick={onClick}>
      <Row>
        <Col>{renderMode()}</Col>
        <Col>{ssid}</Col>
        <Col>{renderSignal()}</Col>
      </Row>
    </Dropdown.Item>
  );
};

export default WiFiNetwork;
