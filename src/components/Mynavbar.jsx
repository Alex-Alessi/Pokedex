import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

export default function Mynavbar({
  search,
  setSearch,
  modalShow,
  selected,
  setSelected,
}) {
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

  function contieneNumeri(stringa) {
    return /\d/.test(stringa);
  }

  function titleDropdown(gen) {
    if (contieneNumeri(gen)) {
      const arr = gen.split("");
      console.log("Gen " + arr[arr.length - 1]);
      return "Gen " + arr[arr.length - 1];
    }
    return "Gen";
  }
  return (
    <Navbar
      expand="lg"
      className="bg-body-secondary"
      style={{
        height: "100px",
        filter: modalShow ? "blur(5px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      <Navbar.Brand href="/" className="ms-2">
        <img
          alt=""
          src={`${import.meta.env.BASE_URL}pikachu.gif`}
          width="40"
          height="30"
          className="d-inline-block align-top"
          href="/"
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
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "none",
                marginTop: "3px",
              }}
            >
              {titleDropdown(selected)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelected("")}>
                Tutte le gen
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen1")}>
                Gen 1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen2")}>
                Gen 2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen3")}>
                Gen 3
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen4")}>
                Gen 4
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen5")}>
                Gen 5
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen6")}>
                Gen 6
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen7")}>
                Gen 7
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen8")}>
                Gen 8
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelected("gen9")}>
                Gen 9
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Nav.Link as={Link} to="/favorites">
            Preferiti
          </Nav.Link>

          <button
            onClick={toggleMuted}
            style={{ border: "transparent", backgroundColor: "transparent" }}
          >
            {isMuted ? (
              <FontAwesomeIcon icon={faVolumeXmark} />
            ) : (
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
          </button>
          <audio ref={audioRef} autoPlay muted loop>
            <source src="soulsilver.mp3" type="audio/mpeg" />
          </audio>
        </Nav>
        <Link to="/pokedex" className="mx-auto">
          <img
            src={`${import.meta.env.BASE_URL}pokemon.png`}
            width="150"
            height="60"
          />
        </Link>
        <Form className="d-flex align-items-center">
          <Nav.Link as={Link} to="/minigame" className="me-2 mt-1">
            <FontAwesomeIcon
              icon={faGamepad}
              style={{ color: "#000000", fontSize: "20px" }}
            />
          </Nav.Link>
          <div style={{ position: "relative", marginRight: "10px" }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
                zIndex: 1,
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
              style={{
                paddingLeft: "32px",
                borderRadius: "20px",
              }}
            />
          </div>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
