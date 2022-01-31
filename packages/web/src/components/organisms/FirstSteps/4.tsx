import React from "react";
import { Button, Container, Row } from "react-bootstrap";

interface OwnProps {
  onDone: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ onDone }) => {
  return (
    <Container>
      <Row>
        <p>
          Almost done! Now you need to reconnect your device to your home WiFi
        </p>
      </Row>
      <br />
      <Row>
        <p>Click "Next" button when you reconnect to your home WiFi</p>
      </Row>
      <br />
      <Button onClick={onDone}>Next</Button>
    </Container>
  );
};

export default Step;
