import { useState, useEffect, useMemo } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function Homepage({ search }) {
  const [pokemon, setPokemon] = useState([]);
  const [typesMap, setTypesMap] = useState({});
  const typesColor = [
    { type: "normal", color: "#959795" },
    { type: "fire", color: "#950708" },
    { type: "fighting", color: "#a95500" },
    { type: "water", color: "#0b54b1" },
    { type: "flying", color: "#4183c4" },
    { type: "grass", color: "#1e6b0d" },
    { type: "poison", color: "#50127d" },
    { type: "electric", color: "#a37e00" },
    { type: "ground", color: "#572906" },
    { type: "psychic", color: "#990e3b" },
    { type: "rock", color: "#7f7745" },
    { type: "ice", color: "#34cdf4" },
    { type: "bug", color: "#8d9c17" },
    { type: "dragon", color: "#8d9c17" },
    { type: "ghost", color: "#683968" },
    { type: "dark", color: "#1d1514" },
    { type: "steel", color: "#2c6c83" },
    { type: "fairy", color: "#c73cc7" },
  ];

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

  function getTypeColor(type) {
    const typeMinimized = type.toLowerCase();
    const findType = typesColor.find((f) => f.type === typeMinimized);
    console.log(findType.color);
    return findType.color;
  }

  function getCries(index) {
    return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${index}.ogg`;
  }

  function playCry(index) {
    const cryUrl = getCries(index);
    const audio = new Audio(cryUrl);
    audio.volume = 0.2;
    audio.play();
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
                    onClick={() => playCry(id)}
                  >
                    <b className="fs-6">#{id}</b>
                    <Card.Img variant="top" src={getImg(id)} alt={p.name} />
                    <Card.Body>
                      <Card.Title>{capitalizeFirstLetter(p.name)}</Card.Title>
                    </Card.Body>
                    {types ? (
                      <div>
                        {types.length === 1 ? (
                          <span
                            style={{
                              backgroundColor: getTypeColor(types[0]),
                              borderRadius: "0px",
                              padding: "0.4em 0.6em",
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                              color: "#fff",
                              textTransform: "uppercase",
                              display: "inline-block",
                            }}
                          >
                            {types[0]}
                          </span>
                        ) : (
                          types.map((type, i) => (
                            <span
                              key={i}
                              style={{
                                backgroundColor: getTypeColor(type),
                                borderRadius: "0px",
                                padding: "0.4em 0.6em",

                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                color: "#fff",
                                textTransform: "uppercase",
                                display: "inline-block",
                              }}
                            >
                              {type}
                            </span>
                          ))
                        )}
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
