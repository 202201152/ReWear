import React from 'react';

const categories = [
  { name: 'T-Shirts', image: '../assests/images/shirt2.png' },
  { name: 'Jeans', image: '../assests/images/jeans2.png' },
  { name: 'Jackets', image: '../assests/images/shirt4.png' },
  { name: 'Ethnic Wear', image: '../assests/images/kurti1.png' },
  { name: 'Shoes', image: '../assests/images/g-shoe1.png' },
  { name: 'Accessories', image: '../assests/images/heels1.png' },
  { name: 'Sweaters', image: '../assests/images/kurti3.png' },
  { name: 'Dresses', image: '../assests/images/joggers1.png' },
  { name: 'Kidswear', image: '../assests/images/heels2.png' },
];

const CategoryGrid = () => {
  return (
    <div className="text-left mt-14 w-full">
      <h3 className="text-2xl font-bold mb-6 text-green-700">Explore Categories</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden border border-green-500 cursor-pointer group shadow-lg hover:shadow-xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-3 text-center">
              <p className="text-white text-sm sm:text-base font-semibold">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryGrid;
