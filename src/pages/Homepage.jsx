import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Homepage() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1281")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setPokemon(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

  function getImg(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  return (
    <>
      {pokemon.length > 0 && (
        <div className="container">
          <div className="row">
            {pokemon.map((p, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card
                  style={{
                    width: "20rem",
                    cursor: "pointer",
                  }}
                  className="card mt-4 mx-auto"
                >
                  <Card.Img
                    variant="top"
                    src={getImg(getIdFromUrl(p.url))}
                    alt={p.name}
                  />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
