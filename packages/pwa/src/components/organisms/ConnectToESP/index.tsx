import { Fragment, h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { Alert, Card, Form, Stack } from "react-bootstrap";
import { findESP, getIP } from "../../../utils/findESP";
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

      setError(false);
      setLoading(true);

      const success = (await getIP(_ip)) === _ip;

      if (success) {
        onConnect(_ip);

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

    const espIP = await findESP();

    if (espIP) {
      connect(espIP);
    } else {
      setError(true);
    }

    setLoading(false);
  }, [connect, setError]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIP(e.currentTarget.value);
  };

  const onConfirm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setError(false);
    connect();
  };

  useEffect(() => {
    startAutoScan();
  }, []);

  const renderStatus = () => {
    if (!loading && !error && ip)
      return <Alert variant="success">Connected!</Alert>;
  };

  const renderForm = () =>
    error && (
      <Fragment>
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
      </Fragment>
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
