import SideMenu from "../components/SideMenu";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (input) => {
    setEmail(input.target.value);
  };

  const handlePasswordChange = (input) => {
    setPassword(input.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      const token = response.data.token;

      // Save the token in localStorage
      localStorage.setItem("token", token);
      console.log("token", token);

      // Redirect the user to account page
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-[#365b6d] h-screen">
      <SideMenu />

      <div className="flex flex-1 justify-center pt-40 lg:px-8">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white">
          Log in to your account
        </h2>
      </div>

      <div className="mt-5 mx-auto w-full sm:max-w-sm shadow-xl bg-white rounded-lg p-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
              Email address
            </label>
            <input
              type="email"
              placeholder="jefflee@hotmail.com"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              required
              className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-large font-bold leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="mt-2">
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <a href='#'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Log in
              </button>
            </a>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Join us today!
          </a>
        </p>
      </div>
    </div>
  );
}
