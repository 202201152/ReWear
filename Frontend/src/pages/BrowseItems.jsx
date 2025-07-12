import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const products = [
  {
    id: 1,
    name: 'Denim Jacket',
    image: '/images/sample1.jpg',
    description: 'Stylish and warm, perfect for winters.',
    price: 'Free Swap',
  },
  {
    id: 2,
    name: 'Cotton Kurti',
    image: '/images/sample2.jpg',
    description: 'Comfortable cotton wear for summers.',
    price: '80 Points',
  },
  {
    id: 3,
    name: 'Canvas Shoes',
    image: '/images/sample4.jpg',
    description: 'Trendy canvas shoes for everyday use.',
    price: 'Free Swap',
  },
  {
    id: 4,
    name: 'Wool Scarf',
    image: '/images/sample3.jpg',
    description: 'Soft and cozy scarf for cold weather.',
    price: '50 Points',
  },
  // ➕ Add more fake items if needed
];

const BrowseItems = () => {
  const [sortOrder, setSortOrder] = useState('default');

  return (
    <div className="max-w-7xl mx-auto p-6 text-black">
      <SearchBar onSearch={(q) => console.log('Searching:', q)} />

      {/* Filter and Sort Buttons */}
      <div className="flex justify-between items-center my-6">
        <h2 className="text-xl font-semibold">Browse All Clothes</h2>
        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-md text-sm text-green-700 hover:bg-green-100">
            Filter
          </button>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm text-black"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md border rounded-xl overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-green-700 font-semibold">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseItems;
