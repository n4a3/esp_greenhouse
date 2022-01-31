import { WifiNetwork } from "espg-board/src/types/api";
import { AuthMode } from "espg-board/src/types/index";
import React, { Fragment } from "react";
import { Col, Dropdown, ProgressBar, Row } from "react-bootstrap";

interface OwnProps {
  onClick?: () => void;
  preview?: boolean;
}

type WiFiNetworkProps = WifiNetwork & OwnProps;

const WiFiNetwork: React.FC<WiFiNetworkProps> = ({
  ssid,
  signal,
  authMode,
  onClick,
  preview,
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

  const Component = preview ? Fragment : Dropdown.Item;

  return (
    <Component {...(preview ? {} : { onClick })}>
      <Row className="flex-nowrap">
        <Col xs={2}>{renderMode()}</Col>
        <Col xs="auto">{ssid}</Col>
        <Col xs={4}>{renderSignal()}</Col>
      </Row>
    </Component>
  );
};

export default WiFiNetwork;
