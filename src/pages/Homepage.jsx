import { useState, useEffect, useMemo } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function Homepage({ search }) {
  const [pokemon, setPokemon] = useState([]);
  const [typesMap, setTypesMap] = useState({});

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        setPokemon(data.results);
        const ids = data.results.map((p) => getIdFromUrl(p.url));

        const detailPromises = ids.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => ({ id, types: data.types.map((t) => t.type.name) }))
        );

        const results = await Promise.all(detailPromises);

        const newTypesMap = {};
        results.forEach(({ id, types }) => {
          newTypesMap[id] = types;
        });

        setTypesMap(newTypesMap);
      } catch (err) {
        console.error("Errore durante il fetch:", err);
      }
    }

    fetchPokemonData();
  }, []);

  function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  }

  function getImg(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  return (
    <>
      {pokemon.length > 0 && (
        <div className="container">
          <div className="row">
            {filteredPokemon.map((p, index) => {
              const id = getIdFromUrl(p.url);
              const types = typesMap[id];
              return (
                <div key={index} className="col-md-4 mb-4">
                  <Card
                    style={{
                      width: "20rem",
                      cursor: "pointer",
                      maxHeight: "450px",
                    }}
                    className="card mt-4 mx-auto"
                  >
                    <b className="fs-6">#{id}</b>
                    <Card.Img variant="top" src={getImg(id)} alt={p.name} />
                    <Card.Body>
                      <Card.Title>{capitalizeFirstLetter(p.name)}</Card.Title>
                    </Card.Body>
                    {types ? (
                      <div>
                        {types.map((type, i) => (
                          <Badge key={i} bg="primary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge bg="secondary">Loading...</Badge>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
