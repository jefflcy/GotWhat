import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import {
  HomePage,
  LoginPage,
  SignupPage,
  RestaurantPage,
  UserAccountPage,
  ChangePasswordPage,
  RequestPage,
} from "./pages";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/useraccount" element={<UserAccountPage />} />
            <Route path="/changepassword" element={<ChangePasswordPage />} />
            <Route path="/request" element={<RequestPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
