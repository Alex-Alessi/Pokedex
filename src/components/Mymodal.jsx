import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";

export default function Mymodal({
  show,
  onHide,
  id,
  name,
  types,
  typeColors,
  image,
  image2,
  image3,
  image4,
  height,
  weight,
  base_experience,
  abilities,
  stats,
  gen,
}) {
  const [slideIndex, setSlideIndex] = useState(0);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSelect(selectedIndex) {
    setSlideIndex(selectedIndex);
  }
  useEffect(() => {
    setSlideIndex(0);
  }, [id]);

  const slides = [
    { img: image, thumb: image },
    { img: image2, thumb: image2 },
    { img: image3, thumb: image3 },
    { img: image4, thumb: image4 },
  ];

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>
            #{id} {name}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Carousel
          activeIndex={slideIndex}
          onSelect={handleSelect}
          fade
          indicators={false}
        >
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <img
                src={slide.img}
                className="d-block"
                style={{ width: "20rem", margin: "-40px auto" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div
          className="d-flex justify-content-center mt-3 mb-2 gap-3"
          style={{
            width: "100px",
            height: "80px",
            margin: "0 auto",
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.thumb}
              onClick={() => {
                setSlideIndex(index);
              }}
              className={`img-thumbnail ${
                slideIndex === index ? "border-primary" : ""
              }`}
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        {types && typeColors ? (
          types.length > 1 ? (
            <div
              style={{
                borderRadius: "15px",
                maxWidth: "130px",
                overflow: "hidden",
                display: "flex",
                marginBottom: "10px",
                height: "27px",
              }}
            >
              {types.map((type, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: typeColors[i],
                    textAlign: "center",
                    padding: "0.3em 0.5em",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "uppercase",
                    display: "inline-block",
                    width: "70px",
                    height: "25px",
                  }}
                >
                  {type}
                </span>
              ))}
            </div>
          ) : (
            types.map((type, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: typeColors[i],
                  textAlign: "center",
                  padding: "0.3em 0.5em",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "uppercase",
                  display: "inline-block",
                  width: "70px",
                  height: "25px",
                  borderRadius: "15px",
                }}
              >
                {type}
              </span>
            ))
          )
        ) : (
          <p>Caricamento Tipi...</p>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p style={{ marginBottom: "-3px" }}>
            <b>Altezza:</b> {(Number(height) / 10).toFixed(1).replace(".", ",")}{" "}
            m
          </p>
          <p style={{ marginBottom: "-3px" }}>
            <b>Peso:</b> {(Number(weight) / 10).toFixed(1).replace(".", ",")} kg
          </p>
          <p style={{ marginBottom: "-3px" }}>
            <b>Exp di base:</b> {base_experience} xp
          </p>
          <p style={{ marginBottom: "-3px" }}>
            <b>Generation: </b>
            {gen}
          </p>
          <p style={{ marginBottom: "-15px" }}>
            <b>Abilità:</b>{" "}
            <ul>
              {abilities?.map((a, i) => (
                <li key={i}>
                  {capitalizeFirstLetter(a.name)}{" "}
                  {a.ishidden ? "(nascosta)" : ""}
                </li>
              ))}
            </ul>
          </p>
          <p style={{ marginBottom: "-5px" }}>
            <b>Statistiche:</b>{" "}
            <ul>
              {stats?.map((s, i) => (
                <li key={i}>
                  <b>{capitalizeFirstLetter(s.name)}:</b> {s.base_stat}
                </li>
              ))}
            </ul>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
