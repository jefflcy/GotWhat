import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { token, isAuthenticated, logout } = useContext(AuthContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  /* General Information */
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  /* Restaurant Information */
  const [operatingHours, setOperatingHours] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  /* File uploading */
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");

  /* Change Password */
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const getUserInformation = async () => {
        try {
          const response = await axios.get(`${backendUrl}/user`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          });

          const {
            name,
            role,
            email,
            operatingHours,
            address,
            contact,
            menuUrl,
            avatarUrl,
            bannerUrl,
          } = response.data.user;
          setName(name);
          setRole(role);
          setEmail(email);
          setOperatingHours(operatingHours);
          setAddress(address);
          setContact(contact);
          setMenuUrl(menuUrl);
          setAvatarUrl(avatarUrl);
          setBannerUrl(bannerUrl);
        } catch (error) {
          alert(error.response.data.error);
        }
      };
      getUserInformation();
    }
  }, [
    isAuthenticated,
    token,
    backendUrl,
    setName,
    setRole,
    setEmail,
    setOperatingHours,
    setAddress,
    setContact,
    setMenuUrl,
    setAvatarUrl,
    setBannerUrl,
  ]);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    if (currentPassword === newPassword) {
      return alert("New password is the same as the current password!");
    }

    if (newPassword !== repeatNewPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await axios.patch(
        `${backendUrl}/user/password`,
        { currentPassword, newPassword },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      setCurrentPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error || error.message);
    }
  };

  const handleUpdateOH = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${backendUrl}/user/OH`,
        { operatingHours },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleUpdateAddress = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${backendUrl}/user/address`,
        { address },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleUpdateContact = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${backendUrl}/user/contact`,
        { contact },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleMenuChange = (e) => {
    setSelectedMenu(e.target.files[0]);
  };

  const handleMenuUpload = async () => {
    const formData = new FormData();
    if (selectedMenu === null) {
      alert("Please select a file");
      return;
    } else {
      formData.append("pdfFile", selectedMenu);
    }

    try {
      const uploadResponse = await axios.post(
        `${backendUrl}/user/uploadmenu`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let newMenuUrl = uploadResponse.data.url;
      setMenuUrl(newMenuUrl);
      setSelectedMenu(null);
      const updateResponse = await axios.patch(
        `${backendUrl}/user/menu`,
        { newMenuUrl },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      alert(updateResponse.data.message);
    } catch (error) {
      alert(error.response.data.error || error.message);
    }
  };

  const handleAvatarChange = (e) => {
    setSelectedAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append("avatarImg", selectedAvatar);

    try {
      const uploadResponse = await axios.post(
        `${backendUrl}/user/uploadavatar`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let newAvatarUrl = uploadResponse.data.url;
      setAvatarUrl(newAvatarUrl);
      setSelectedAvatar(null);
      const updateResponse = await axios.patch(
        `${backendUrl}/user/avatar`,
        { newAvatarUrl },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      alert(updateResponse.data.message);
    } catch (error) {
      alert(error.response.data.error || error.message);
    }
  };

  const handleBannerChange = (e) => {
    setSelectedBanner(e.target.files[0]);
  };

  const handleBannerUpload = async () => {
    const formData = new FormData();
    formData.append("bannerImg", selectedBanner);

    try {
      const uploadResponse = await axios.post(
        `${backendUrl}/user/uploadbanner`,
        formData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      let newBannerUrl = uploadResponse.data.url;
      setBannerUrl(newBannerUrl);
      setSelectedBanner(null);
      const updateResponse = await axios.patch(
        `${backendUrl}/user/banner`,
        { newBannerUrl },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      alert(updateResponse.data.message);
    } catch (error) {
      alert(error.response.data.error || error.message);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#365b6d] min-h-screen">
      <SideMenu />
      {isAuthenticated ? (
        <div>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="rounded-full h-20 w-20 mb-4 justify-center mx-auto"
            />
          ) : (
            <div className=" text-white p-6 text-center">
              <h2 className="font-bold text-xl mb-4">Update Your Avatar</h2>
              <input type="file" onChange={handleAvatarChange} />
              <button
                onClick={handleAvatarUpload}
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
              >
                Upload
              </button>
            </div>
          )}

          <h2 className="justify-center pt-8 pb-8 lg:px-8 text-center text-4xl font-bold text-white">
            Welcome, {name}
          </h2>

          <div className="grid grid-cols-2 p-12">
            <div className="font-bold text-white p-6">
              <div className="mb-8 text-2xl">
                <h3>Role: {role}</h3>
              </div>

              <div className="flex mb-8 text-2xl">
                <h3>Email: {email}</h3>
              </div>

              {role === "Business Owner" && (
                <div>
                  <div className="mb-8 flex">
                    <h3 className="text-2xl">Operating Hours:</h3>
                    <form onSubmit={handleUpdateOH} className="flex w-full">
                      <input
                        type="text"
                        id="operatingHours"
                        className="border rounded px-3 py-2 w-full text-gray-600"
                        value={operatingHours}
                        onChange={(event) =>
                          setOperatingHours(event.target.value)
                        }
                        placeholder={operatingHours}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
                      >
                        Update
                      </button>
                    </form>
                  </div>

                  <div className="mb-8 flex">
                    <h3 className="text-2xl mr-12">Address:</h3>
                    <form
                      onSubmit={handleUpdateAddress}
                      className="flex w-full"
                    >
                      <input
                        type="text"
                        id="address"
                        className="border rounded px-3 py-2 w-full text-gray-600"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder={address}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
                      >
                        Update
                      </button>
                    </form>
                  </div>

                  <div className="mb-8 flex">
                    <h3 className="text-2xl mr-12">Contact:</h3>
                    <form
                      onSubmit={handleUpdateContact}
                      className="flex w-full"
                    >
                      <input
                        type="tel"
                        id="contact"
                        className="border rounded px-3 py-2 w-full text-gray-600"
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        placeholder={contact}
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <Link to="/home">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </Link>
            </div>

            <form
              onSubmit={handleUpdatePassword}
              className="bg-white border rounded shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Update your password
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 font-bold"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="border rounded px-3 py-2 w-full"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2 font-bold">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="border rounded px-3 py-2 w-full"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="repeatNewPassword"
                  className="block mb-2 font-bold"
                >
                  Repeat New Password
                </label>
                <input
                  type="password"
                  id="repeatNewPassword"
                  className="border rounded px-3 py-2 w-full"
                  value={repeatNewPassword}
                  onChange={(event) => setRepeatNewPassword(event.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
              >
                Update Password
              </button>
            </form>
          </div>

          {role === "Business Owner" && (
            <div>
              <div>
                <div className=" text-white p-6 text-center">
                  <h2 className="font-bold text-xl mb-4">Update Your Menu</h2>
                  <input type="file" onChange={handleMenuChange} />
                  <button
                    onClick={handleMenuUpload}
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
                  >
                    Upload
                  </button>
                </div>

                {menuUrl && (
                  <div>
                    <h3 className="text-white text-center font-bold text-xl">
                      Uploaded Menu:
                    </h3>
                    <iframe
                      src={menuUrl}
                      className="w-full h-full md:h-screen border border-gray-300 rounded-lg shadow-md"
                      title="PDF Viewer"
                    />
                  </div>
                )}
              </div>

              <div>
                <div className=" text-white p-6 text-center">
                  <h2 className="font-bold text-xl mb-4">Update Your Banner</h2>
                  <input type="file" onChange={handleBannerChange} />
                  <button
                    onClick={handleBannerUpload}
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
                  >
                    Upload
                  </button>
                </div>

                {bannerUrl && (
                  <div>
                    <h3 className="text-white text-center font-bold text-xl">
                      Uploaded Banner:
                    </h3>
                    <img
                      src={bannerUrl}
                      alt="Uploaded Banner"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="flex h-screen items-center justify-center text-4xl font-bold text-white"
          >
            Please login to access the dashboard
          </Link>
        </div>
      )}
      ;
    </div>
  );
}
