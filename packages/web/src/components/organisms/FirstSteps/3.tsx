import React, { useState } from "react";
import { Button, Collapse, Container, Row, Stack } from "react-bootstrap";

import ConnectToWiFi from "components/organisms/ConnectToWiFi";

interface OwnProps {
  onDone: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ onDone }) => {
  const [connected, setConnected] = useState(false);

  const onConnected = () => {
    setConnected(true);
  };

  const renderButton = () => (
    <Collapse in={connected}>
      <Button onClick={onDone}>Next</Button>
    </Collapse>
  );

  return (
    <Container>
      <Row>
        <Stack gap={2}>
          <p>Now you need to configure WiFi connection on ESP</p>
          <p>In dropdown select your home WiFi</p>
        </Stack>
      </Row>
      <br />
      <ConnectToWiFi onConnected={onConnected} />
      <br />
      {renderButton()}
    </Container>
  );
};

export default Step;
