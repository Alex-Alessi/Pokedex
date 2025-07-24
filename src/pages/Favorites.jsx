import { useEffect, useState, useMemo } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { color } from "motion";

export default function Favorites({
  search,
  modalShow,
  setModalShow,
  selected,
}) {
  const [pokemon, setPokemon] = useState([]);
  const [favoriteList, setFavoriteList] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
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
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();

        const detailPromises = data.results.map(async (p) => {
          try {
            const detailRes = await fetch(p.url);
            const detailData = await detailRes.json();

            const speciesRes = await fetch(detailData.species.url);
            const speciesData = await speciesRes.json();

            return {
              ...detailData,
              eggGroup: speciesData.egg_groups,
              gen: getGen(speciesData.generation.url),
              isLegendary: speciesData.is_legendary,
              isMythical: speciesData.is_mythical,
            };
          } catch (err) {
            console.error(err);
            return null;
          }
        });

        const results = await Promise.all(detailPromises);

        const formattedData = results
          .filter((p) => p !== null) //filtro aggiunto per non far crashare il sito in caso di valore nullo
          .map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((t) => t.type.name),
            image: pokemon.sprites.front_default,
            height: pokemon.height,
            weight: pokemon.weight,
            base_experience: pokemon.base_experience,
            abilities: pokemon.abilities.map((a) => ({
              name: a.ability.name,
              is_hidden: a.is_hidden,
            })),
            stats: pokemon.stats.map((s) => ({
              name: s.stat.name,
              base_stat: s.base_stat,
            })),
            cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`,
            eggGroup: pokemon.eggGroup,
            gen: pokemon.gen,
            isLegendary: pokemon.isLegendary,
            isMythical: pokemon.isMythical,
          }));

        setPokemon(formattedData);
      } catch (err) {
        console.error("Errore durante il fetch:", err);
      }
    }

    fetchPokemonData();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteList)); //salva i preferiti e li trasforma in stringa
  }, [favoriteList]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getTypeColor(type) {
    const typeMinimized = type.toLowerCase();
    const findType = typesColor.find((f) => f.type === typeMinimized);
    return findType.color;
  }

  function getCries(index) {
    return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${index}.ogg`;
  }

  function getGen(string) {
    const arr = string.split("");
    const filteredArray = arr.filter((f) => f != "/");
    return filteredArray[filteredArray.length - 1];
  }

  function playCry(index) {
    const cryUrl = getCries(index);
    const audio = new Audio(cryUrl);
    audio.volume = 0.3;
    audio.play().catch((err) => {
      console.warn("Errore nel riprodurre il cry:", err);
    });
  }

  const selectedGen = selected.replace(/\D/g, "");

  const filteredPokemon = useMemo(() => {
    return pokemon
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((pkmnGen) => selected === "" || pkmnGen.gen === selectedGen);
  }, [pokemon, search, selected]);

  return (
    <>
      {favoriteList.length > 0 ? (
        <div
          className="container"
          style={{
            filter: modalShow ? "blur(5px)" : "none",
            transition: "filter 0.3s ease",
          }}
        >
          <div className="row">
            {filteredPokemon
              .filter((p) => favoriteList.includes(p.id))
              .map((p, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <Card
                    style={{
                      width: "20rem",
                      cursor: "pointer",
                      maxHeight: "450px",
                      position: "relative",
                    }}
                    className="cardCustom mt-4 mx-auto"
                    onClick={() => {
                      setPokemonDetail({
                        ...p,
                        name: capitalizeFirstLetter(p.name),
                        typeColors: p.types.map((t) => getTypeColor(t)),
                      });
                      playCry(p.id);
                      setModalShow(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        favoriteList.includes(p.id)
                          ? faStarSolid
                          : faStarRegular
                      }
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "1.2rem",
                        color: "black",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavoriteList((prev) =>
                          prev.includes(p.id)
                            ? prev.filter((f) => f !== p.id)
                            : [...prev, p.id]
                        );
                      }}
                    />
                    <b className="fs-6">#{p.id}</b>

                    <Card.Img variant="top" src={p.image} alt={p.name} />
                    <Card.Body>
                      <Card.Title>
                        {p.isLegendary ? (
                          <p className="rainbow-text">
                            {capitalizeFirstLetter(p.name)}
                          </p>
                        ) : (
                          capitalizeFirstLetter(p.name)
                        )}
                      </Card.Title>
                    </Card.Body>
                    <div
                      style={{
                        borderRadius: "15px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        display: "flex",
                        margin: "0 auto",
                        height: "27px",
                      }}
                    >
                      {p.types.map((type, i) => (
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h1 style={{ color: "white" }}>Non ci sono preferiti</h1>
      )}
    </>
  );
}
