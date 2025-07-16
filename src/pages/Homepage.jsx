import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isClicked && video.currentTime >= 0.7) {
        video.currentTime = 0;
      }
    };

    // event listener per controllare il tempo del video
    video.addEventListener("timeupdate", handleTimeUpdate);

    // smonta l'event listener
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isClicked]);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      const video = videoRef.current;
      const audio = audioRef.current;
      if (video && audio) {
        video.loop = false;
        video.currentTime = 0.8;
        video.play();
        audio.play();
      }
      setTimeout(() => {
        navigate("/pokedex");
        setIsClicked(false);
      }, 3000);
    }
  };

  return (
    <div
      className={isClicked ? "zoomed-in" : ""}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#000",
        transition:
          "transform 3.7s cubic-bezier(0.65, 0, 0.35, 1), opacity 1.5s ease-out 1.5s",
        zIndex: "2",
      }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="/VideoPokemonHomepage.mp4"
        autoPlay
        muted
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      />
      <audio ref={audioRef}>
        <source src="pokeballSound.mp3" type="audio/mpeg" />
      </audio>

      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "90%",
          color: "white",
          fontSize: "1.5rem",
          fontFamily: "sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          animation: "pulse 2s infinite",
        }}
      >
        {!isClicked && "Clicca per andare al Pokedex"}
      </h1>
    </div>
  );
}
