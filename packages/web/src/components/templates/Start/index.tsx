import React, { useState } from "react";
import {
  Card,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";

import { steps } from "components/organisms/FirstSteps";

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
    steps.map(({ name }, i) => {
      const render = i === activeStep || i === activeStep + 1;

      const classNames =
        i === activeStep
          ? "flex-grow-1 flex-shrink-0"
          : "flex-grow-0 flex-shrink-1";

      // if (!render) return null;

      return (
        <Nav.Item key={i} className={`text-nowrap text-truncate ${classNames}`}>
          <Collapse dimension="width" in={render}>
            <Nav.Link eventKey={i} as="div">
              {name}
            </Nav.Link>
          </Collapse>
        </Nav.Item>
      );
    });

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
          <Nav className="flex-nowrap" variant="pills" activeKey={activeStep}>
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
