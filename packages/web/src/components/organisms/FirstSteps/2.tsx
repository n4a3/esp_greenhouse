import React, { useState } from "react";
import { Alert, Button, Col, Collapse, Container, Row } from "react-bootstrap";

import LoadingButton from "components/atoms/LoadingButton";
import ConnectToESP from "components/organisms/ConnectToESP";

import { findESP, getIP } from "api/findESP";
import { useEffect } from "react";
import { useAlert } from "hooks/useAlert";

interface OwnProps {
  home?: boolean;
  onDone: () => void;
  goBack: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ home, onDone, goBack }) => {
  const { addAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [ip, setIP] = useState("");

  const wifiType = home ? "home" : "ESP";

  useEffect(() => {
    if (error) {
      addAlert({
        message: "Can't connect to ESP",
        variant: "danger",
        autoClose: true,
      });
    }
  }, [addAlert, error]);

  const onConnect = async (manualIP?: string) => {
    setLoading(true);

    const lsIP = localStorage.getItem("ip");
    const _ip = lsIP || manualIP || (await findESP());
    console.log(_ip);

    setLoading(false);

    const success = !!_ip && (await getIP(_ip)) === _ip;

    if (success) {
      localStorage.setItem("ip", _ip);

      setError(false);
      setIP(_ip);
    } else {
      setError(true);
    }
  };

  const renderError1 = () => {
    const show = !loading && error && !answer;

    const onYes = () => setAnswer(true);

    return (
      <Collapse in={show} mountOnEnter unmountOnExit>
        <div>
          <p>Are you sure that you connected to {wifiType} WiFi?</p>
          <Row>
            <Col>
              <Button onClick={onYes}>Yes</Button>
            </Col>
            <Col>
              <Button onClick={goBack}>No</Button>
            </Col>
          </Row>
          <br />
        </div>
      </Collapse>
    );
  };

  const renderError2 = () => {
    const show = !loading && error && answer;

    return (
      <Collapse in={show} mountOnEnter unmountOnExit>
        <div>
          <ConnectToESP onConnect={onConnect} />
          <br />
        </div>
      </Collapse>
    );
  };

  const renderError = () => {
    const show = !loading && error;

    return (
      <Collapse in={show} mountOnEnter unmountOnExit>
        <div>
          {renderError1()}
          {renderError2()}
        </div>
      </Collapse>
    );
  };

  const renderStatus = () => {
    const show = !!ip && !error && !loading;

    return (
      <Collapse in={show} mountOnEnter unmountOnExit>
        <Alert variant="success">Connected!</Alert>
      </Collapse>
    );
  };

  const renderButton = () => {
    const show = !error || answer;

    const onClick = ip ? onDone : () => onConnect();
    const text = <span>{ip ? "Next" : "Connect"}</span>;

    return (
      show && (
        <LoadingButton onClick={onClick} disabled={error} loading={loading}>
          {text}
        </LoadingButton>
      )
    );
  };

  return (
    <Container>
      <p>Nice! Now we need to connect app to ESP</p>
      <p>Press "Connect" button to connect to ESP</p>
      <br />
      {renderStatus()}
      {renderError()}
      {renderButton()}
    </Container>
  );
};

export default Step;
