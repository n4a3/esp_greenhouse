import React, { useState } from "react";
import { Card, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { steps } from "../../organisms/FirstSteps";

interface OwnProps {}

type StartProps = OwnProps;

const Start: React.FC<StartProps> = () => {
  const [activeStep, setActiveStep] = useState(0);

  const toNextStep = () => {
    setActiveStep((pS) => pS + 1);
  };

  const toPrevStep = () => {
    setActiveStep((pS) => pS - 1);
  };

  const renderStepsList = () =>
    steps.map(({ name }, i) => (
      <Nav.Item key={i}>
        <Nav.Link eventKey={i} as="p">
          {name}
        </Nav.Link>
      </Nav.Item>
    ));

  const StepComponent = steps[activeStep].Step;

  return (
    <Container>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <NavbarBrand>Welcome to ESP Greenhouse app!</NavbarBrand>
        </Container>
      </Navbar>
      <p>
        Looks like this is the first run so you need to set up the ESP board.
      </p>
      <Card>
        <Card.Header>
          <Nav variant="pills" activeKey={activeStep}>
            {renderStepsList()}
          </Nav>
        </Card.Header>
        <Card.Body>
          <StepComponent
            onDone={toNextStep}
            goBack={toPrevStep}
            home={activeStep > 2}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Start;
