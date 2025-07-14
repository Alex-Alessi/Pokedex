import Modal from "react-bootstrap/Modal";

export default function Mymodal({ show, onHide, id, name, types, image }) {
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
        <h4>{types}</h4>
        <p>Qui puoi mettere contenuti dettagliati del Pokémon cliccato.</p>
      </Modal.Body>
    </Modal>
  );
}
