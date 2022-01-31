import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Index from "../routes/index";
import NotFoundPage from "../routes/notfound";
import ConnectToESP from "./organisms/ConnectToESP";
import Start from "./templates/Start";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <NavbarBrand href="/">ESPG</NavbarBrand>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "4.5em" }}>
        <Router>
          <Route path="/" component={Index} />
          <Route path="/connect" component={ConnectToESP} />
          <Route path="/start" component={Start} />
          <NotFoundPage default />
        </Router>
      </Container>
    </div>
  );
};

export default App;
