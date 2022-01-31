import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

interface OwnProps {}

type StepProps = OwnProps;

const Step: React.FC<StepProps> = () => {
  const navigate = useNavigate();

  const onDone = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <p>Nice! Now you can start working with ESP!</p>
      </Row>
      <br />
      <Button onClick={onDone}>Wrrrrrr, go! 🚀</Button>
    </Container>
  );
};

export default Step;
