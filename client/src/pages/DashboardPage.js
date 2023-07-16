import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import SideMenu from '../components/SideMenu';

export default function DashboardPage() {

    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const backendUrl = process.env.BACKEND_URL;

    useEffect(() => {
        if (isAuthenticated) {
            getUserInformation();
        }
    }, [isAuthenticated]);

    const getUserInformation = async () => {
        try {
            //check route
            const response = await axios.get(`${backendUrl}/user`, { withCredentials: true });

            const { name, role, email } = response.data.user;
            setName(name);
            setRole(role);
            setEmail(email);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const handleUpdatePassword = async (input) => {
        input.preventDefault();

        if (currentPassword === newPassword) {
            return alert("New password is the same as the current password!")
        }

        if (newPassword !== repeatNewPassword) {
            return alert("Passwords do not match!");
        }

        try {
            //check route
            const response = await axios.put(`${backendUrl}/user/password`, { currentPassword, newPassword }, { withCredentials: true });

            console.log(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setRepeatNewPassword('');
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    //check what other logic is needed
    const handleLogout = () => {
        logout();
    }

  return (
    <div className='container mx-auto'>
        <SideMenu />
        { isAuthenticated ? (
            <div>

                <h2 className='text-2xl font-semibold mb-4'>Welcome, { name }</h2>               
                { user.avatar && <img src={user.avatar} alt="Avatar" className='rounded-full h-20 w-20 mb-4' /> }

                <div className='mb-4'>
                    <strong>Role:</strong> { role }
                </div>

                <div className='mb-4'>
                    <strong>Email:</strong> { email }
                </div>

                <form onSubmit={ handleUpdatePassword }>
                    <div className='mb-4'>
                        <label htmlFor="currentPassword" className='block mb-2 font-medium'>
                            Current Password
                        </label>
                        <input 
                            type="password" 
                            id="currentPassword" 
                            className='border rounded px-3 py-2 w-full' 
                            value={currentPassword}
                            onChange={(input) => setCurrentPassword(input.target.value)}
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="newPassword" className='block mb-2 font-medium'>
                            New Password
                        </label>
                        <input 
                            type="password" 
                            id="newPassword" 
                            className='border rounded px-3 py-2 w-full' 
                            value={newPassword}
                            onChange={(input) => setNewPassword(input.target.value)}
                            required 
                        />                        
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="repeatNewPassword" className='block mb-2 font-medium'>
                            Repeat New Password
                        </label>
                        <input 
                            type="password" 
                            id="repeatNewPassword" 
                            className='border rounded px-3 py-2 w-full' 
                            value={repeatNewPassword}
                            onChange={(input) => setRepeatNewPassword(input.target.value)}
                            required 
                        />                        
                    </div>
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                        Update Password
                    </button>
                </form>

                <button onClick={handleLogout} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>
                    Logout
                </button>

            </div>
        ) : (
            <div>
                <h2>Please login to access the dashboard</h2>
                {/* render login form or redirect to login page or can just leave it for user to go to side menu to click on log in */}
            </div>
        )};
    </div>
  );
};