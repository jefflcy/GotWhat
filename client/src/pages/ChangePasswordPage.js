import { useState } from "react"
import SideMenu from "../components/SideMenu";

const ChangePasswordPage = () => {

    const [currentpassword, setCurrentPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const[confirmpassword, setConfirmPassword] = useState('');

    const handleCurrentPassword = (input) => {
        setCurrentPassword(input.target.value);
    };

    const handleNewPassword = (input) => {
      setNewPassword(input.target.value);
    };
  
    const handleConfirmPassword = (input) => {
      setConfirmPassword(input.target.value);
    };
  
    const handleSubmit = (input) => {
      input.preventDefault();
      //implement post http request to backend

      //if (currentpassword !== fetch user password)
      //window.alert('Current password is wrong!);
  
      if (newpassword !== confirmpassword) {
        window.alert('Passwords do not match!');
      }
    };

  return (

    <div className="bg-[#365b6d] h-screen">

      <SideMenu />

      <div className="justify-center pt-24 pb-8 lg:px-8 text-center font-bold text-white">
        <h2 className="text-3xl leading-9 tracking-tight">
          Change Password
        </h2>
        <p className="text-md">Please fill in this form to change your password.</p>
      </div>

      <div className="mt-5 mx-auto w-full sm:max-w-sm shadow-xl bg-white rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">

        <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
                Current Password
            </label>
            <input
                type="password"
                placeholder="********"
                onChange={handleCurrentPassword}
                required
                className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>  

        <div>
            <label className="block text-large font-bold leading-6 text-gray-900">
                New Password
            </label>
            <input
                id="newpassword"
                name="newpassword"
                type="password"
                placeholder="********"
                autoComplete="password"
                onChange={handleNewPassword}
                required
                className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-large font-bold leading-6 text-gray-900">
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            placeholder="********"
            autoComplete="confirmpassword"
            onChange={handleConfirmPassword}
            required
            className="mt-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <div className="grid grid-cols-2">
          <a href="/useraccount" className="text-center rounded-md bg-red-600 px-8 m-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
>
          <button
              type="button" className="text-center">
            Cancel
            </button>
          </a>
            <button
              type="submit"
              className="justify-center rounded-md bg-green-600 px-8 m-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Update 
            </button>
        </div>
        
        </form>
      </div> 
    </div>
  )
}

export default ChangePasswordPage