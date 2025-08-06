import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { fetchAllPokemon } from "../utils/fetchAllPokemon";
import ScritturaIndizi from "../components/ScritturaIndizi";

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

  const bloccatoUrl = `${import.meta.env.BASE_URL}bloccato.jpg`;

  const listToUse = pokemonList.length > 0 ? pokemonList : localList;

  const pokemonWithDash = [
    "Nidoran-f",
    "Nidoran-m",
    "Mr-mime",
    "Ho-oh",
    "Porygon-z",
    "Tapu-koko",
    "Tapu-lele",
    "Tapu-bulu",
    "Tapu-fini",
    "Mr-rime",
  ];

  useEffect(() => {
    const audio = new Audio("/Pokedex/whos-that-pokemon_.mp3");
    audio.volume = 0.3;
    audio.play().catch((error) => {
      console.warn("Errore durante la riproduzione dell'audio:", error);
    });
  }, []);

  useEffect(() => {
    if (pokemonList.length === 0) {
      fetchAllPokemon(1300, 50, 300).then((essentialData) => {
        setLocalList(essentialData);
        console.log(fetchAllPokemon);
      });
    }
  }, [pokemonList]);

  function includesDash(string) {
    if (string.includes("-") && !pokemonWithDash.includes(string)) {
      return string.split("-")[0].toLowerCase();
    }
    return string.toLowerCase();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roundOver) return;
    const userInput = input.trim().toLowerCase();
    const correct = randomPokemon.name.toLowerCase();

    if (userInput === correct || userInput === includesDash(correct)) {
      setFeedback(
        `✅ Era proprio ${capitalizeFirstLetter(randomPokemon.name)}!`
      );
      setBalance((prev) => prev + 100);
      setShowPokemon(true);
      setIndovinato(true);
      setStreak((prev) => prev + 1);
      setRoundOver(true);
      setSbloccati([]);
    } else {
      setFeedback("❌ Riprova!");
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleClick(indizio) {
    if (
      indizio === "indizio1" &&
      !sbloccati.includes("indizio1") &&
      !roundOver
    ) {
      setSbloccati((prev) => [...prev, "indizio1"]);
      setBalance((prev) => prev - cost("indizio1"));
    } else if (
      indizio === "indizio2" &&
      sbloccati.includes("indizio1") &&
      !sbloccati.includes("indizio2")
    ) {
      setSbloccati((prev) => [...prev, "indizio2"]);
      setBalance((prev) => prev - cost("indizio2"));
    } else if (
      indizio === "indizio3" &&
      sbloccati.includes("indizio2") &&
      !sbloccati.includes("indizio3")
    ) {
      setSbloccati((prev) => [...prev, "indizio3"]);
      setBalance((prev) => prev - cost("indizio3"));
    }
    return "";
  }

  function cost(indizio) {
    if (indizio === "indizio1") {
      return 20;
    } else if (indizio === "indizio2") {
      return 30;
    } else if (indizio === "indizio3") {
      return 50;
    }
  }

  function types() {
    if (randomPokemon.types.length > 1) {
      return (
        capitalizeFirstLetter(randomPokemon.types[0]) +
        "-" +
        capitalizeFirstLetter(randomPokemon.types[1])
      );
    }
    return capitalizeFirstLetter(randomPokemon.types[0]);
  }

  function getFirstLetter(name) {
    return name.charAt(0);
  }

  function getLastLetter(name) {
    return name.charAt(name.length - 1);
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
                <img
                  src={`${import.meta.env.BASE_URL}coinFlip.gif`}
                  width="40"
                  height="40"
                />
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
            <div
              style={{ position: "relative", height: "320px", width: "100%" }}
            >
              <Card.Img
                variant="top"
                style={{
                  position: "absolute",
                  left: "36%",
                  width: "20rem",
                  margin: "0 auto",
                  filter: showPokemon ? "none" : "brightness(0)",
                }}
                src={randomPokemon.image}
              />
              {sbloccati.includes("indizio1") && (
                <ScritturaIndizi title="Indizio 1" text={types()} />
              )}
              {sbloccati.includes("indizio2") && (
                <ScritturaIndizi
                  title="Indizio 2"
                  text={`Il nome contiene ${randomPokemon.name.length} lettere`}
                />
              )}
              {sbloccati.includes("indizio3") && (
                <ScritturaIndizi
                  title="Indizio 3"
                  text={`Il nome inizia per ${capitalizeFirstLetter(
                    getFirstLetter(randomPokemon.name)
                  )} e finisce per ${capitalizeFirstLetter(
                    getLastLetter(randomPokemon.name)
                  )}`}
                />
              )}
            </div>
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
                {!sbloccati.includes("indizio1") ? (
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
                          : `url(${bloccatoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center 70%",
                        height: "29px",
                        width: "75px",
                        marginTop: "-5px",
                        marginBottom: "20px",
                      }}
                      onClick={() => {
                        handleClick("indizio1");
                      }}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "-20px",
                        alignItems: "center",
                        height: "35px",
                        marginLeft: "-20px",
                      }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}coin.png`}
                        width="50"
                        height="50"
                      />
                      <p
                        style={{
                          marginBottom: "initial",
                          marginLeft: "-13px",
                        }}
                      >
                        {cost("indizio1")}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!sbloccati.includes("indizio2") ? (
                  <div>
                    <p>Indizio 2</p>
                    <button
                      style={{
                        borderRadius: "12px",
                        backgroundImage: sbloccati.includes("indizio2")
                          ? ""
                          : `url(${bloccatoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center 70%",
                        height: "29px",
                        width: "75px",
                        marginTop: "-5px",
                        marginBottom: "20px",
                      }}
                      onClick={() => handleClick("indizio2")}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "-20px",
                        alignItems: "center",
                        height: "35px",
                      }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}coin.png`}
                        width="50"
                        height="50"
                      />
                      <p
                        style={{ marginBottom: "initial", marginLeft: "-13px" }}
                      >
                        {cost("indizio2")}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {!sbloccati.includes("indizio3") ? (
                  <div>
                    <p>Indizio 3</p>
                    <button
                      style={{
                        borderRadius: "12px",
                        backgroundImage: sbloccati.includes("indizio3")
                          ? ""
                          : `url(${bloccatoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center 70%",
                        height: "29px",
                        width: "75px",
                        marginTop: "-5px",
                        marginBottom: "20px",
                      }}
                      onClick={() => handleClick("indizio3")}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "-20px",
                        alignItems: "center",
                        height: "35px",
                      }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}coin.png`}
                        width="50"
                        height="50"
                      />
                      <p
                        style={{ marginBottom: "initial", marginLeft: "-13px" }}
                      >
                        {cost("indizio3")}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
                      includesDash(randomPokemon.name)
                    )}`
                  );
                  setShowPokemon(true);
                  setStreak(0);
                  setRoundOver(true);
                  setBalance(100);
                  setSbloccati([]);
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
