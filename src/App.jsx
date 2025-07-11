import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Favorites from "./pages/Favorites";
import Mynavbar from "./components/Mynavbar";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Mynavbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Homepage search={search} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
