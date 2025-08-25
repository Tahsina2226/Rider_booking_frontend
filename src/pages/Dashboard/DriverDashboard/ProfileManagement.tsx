import React, { useEffect, useState, ChangeEvent } from "react";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

interface DriverProfile {
  name: string;
  email: string;
  vehicle: string;
  phone: string;
}

const ProfileManagement: React.FC = () => {
  const [profile, setProfile] = useState<DriverProfile>({
    name: "",
    email: "",
    vehicle: "",
    phone: "",
  });

  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/driver/profile");
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to fetch profile");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      await axiosInstance.patch("/driver/profile", profile);
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const updatePassword = async () => {
    if (!password) return toast.error("Enter new password");
    try {
      await axiosInstance.patch("/driver/profile/password", { password });
      toast.success("Password updated");
      setPassword("");
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Profile Management</h2>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border rounded w-full"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="vehicle"
          value={profile.vehicle}
          onChange={handleChange}
          placeholder="Vehicle"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={updateProfile}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Update Profile
        </button>
      </div>

      <div className="space-y-2 mt-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={updatePassword}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ProfileManagement;
