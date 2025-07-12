import React, { useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('Ragan Patel');
  const [email, setEmail] = useState('ragan@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [products] = useState([
    { id: 1, name: 'Tux', condition: 'Used - Good', image: '/img/laptop.jpg' },
    { id: 2, name: 'Leather Jacket', condition: 'Like New', image: '/img/headphones.jpg' },
  ]);

  const [requests] = useState([
    { id: 1, requester: 'Ankit Mehta', item: 'Blazers', status: 'Pending' },
    { id: 2, requester: 'Priya Shah', item: 'T-shirt', status: 'Accepted' },
    { id: 3, requester: 'Asutosh Singarwal', item: 'Shoes', status: 'Rejected' },
  ]);

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoadingUpdateProfile(true);

    setTimeout(() => {
      alert('Profile updated!');
      setLoadingUpdateProfile(false);
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white border rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <label htmlFor="profileImage" className="cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500 shadow"
                />
              ) : (
                <div className="w-28 h-28 rounded-full mx-auto bg-gray-300 border-4 border-green-500 flex items-center justify-center text-4xl text-gray-600">
                  📷
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <h2 className="mt-4 text-2xl font-bold text-green-700">{username}</h2>
            <p className="text-sm text-gray-600">{email}</p>
          </div>

          <form onSubmit={submitHandler} noValidate className="mt-6 space-y-4">
            <div>
              <label className="text-sm">Name</label>
              <input
                type="text"
                className={`w-full bg-gray-100 text-black rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.username ? 'border border-red-500' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                className={`w-full bg-gray-100 text-black rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.email ? 'border border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm">New Password</label>
              <input
                type="password"
                className="w-full bg-gray-100 text-black rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Confirm Password</label>
              <input
                type="password"
                className={`w-full bg-gray-100 text-black rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-green-500 transition ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loadingUpdateProfile}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold py-2 px-4 rounded-lg mt-2 disabled:opacity-50"
            >
              {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Your Products & Requests Section */}
        <div className="lg:col-span-2 flex flex-col space-y-8">
          <div className="bg-white border rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Your Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-md mb-3" />
                  <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.condition}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Requests</h3>
            {requests.length === 0 ? (
              <p className="text-gray-500">No requests yet.</p>
            ) : (
              <ul className="space-y-4">
                {requests.map((req) => (
                  <li key={req.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow">
                    <div>
                      <p className="font-medium text-gray-800">
                        <span className="text-green-600">{req.requester}</span> requested your <strong>{req.item}</strong>
                      </p>
                      <p className="text-sm text-gray-500">Status: {req.status}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${req.status === 'Accepted'
                        ? 'bg-green-600 text-white'
                        : req.status === 'Rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}>
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
