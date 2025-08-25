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
    <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 max-w-2xl">
      <div className="bg-gradient-to-r from-[#D9C4B0] to-[#BFAA95] mb-8 p-6 rounded-xl text-white">
        <h2 className="font-bold text-2xl">Profile Management</h2>
        <p className="opacity-90 mt-1">Update your personal information and security settings</p>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        {/* Profile Update Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-gray-100 border-b">
            <h3 className="flex items-center font-semibold text-gray-800 text-lg">
              <svg className="mr-2 w-5 h-5 text-[#8B6B4F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Personal Information
            </h3>
          </div>
          
          <div className="p-6">
            {profileMessage && (
              <div className="flex items-center bg-green-50 mb-4 p-3 border border-green-200 rounded-lg text-green-700">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {profileMessage}
              </div>
            )}
            
            {profileError && (
              <div className="flex items-center bg-red-50 mb-4 p-3 border border-red-200 rounded-lg text-red-700">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {profileError}
              </div>
            )}
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    placeholder="Your full name"
                    onChange={(e) => setName(e.target.value)}
                    className="py-3 pr-4 pl-10 border border-gray-200 focus:border-[#D9C4B0] rounded-lg focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
                  />
                  <svg className="top-3 left-3 absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    placeholder="Your phone number"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) setPhone(val);
                    }}
                    className="py-3 pr-4 pl-10 border border-gray-200 focus:border-[#D9C4B0] rounded-lg focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
                  />
                  <svg className="top-3 left-3 absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={profileLoading}
                className="flex justify-center items-center bg-gradient-to-r from-[#D9C4B0] hover:from-[#BFAA95] to-[#BFAA95] hover:to-[#D9C4B0] disabled:opacity-70 shadow-md hover:shadow-lg py-3 rounded-lg w-full font-medium text-white transition-all"
              >
                {profileLoading ? (
                  <>
                    <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-gray-100 border-b">
            <h3 className="flex items-center font-semibold text-gray-800 text-lg">
              <svg className="mr-2 w-5 h-5 text-[#8B6B4F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Change Password
            </h3>
          </div>
          
          <div className="p-6">
            {passwordMessage && (
              <div className="flex items-center bg-green-50 mb-4 p-3 border border-green-200 rounded-lg text-green-700">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {passwordMessage}
              </div>
            )}
            
            {passwordError && (
              <div className="flex items-center bg-red-50 mb-4 p-3 border border-red-200 rounded-lg text-red-700">
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {passwordError}
              </div>
            )}
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    placeholder="Enter current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="py-3 pr-12 pl-10 border border-gray-200 focus:border-[#D9C4B0] rounded-lg focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
                  />
                  <svg className="top-3 left-3 absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
                  >
                    {showCurrent ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="py-3 pr-12 pl-10 border border-gray-200 focus:border-[#D9C4B0] rounded-lg focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
                  />
                  <svg className="top-3 left-3 absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
                  >
                    {showNew ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 text-sm">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-3 pr-12 pl-10 border border-gray-200 focus:border-[#D9C4B0] rounded-lg focus:ring-[#D9C4B0] focus:ring-2 w-full transition"
                  />
                  <svg className="top-3 left-3 absolute w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="top-3 right-3 absolute text-gray-500 hover:text-gray-700"
                  >
                    {showConfirm ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="flex justify-center items-center bg-gradient-to-r from-[#8B6B4F] hover:from-[#6D5540] to-[#6D5540] hover:to-[#8B6B4F] disabled:opacity-70 shadow-md hover:shadow-lg py-3 rounded-lg w-full font-medium text-white transition-all"
              >
                {passwordLoading ? (
                  <>
                    <svg className="mr-2 -ml-1 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;