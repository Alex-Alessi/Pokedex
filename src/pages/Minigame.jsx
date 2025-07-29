import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchAllPokemon } from "../utils/fetchAllPokemon";
import bloccato from "/bloccato.jpg";
import coin from "/coin.png";
import coinFlip from "/coinFlip.gif";

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
  const [balance, setBalance] = useState(100);

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
              style={{ position: "relative", height: "40px", width: "100%" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#155998",
                  color: "white",
                  fontSize: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {streak}
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  display: "flex",
                  alignItems: "center",
                  marginRight: "30px",
                }}
              >
                <img src={coinFlip} width="40" height="40" />
                <div
                  style={{
                    marginLeft: "-5px",
                    zIndex: "2",
                    marginBottom: "7px",
                  }}
                >
                  {balance}
                </div>
              </div>
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
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p>Indizio 1</p>
                  <button
                    style={{
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio1")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-5px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio1"])
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                      alignItems: "center",
                      height: "35px",
                      marginLeft: "-10px",
                    }}
                  >
                    <img src={coin} width="50" height="50" />
                    <p style={{ marginBottom: "initial", marginLeft: "-13px" }}>
                      200
                    </p>
                  </div>
                </div>
                <div>
                  <p>Indizio 2</p>
                  <button
                    style={{
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio2")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-5px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio2"])
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                      alignItems: "center",
                      height: "35px",
                      marginLeft: "-10px",
                    }}
                  >
                    <img src={coin} width="50" height="50" />
                    <p style={{ marginBottom: "initial", marginLeft: "-13px" }}>
                      200
                    </p>
                  </div>
                </div>
                <div>
                  <p>Indizio 3</p>
                  <button
                    style={{
                      borderRadius: "12px",
                      backgroundImage: sbloccati.includes("indizio3")
                        ? ""
                        : `url(${bloccato})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center 70%",
                      height: "29px",
                      width: "75px",
                      marginTop: "-5px",
                      marginBottom: "20px",
                    }}
                    onClick={() =>
                      setSbloccati((prev) => [...prev, "indizio3"])
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                      alignItems: "center",
                      height: "35px",
                      marginLeft: "-10px",
                    }}
                  >
                    <img src={coin} width="50" height="50" />
                    <p style={{ marginBottom: "initial", marginLeft: "-13px" }}>
                      200
                    </p>
                  </div>
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
