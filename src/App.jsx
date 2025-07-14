import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Favorites from "./pages/Favorites";
import Mynavbar from "./components/Mynavbar";

function App() {
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  return (
    <BrowserRouter>
      <div
        style={{
          filter: modalShow ? "blur(5px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <Mynavbar search={search} setSearch={setSearch} modalShow={modalShow} />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                search={search}
                modalShow={modalShow}
                setModalShow={setModalShow}
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
