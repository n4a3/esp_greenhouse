import React, { Fragment } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

import { WifiNetwork } from "espg-board/src/types/api";
import { AuthMode } from "espg-board/src/types/index";

import { ReactComponent as Wifi1 } from "components/icons/wifi1.svg";
import { ReactComponent as Wifi2 } from "components/icons/wifi2.svg";
import { ReactComponent as Wifi3 } from "components/icons/wifi3.svg";

import { ReactComponent as Secured } from "components/icons/lock.svg";
import { ReactComponent as Opened } from "components/icons/unlock.svg";

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

    const icons = {
      success: Wifi3,
      warning: Wifi2,
      danger: Wifi1,
    };

    const variant =
      percent >= 70 ? "success" : percent >= 40 ? "warning" : "danger";

    const Icon = icons[variant];

    return <Icon className={`text-${variant}`} />;
  };

  const renderMode = () => {
    const open = authMode === AuthMode.OPEN;

    return open ? <Opened /> : <Secured />;
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
