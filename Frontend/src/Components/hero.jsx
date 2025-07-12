import React from 'react';

const featuredProducts = [
  {
    id: 1,
    name: 'Denim Jacket',
    pictureUrl: '/images/sample1.jpg',
    price: 'Free Swap',
  },
  {
    id: 2,
    name: 'Cotton Kurti',
    pictureUrl: '/images/sample2.jpg',
    price: '80 Points',
  },
  {
    id: 3,
    name: 'Winter Scarf',
    pictureUrl: '/images/sample3.jpg',
    price: '50 Points',
  },
  {
    id: 4,
    name: 'Canvas Shoes',
    pictureUrl: '/images/sample4.jpg',
    price: 'Free Swap',
  },
];

const Hero = () => {
  return (
    <section className="w-full bg-white text-black py-20 px-6 flex flex-col items-center text-center">
      {/* Hero Title & CTA */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        ReWear: Swap Clothes, Save the Planet 🌍
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8">
        ReWear is a sustainable fashion platform where you can exchange your gently used clothes with others or redeem them using points. Give your wardrobe a fresh update without buying new.
      </p>
      <div className="flex gap-4 flex-wrap justify-center mb-12">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
          Start Swapping
        </button>
        <button className="border border-green-600 text-green-700 px-6 py-3 rounded-xl font-medium hover:bg-green-100 transition">
          Browse Items
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-left mb-6">Featured Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={item.pictureUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-green-700">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
