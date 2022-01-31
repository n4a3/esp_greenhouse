import { h } from "preact";
import { useState } from "preact/hooks";
import { Collapse, Container, Row, Stack } from "react-bootstrap";
import LoadingButton from "../../atoms/LoadingButton";
import ConnectToWiFi from "../ConnectToWiFi";

interface OwnProps {
  onDone: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ onDone }) => {
  const [ssid, setSsid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onConnect = () => {
    setLoading(true);
  };

  return (
    <Container>
      <Row>
        <Stack gap={2}>
          <p>Now you need to configure WiFi connection on ESP</p>
          <p>In dropdown select your home WiFi</p>
        </Stack>
      </Row>
      <br />
      <ConnectToWiFi onSelect={setSsid} />
      <Collapse in={!!ssid}>
        <LoadingButton loading={loading} onClick={onConnect}>
          Connect
        </LoadingButton>
      </Collapse>
    </Container>
  );
};

export default Step;
