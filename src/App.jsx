import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Pokedex from "./pages/Pokedex";
import Favorites from "./pages/Favorites";
import Mynavbar from "./components/Mynavbar";
import Homepage from "./pages/Homepage";
function App() {
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <BrowserRouter>
      <div
        style={{
          filter: modalShow ? "blur(5px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <Mynavbar
          search={search}
          setSearch={setSearch}
          modalShow={modalShow}
          selected={selected}
          setSelected={setSelected}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/pokedex"
            element={
              <Pokedex
                search={search}
                modalShow={modalShow}
                setModalShow={setModalShow}
                selected={selected}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
