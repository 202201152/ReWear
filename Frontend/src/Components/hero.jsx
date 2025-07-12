import React from 'react';

const Hero = () => {
  return (
    <section className="w-full bg-white text-black py-20 px-6 flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        ReWear: Swap Clothes, Save the Planet 🌍
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8">
        ReWear is a sustainable fashion platform where you can exchange your gently used clothes with others or redeem them using points. Give your wardrobe a fresh update without buying new.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
          Start Swapping
        </button>
        <button className="border border-green-600 text-green-700 px-6 py-3 rounded-xl font-medium hover:bg-green-100 transition">
          Browse Items
        </button>
      </div>
    </section>
  );
};

export default Hero;
