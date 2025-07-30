import { useEffect, useState } from "react";

export default function ScritturaIndizi({ title, text }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const speed = 50;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="pokedex-box mt-4">
      <div className="pokedex-header">
        <span className="led" />
        <span className="led" />
        <span className="led" />
      </div>
      <div className="pokedex-content">
        <p>
          <strong>{title}:</strong> {displayedText}
          <span className="cursor">▮</span>
        </p>
      </div>
    </div>
  );
}
