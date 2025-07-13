import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function Mynavbar({ search, setSearch }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  function toggleMuted() {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
      if (audio.paused) {
        audio.volume = 0.3;
        audio.play();
      }
    }
  }
  return (
    <Navbar
      expand="lg"
      className="bg-body-secondary"
      style={{ height: "100px" }}
    >
      <Navbar.Brand href="#home" className="ms-2">
        <img
          alt=""
          src="/pikachu.gif"
          width="40"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Pokedex
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className=" my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            Preferiti
          </Nav.Link>

          <button
            onClick={toggleMuted}
            style={{ border: "transparent", backgroundColor: "transparent" }}
          >
            {isMuted ? (
              <FontAwesomeIcon icon={faVolumeHigh} />
            ) : (
              <FontAwesomeIcon icon={faVolumeXmark} />
            )}
          </button>
          <audio ref={audioRef} autoPlay muted loop>
            <source src="soulsilver.mp3" type="audio/mpeg" />
          </audio>

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
        <div className="mx-auto">
          <img src="/pokemon.png" width="150" height="60" />
        </div>
        <Form className="d-flex align-items-center">
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            <Form.Control
              type="search"
              placeholder="Cerca..."
              aria-label="Search"
              className="me-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{ paddingLeft: "32px", borderRadius: "20px" }}
            />
            <div
              className="list-group position-absolute w-100"
              style={{ zIndex: 1000 }}
            >
              {/* <button
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setQuery(item);
                  setFilteredItems([]);
                }}
              >
                ciao
              </button> */}
            </div>
          </div>
          <Button variant="outline-success" className="mx-2">
            Conferma
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
