import { h } from "preact";
import { useState } from "preact/hooks";
import { Card, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { steps } from "../../organisms/FirstSteps";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OwnProps {}

type StartProps = OwnProps;

// const __steps = [
//   "1. Connect device to ESP WiFi",
//   "2. Connect WiFi to existing WiFi",
//   "3. Reconnect device to home WiFi",
//   "4. Connect to ESP in app",
// ];

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
        It looks like this is the first run so you need to set up the ESP board.
      </p>
      <Card>
        <Card.Header>
          <Nav variant="pills" activeKey={activeStep}>
            {renderStepsList()}
          </Nav>
        </Card.Header>
        <Card.Body>
          <StepComponent onDone={toNextStep} goBack={toPrevStep} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Start;
