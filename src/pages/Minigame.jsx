import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchAllPokemon } from "../utils/fetchAllPokemon";
import bloccato from "/bloccato.jpg";

export default function Minigame({ pokemonList }) {
  const [localList, setLocalList] = useState([]);
  const [indovinato, setIndovinato] = useState(false);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPokemon, setShowPokemon] = useState(false);
  const [streak, setStreak] = useState(0);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [roundOver, setRoundOver] = useState(false);
  const [sbloccati, setSbloccati] = useState([]);

  const listToUse = pokemonList.length > 0 ? pokemonList : localList;

  useEffect(() => {
    if (pokemonList.length === 0) {
      fetchAllPokemon(1300, 50, 300).then((essentialData) => {
        setLocalList(essentialData);
        console.log(fetchAllPokemon);
      });
    }
  }, [pokemonList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roundOver) return;
    const userInput = input.trim().toLowerCase();
    const correct = randomPokemon.name.toLowerCase();

    if (userInput === correct) {
      setFeedback(
        `✅ Era proprio ${capitalizeFirstLetter(randomPokemon.name)}!`
      );
      setShowPokemon(true);
      setIndovinato(true);
      setStreak((prev) => prev + 1);
      setRoundOver(true);
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
        <p style={{ color: "white", textAlign: "center" }}>
          Caricamento di tutti i Pokémon in corso...
        </p>
      ) : (
        <>
          <Card
            style={{
              width: "85%",
              height: "50%",
              margin: "14px auto",
            }}
          >
            <h1 style={{ color: "#155998" }}>Who's That Pokemon</h1>
            <div
              style={{
                width: "40px",
                height: "40px",
                margin: "0 auto",
                borderRadius: "50%",
                backgroundColor: "#155998",
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
                width: "20rem",
                margin: "0 auto",
                filter: showPokemon ? "none" : "brightness(0)",
              }}
              src={randomPokemon.image}
            />
            <Card.Body>
              <div
                style={{
                  marginBottom: "15px",
                  marginTop: "-10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div>
                  <p>Indizio 1</p>
                  <button
                    style={{
                      marginRight: "5px",
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio1")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-20px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio1"])
                    }
                  />
                </div>
                <div>
                  <p>Indizio 2</p>
                  <button
                    style={{
                      marginRight: "5px",
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio2")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-20px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio2"])
                    }
                  />
                </div>
                <div>
                  <p>Indizio 3</p>
                  <button
                    style={{
                      marginRight: "5px",
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio3")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-20px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio3"])
                    }
                  />
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#121212 ",
                      color: "white",
                    }}
                  />
                </form>
                <p style={{ marginTop: "12px" }}>{feedback}</p>
              </div>
              {roundOver && (
                <button
                  onClick={() => {
                    setFeedback("");
                    setShowPokemon(false);
                    setInput("");
                    setRandomPokemon(
                      listToUse[Math.floor(Math.random() * listToUse.length)]
                    );
                    setIndovinato(false);
                    setRoundOver(false);
                  }}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#121212 ",
                    color: "white",
                  }}
                  className="me-2"
                >
                  Gioca di nuovo
                </button>
              )}
              <button
                style={{
                  display: indovinato ? "none" : "inline",
                  borderRadius: "12px",
                  backgroundColor: "#121212 ",
                  color: "white",
                }}
                onClick={() => {
                  setFeedback(
                    `❌ Oh no, il Pokemon era ${capitalizeFirstLetter(
                      randomPokemon.name
                    )}`
                  );
                  setShowPokemon(true);
                  setStreak(0);
                  setRoundOver(true);
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
