import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";

import { routes } from "routes";

const App: React.FC = () => {
  const renderRoutes = () =>
    routes.map((R) => <Route key={R.name} path={R.path} element={<R />} />);

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <NavbarBrand href="/">ESPG</NavbarBrand>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "4.5em" }}>
        <Routes>{renderRoutes()}</Routes>
      </Container>
    </div>
  );
};

export default App;
