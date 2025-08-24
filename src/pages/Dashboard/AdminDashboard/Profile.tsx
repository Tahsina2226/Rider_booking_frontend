import React, { useState } from "react";
import axiosInstance from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");
    setProfileError("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setProfileError("Name, Email, and Phone are required.");
      setProfileLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.put("/auth/update-profile", {
        name,
        email,
        phone,
      });
      updateUser(data.user);
      setProfileMessage("Profile updated successfully!");
    } catch (err: any) {
      console.error("Profile update error:", err);
      setProfileError(
        err.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setProfileLoading(false);
    }
  };

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
      await axiosInstance.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password change error:", err);
      setPasswordError(
        err.response?.data?.message || "Failed to change password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white shadow-lg mx-auto mt-10 p-6 rounded-xl max-w-md">
      <h2 className="font-bold text-2xl">Profile</h2>

      <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
        {profileMessage && <p className="text-green-600">{profileMessage}</p>}
        {profileError && <p className="text-red-600">{profileError}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setPhone(val);
          }}
          className="p-2 border rounded w-full"
        />

        <button
          type="submit"
          disabled={profileLoading}
          className="bg-blue-600 py-2 rounded text-white"
        >
          {profileLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <hr />

      <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
        {passwordMessage && <p className="text-green-600">{passwordMessage}</p>}
        {passwordError && <p className="text-red-600">{passwordError}</p>}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <button
          type="submit"
          disabled={passwordLoading}
          className="bg-green-600 py-2 rounded text-white"
        >
          {passwordLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
