import { h } from "preact";
import { useState } from "preact/hooks";
import { Alert, Button, Col, Collapse, Container, Row } from "react-bootstrap";
import { findESP } from "../../../utils/findESP";
import LoadingButton from "../../atoms/LoadingButton";
import ConnectToESP from "../ConnectToESP";

interface OwnProps {
  onDone: () => void;
  goBack: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ onDone, goBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [ip, setIP] = useState("");

  const onConnect = async (manualIP?: string) => {
    setLoading(true);

    const ip = manualIP || (await findESP());

    setLoading(false);

    if (ip) {
      setError(false);
      setIP(ip);

      localStorage.setItem("ip", ip);
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
          <p>Are you sure that you connected to ESP WiFi?</p>
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
          <Alert variant="danger">Can't connect to ESP :(</Alert>
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
