import { useEffect, useState, useMemo } from "react";
import Card from "react-bootstrap/Card";

export default function Minigame({ pokemonList }) {
  const [localList, setLocalList] = useState([]);
  const [indovinato, setIndovinato] = useState(false);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPokemon, setShowPokemon] = useState(false);
  const [streak, setStreak] = useState(0);
  const [randomPokemon, setRandomPokemon] = useState(null);

  const listToUse = pokemonList.length > 0 ? pokemonList : localList;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = input.trim().toLowerCase();
    const correct = randomPokemon.name.toLowerCase();

    if (userInput === correct) {
      setFeedback(
        `✅ Era proprio ${capitalizeFirstLetter(randomPokemon.name)}!`
      );
      setShowPokemon(true);
      setInput("");
      setIndovinato(true);
      setStreak((prev) => prev + 1);
    } else {
      setFeedback("❌ Riprova!");
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (listToUse.length > 0 && !randomPokemon) {
      setRandomPokemon(listToUse[Math.floor(Math.random() * listToUse.length)]);
    }
  }, [listToUse, randomPokemon]);
  return (
    <>
      {!randomPokemon ? (
        <p style={{ color: "white" }}>Caricamento Pokemon...</p>
      ) : (
        <>
          <Card style={{ width: "90%", height: "50%", margin: "14px auto" }}>
            <h1 style={{ color: "#4db6ac" }}>Who's That Pokemon</h1>
            <div
              style={{
                width: "40px",
                height: "40px",
                margin: "0 auto",
                borderRadius: "50%",
                backgroundColor: "#4db6ac",
                color: "white",
                marginTop: "10px",
                fontSize: "25px",
              }}
            >
              {streak}
            </div>
            <Card.Img
              variant="top"
              style={{
                width: "22rem",
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
                  setInput("");
                  setRandomPokemon(
                    listToUse[Math.floor(Math.random() * listToUse.length)]
                  );
                }}
                className="me-2"
              >
                Gioca di nuovo
              </button>
              <button
                onClick={() => {
                  setFeedback(
                    `❌ Oh no, il Pokemon era ${capitalizeFirstLetter(
                      randomPokemon.name
                    )}`
                  );
                  setShowPokemon(true);
                  setStreak(0);
                }}
              >
                Arrenditi
              </button>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
