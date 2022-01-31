import React, { useCallback, useEffect, useState } from "react";
import { Alert, Card, Form, Spinner, Stack } from "react-bootstrap";
import { findESP, getIP } from "../../../api/findESP";
import LoadingButton from "../../atoms/LoadingButton";

interface OwnProps {
  onConnect: (ip: string) => void;
}

type ConnectProps = OwnProps;

const ConnectToESP: React.FC<ConnectProps> = ({ onConnect }) => {
  const [ip, setIP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const connect = useCallback(
    async (autoIP?: string) => {
      const _ip = autoIP || ip;

      if (!_ip) return;

      setLoading(true);

      const success = (await getIP(_ip)) === _ip;

      if (success) {
        onConnect(_ip);
        setError(false);

        localStorage.setItem("ip", _ip);
      } else {
        setError(true);
      }

      setLoading(false);
    },
    [ip, onConnect]
  );

  const startAutoScan = useCallback(async (): Promise<void> => {
    setError(false);
    setLoading(true);

    const lsIP = localStorage.getItem("ip");
    const espIP = async () => await findESP();

    const _ip = lsIP || (await espIP());

    if (_ip) {
      connect(_ip);
    } else {
      setError(true);
    }
  }, [connect]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIP(e.currentTarget.value);
  };

  const onConfirm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    connect();
  };

  useEffect(() => {
    startAutoScan();
  }, []);

  const renderStatus = () => {
    console.log(loading, ip);
    if (loading && !ip) {
      return <Spinner animation="border" variant="primary" />;
    }

    if (!loading && !error && ip)
      return <Alert variant="success">Connected!</Alert>;
  };

  const renderForm = () =>
    error && (
      <>
        <Alert variant="warning">
          Can't find ESP on network, enter IP manually:
        </Alert>
        <Form onSubmit={onConfirm}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              value={ip}
              onChange={onChange}
              required
              placeholder="192.168.0.123"
              pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$"
            />
            <LoadingButton loading={loading} type="submit">
              Connect
            </LoadingButton>
          </Stack>
        </Form>
      </>
    );

  return (
    <Card>
      <Card.Header>Connect to ESP in local network</Card.Header>
      <Card.Body>
        <Card.Text>
          {renderStatus()}
          {renderForm()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConnectToESP;
