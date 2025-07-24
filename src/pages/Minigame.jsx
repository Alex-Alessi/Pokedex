import { useEffect, useState, useMemo } from "react";
import Card from "react-bootstrap/Card";

export default function Minigame({ pokemonList }) {
  const [localList, setLocalList] = useState([]);
  const listToUse = pokemonList.length > 0 ? pokemonList : localList;
  const [indovinato, setIndovinato] = useState(false);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    if (pokemonList.length === 0) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=373")
        .then((res) => res.json())
        .then((data) => {
          const essentialData = data.results.map((p, i) => ({
            id: i + 1,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              i + 1
            }.png`,
          }));
          setLocalList(essentialData);
        });
    }
  }, [pokemonList]);

  const randomPokemon = useMemo(() => {
    return listToUse[Math.floor(Math.random() * listToUse.length)];
  }, [indovinato]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = input.trim().toLowerCase();
    const correct = randomPokemon.name.toLowerCase();

    if (userInput === correct) {
      setFeedback(`✅ Era proprio ${randomPokemon.name}!`);
      setShowPokemon(true);
      setInput("");
    } else {
      setFeedback("❌ Riprova!");
    }
  };

  return (
    <>
      {!randomPokemon ? (
        <p style={{ color: "white" }}>Caricamento Pokemon...</p>
      ) : (
        <>
          <h1 style={{ color: "white" }}>Who's That Pokemon</h1>
          <Card style={{ width: "90%", height: "50%", margin: "0 auto" }}>
            <Card.Img
              variant="top"
              style={{
                width: "25rem",
                margin: "0 auto",
                filter: showPokemon ? "none" : "brightness(0)",
              }}
              src={randomPokemon.image}
            />
            <Card.Body>
              <Card.Text>
                <form onSubmit={handleSubmit}>
                  <input
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />
                </form>
                <p>{feedback}</p>
              </Card.Text>
              <button
                onClick={() => {
                  setFeedback("");
                  setShowPokemon(false);
                  setIndovinato(true);
                }}
              >
                Gioca di nuovo
              </button>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
