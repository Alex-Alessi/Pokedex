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
          backgroundImage: 'url("wallpaper.gif")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          filter: modalShow ? "blur(5px)" : "none",
          transition: "filter 0.3s ease",
          position: "relative",
          zIndex: 0,
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
          <Route
            path="/favorites"
            element={
              <Favorites
                search={search}
                modalShow={modalShow}
                setModalShow={setModalShow}
                selected={selected}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
