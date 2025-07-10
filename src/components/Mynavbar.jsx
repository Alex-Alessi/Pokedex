import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function Mynavbar() {
  return (
    <Navbar expand="lg" className="bg-body-secondary mx-2">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/pikachu.gif"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Pokedex
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            Preferiti
          </Nav.Link>
          {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        <img src="/pokemon.png" width="100" height="40" />
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Conferma</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
