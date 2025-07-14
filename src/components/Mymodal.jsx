import Modal from "react-bootstrap/Modal";

export default function Mymodal({
  show,
  onHide,
  id,
  name,
  types,
  typeColors,
  image,
  height,
  weight,
  base_experience,
  abilities,
  stats,
}) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ maxHeight: "800px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>
            #{id} {name}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={image}
          alt={name}
          style={{ display: "flex", width: "150px", margin: "0 auto" }}
        />
        {types && typeColors ? (
          types.map((type, i) => (
            <span
              style={{
                backgroundColor: typeColors[i],

                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "uppercase",
                display: "inline-block",
                width: "70px",
                height: "25px",
              }}
            >
              <p key={i}>{type}</p>
            </span>
          ))
        ) : (
          <p>Caricamento Tipi...</p>
        )}
        <p>Qui puoi mettere contenuti dettagliati del Pokémon cliccato.</p>
      </Modal.Body>
    </Modal>
  );
}
