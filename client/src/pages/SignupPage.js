import SideMenu from "../components/SideMenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  /* Toggle between Personal and Business Owner */
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (input) => {
    input.preventDefault();

    if (password !== repeatpassword) return alert("Passwords do not match!");

    try {
      const newUser = {
        name,
        email,
        password,
        role: isChecked ? "Business Owner" : "User",
      };
      const { data } = await axios.post(`${backendUrl}/signup`, newUser);

      // Clear the form fields
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setIsChecked(false);

      if (data.success) {
        alert(data.message);

        // Redirect the user to login page
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#365b6d] h-screen">
      <SideMenu />

      <div className="justify-center pt-12 pb-8 lg:px-8 text-center font-bold text-white">
        <h2 className="text-3xl leading-9 tracking-tight">Sign Up</h2>
        <p className="text-md">
          Please fill in this form to create an account.
        </p>
      </div>
      
      <div className="flex justify-center">
        <label className="toggle-switch flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only"
          />
          <div className="toggle-slider w-10 h-6 bg-gray-400 rounded-full shadow-inner" />
          <div
            className={`toggle-knob absolute w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
              isChecked ? "translate-x-6" : ""
            }`}
          />
          <span className="ml-2 text-white text-md font-bold">
            {isChecked ? "Business Owner" : "Personal"}
          </span>
        </label>
      </div>

      <div className="mt-5 mx-auto w-full sm:max-w-sm shadow-xl bg-white rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="jefflee"
              autoComplete="name"
              required
              className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jefflee@hotmail.com"
              autoComplete="email"
              required
              className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <p>
              By creating an account you agree to our{" "}
              <Link to="/terms" style={{ color: "dodgerblue" }}>
                Terms &amp; Privacy
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-2">
            <a
              href="/home"
              className="text-center rounded-md bg-red-600 px-8 m-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <button type="button">Cancel</button>
            </a>
            <button
              type="submit"
              className="justify-center rounded-md bg-green-600 px-8 m-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
