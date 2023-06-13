import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// document.body.style.backgroundColor = "#365b6d";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
