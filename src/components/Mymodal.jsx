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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
          style={{ display: "flex", width: "20rem", margin: "0 auto" }}
        />
        {types && typeColors ? (
          types.map((type, i) => (
            <span
              key={i}
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
              <p>{type}</p>
            </span>
          ))
        ) : (
          <p>Caricamento Tipi...</p>
        )}
        <ul>
          <li>Altezza: {height}</li>
          <li>Peso: {weight}</li>
          <li>Exp di base: {base_experience}</li>
          <li>
            Abilità:{" "}
            <ul>
              {abilities?.map((a, i) => (
                <li key={i}>
                  {capitalizeFirstLetter(a.name)}{" "}
                  {a.ishidden ? "(nascosta)" : ""}
                </li>
              ))}
            </ul>
          </li>
          <li>
            Statistiche:{" "}
            <ul>
              {stats?.map((s, i) => (
                <li key={i}>
                  {capitalizeFirstLetter(s.name)}: {s.base_stat}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}
