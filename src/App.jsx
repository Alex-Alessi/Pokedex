import "./App.css";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Favorites from "./pages/Favorites";
import Mynavbar from "./components/Mynavbar";

function App() {
  return (
    <BrowserRouter>
      <Mynavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
