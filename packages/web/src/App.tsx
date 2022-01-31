import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

import Index from "./routes/index/index";
import Start from "./components/templates/Start";

const App: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <NavbarBrand href="/">ESPG</NavbarBrand>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "4.5em" }}>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/start" element={<Start />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
