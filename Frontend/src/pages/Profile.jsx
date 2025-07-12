import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="p-6 max-w-2xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p><strong>Name:</strong> {user.name || "Not logged in"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
        <p><strong>Points:</strong> {user.points || 0}</p>
      </div>
    </div>
  );
};

export default Profile;
