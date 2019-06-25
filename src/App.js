import React from "react";
import "./App.css";
import Landing from "./Component/Landing";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-container"
        variant="dark"
      >
        <Navbar.Brand href="#home">{"GET LOAN AND CHECK DETAILS"}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
        </Navbar.Collapse>
      </Navbar>
      <Landing />
    </div>
  );
}

export default App;
