import React from "react";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

interface OwnProps {
  onDone: () => void;
}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = ({ onDone }) => {
  return (
    <Container>
      <Row>
        <p>Connect your device to the next WIFI:</p>
      </Row>
      <br />
      <Row>
        <InputGroup>
          <InputGroup.Text>SSID</InputGroup.Text>
          <FormControl value="ESP_GH_NETWORK" />
        </InputGroup>
      </Row>
      <br />
      <Row>
        <InputGroup>
          <InputGroup.Text>Password</InputGroup.Text>
          <FormControl value="ESP_GH_12345678" />
        </InputGroup>
      </Row>
      <br />
      <Row>
        <p>Click "Next" button when you connect to ESP WiFi</p>
      </Row>
      <br />
      <Button onClick={onDone}>Next</Button>
    </Container>
  );
};

export default Step;
