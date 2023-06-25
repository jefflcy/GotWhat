const UserAccountPage = () => {
  return (
    <div className="bg-[#365b6d] h-screen">
      <div className="fixed right-0 top-0 w-[20%] h-full border-r text-black font-bold border-r-gray-900 bg-white">
        <ul className="pt-24 uppercase p-4">
          <li className="p-4 border-b border-black">
            <a href="/home">Home</a>
          </li>
          <li className="p-4 border-b border-black">
            <a href="/login">Login</a>
          </li>
          <li className="p-4 border-b border-black">
            <a href="/restaurant">Mock</a>
          </li>
          <li className="p-4 ">
            <a href="#">Request</a>
          </li>
        </ul>
      </div>

      <h1 className="text-7xl py-8 mx-8 font-bold text-white">
        Account Settings
      </h1>

      <div className="font-bold max-w-3xl mx-8 ">
        <div>
          <label className="block text-white text-3xl uppercase font-bold text-decoration-line: underline  mb-2">
            Name
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Lucy Jess"
          />
        </div>

        <div className="pt-4">
          <label className="block text-white text-3xl uppercase font-bold text-decoration-line: underline  mb-2">
            Email Address
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            value="lucy@mail.com"
          />
        </div>

        <div className="flex flex-col pt-4">
          <label className="block text-white text-3xl uppercase font-bold text-decoration-line: underline  mb-2">
            Password
          </label>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            value="********"
          />
          <div className="self-end">
            <a
              href="/changepassword"
              className="text-md text-blue-600 hover:text-blue-500 right-0"
            >
              Change password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
