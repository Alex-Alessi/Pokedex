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
  gen,
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
      // style={{ maxHeight: "600px", marginTop: "20px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>
            #{id} {name}
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
        <img
          src={image}
          alt={name}
          style={{
            display: "flex",
            width: "20rem",
            margin: "0 auto",
          }}
        />
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
          {types && typeColors ? (
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
                }}
              >
                <p>{type}</p>
              </span>
            ))
          ) : (
            <p>Caricamento Tipi...</p>
          )}
        </div>
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
