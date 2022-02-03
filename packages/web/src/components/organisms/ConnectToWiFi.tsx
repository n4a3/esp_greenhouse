import React, { useCallback, useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  Dropdown,
  Row,
  Col,
  Form,
  Container,
  Collapse,
  Spinner,
} from "react-bootstrap";

import { WifiNetwork } from "espg-board/src/types/api";
import { AuthMode } from "espg-board/src/types/index";

import WiFiNetwork from "components/molecules/WiFiNetwork";
import LoadingButton from "components/atoms/LoadingButton";

import { getWifis, setWifi } from "api";
import { useAlert } from "hooks/useAlert";

interface OwnProps {
  onConnected: () => void;
}

type ConnectToWiFiProps = OwnProps;

const ConnectToWiFi: React.FC<ConnectToWiFiProps> = ({ onConnected }) => {
  const { addAlert } = useAlert();

  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);
  const [password, setPassword] = useState("");

  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWifis = useCallback(async () => {
    const wifis = await getWifis();

    if (wifis) {
      setNetworks(wifis);
    } else {
      setError("Can't scan WiFis");
    }
  }, []);

  useEffect(() => {
    loadWifis();
  }, [loadWifis]);

  useEffect(() => {
    const show = !!error && !connected;

    if (!show) return;

    const message =
      selectedNetwork !== null
        ? `Can't connect to ${networks[selectedNetwork].ssid}. Error: ${error}`
        : error;

    addAlert({ message, variant: "danger", autoClose: true });
  }, [addAlert, error, connected, selectedNetwork, networks]);

  const onPassChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConnect = async () => {
    if (selectedNetwork === null) return;

    const ssid = networks[selectedNetwork].ssid;

    setConnecting(true);

    const res = await setWifi({ ssid, password });

    if (res?.status === "ok") {
      setConnected(true);
      onConnected();
    } else {
      setError(res?.status || "Network error");
    }
    setConnecting(false);
  };

  const renderCurrentWifi = () =>
    selectedNetwork !== null ? (
      <WiFiNetwork preview {...networks[selectedNetwork]} />
    ) : (
      "Select WiFi..."
    );

  const renderWiFiSelect = () =>
    networks.length ? (
      <Row>
        <Collapse in={!connected}>
          <Dropdown as={ButtonGroup}>
            <Button variant="outline-primary">{renderCurrentWifi()}</Button>
            <Dropdown.Toggle split variant="outline-primary" />

            <Dropdown.Menu>
              {networks.map((network, i) => {
                const onClick = () => {
                  setSelectedNetwork(i);
                };

                return <WiFiNetwork key={i} onClick={onClick} {...network} />;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Collapse>
      </Row>
    ) : (
      !error && <Spinner variant="primary" animation="border" />
    );

  const renderPasswordField = () => {
    const show =
      selectedNetwork !== null &&
      networks[selectedNetwork].authMode !== AuthMode.OPEN;

    return (
      <Row>
        <Collapse in={show}>
          <Container>
            <Form.Control
              placeholder="Password"
              onChange={onPassChange}
              value={password}
            />
          </Container>
        </Collapse>
      </Row>
    );
  };

  const renderButton = () => {
    const show = selectedNetwork !== null && !connected;

    return (
      <Row>
        <Collapse in={show}>
          <LoadingButton loading={connecting} onClick={onConnect}>
            Connect
          </LoadingButton>
        </Collapse>
      </Row>
    );
  };

  return (
    <Col>
      {renderWiFiSelect()}
      {renderPasswordField()}
      {renderButton()}
    </Col>
  );
};

export default ConnectToWiFi;
