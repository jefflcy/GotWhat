import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "./pages";
import RestaurantPage from "./pages/RestaurantPage";

// document.body.style.backgroundColor = "#365b6d";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
