import { useState } from "react";
import API from "../api";

export default function SignupModal({ onClose, onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await API.post("/auth/signup", { email, userName, password });
      localStorage.setItem("token", res.data.token);
      onSignupSuccess(); // Update auth context or refresh UI
      onClose(); // Close modal
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed.";
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-2 p-2 border rounded"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
