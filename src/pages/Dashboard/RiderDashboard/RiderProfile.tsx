import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axios";

const RiderProfile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");
    setProfileError("");

    if (!name.trim() || !phone.trim()) {
      setProfileError("Name and Phone cannot be empty.");
      setProfileLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.put("/auth/update-profile", {
        name,
        phone,
      });
      console.log("Profile Update Response:", data);

      updateUser(data.user);
      setProfileMessage("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile Update Error:", err);
      if (err.response) {
        setProfileError(err.response.data?.message || "Server error occurred.");
      } else if (err.request) {
        setProfileError("No response from server. Check your connection.");
      } else {
        setProfileError("An unexpected error occurred.");
      }
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      setPasswordLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      console.log("Password Change Response:", data);

      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password Change Error:", err);
      if (err.response) {
        setPasswordError(
          err.response.data?.message || "Server error occurred."
        );
      } else if (err.request) {
        setPasswordError("No response from server. Check your connection.");
      } else {
        setPasswordError("An unexpected error occurred.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg mx-auto mt-10 p-6 rounded-xl max-w-md">
      <h2 className="mb-6 font-bold text-2xl">Profile Management</h2>

      {/* Profile Update */}
      {profileMessage && (
        <p className="mb-2 text-green-600">{profileMessage}</p>
      )}
      {profileError && <p className="mb-2 text-red-600">{profileError}</p>}
      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4 mb-6">
        <h3 className="font-semibold text-lg">Edit Name & Phone</h3>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <input
          type="text"
          value={phone}
          placeholder="Phone Number"
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setPhone(val); // allow only numbers
          }}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <button
          type="submit"
          disabled={profileLoading}
          className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white transition"
        >
          {profileLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <hr className="my-6" />

      {/* Password Change */}
      {passwordMessage && (
        <p className="mb-2 text-green-600">{passwordMessage}</p>
      )}
      {passwordError && <p className="mb-2 text-red-600">{passwordError}</p>}
      <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Change Password</h3>

        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            placeholder="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="top-2 right-2 absolute text-gray-500"
          >
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="top-2 right-2 absolute text-gray-500"
          >
            {showNew ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="top-2 right-2 absolute text-gray-500"
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={passwordLoading}
          className="bg-green-600 hover:bg-green-700 py-2 rounded-lg text-white transition"
        >
          {passwordLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default RiderProfile;
