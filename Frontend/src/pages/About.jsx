import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6 text-green-700">About ReWear</h1>
      <p className="mb-4 text-gray-700 leading-relaxed">
        ReWear is a sustainability-focused platform designed to reduce textile waste by promoting the reuse and exchange of clothing.
        Whether you're looking to declutter your wardrobe or discover stylish, pre-loved items, ReWear connects you with a like-minded
        community passionate about eco-conscious fashion.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        Built for the Odoo Hackathon '25, ReWear empowers users to:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Swap unused clothes with others for free or points</li>
        <li>Earn and redeem points based on the quality of items</li>
        <li>Track your swap history and manage listings</li>
        <li>Reduce your carbon footprint with every exchange</li>
      </ul>
      <p className="text-gray-700 leading-relaxed">
        Join us on our mission to make fashion circular, one swap at a time.
      </p>
    </div>
  );
};

export default About;
