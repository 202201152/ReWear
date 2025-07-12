import React from 'react';

const dummyRequests = [
  {
    id: 1,
    from: 'user123',
    status: 'Pending',
    offeredProducts: [
      { name: 'Striped Shirt', image: '/images/sample1.jpg' },
      { name: 'Jeans', image: '/images/sample2.jpg' },
    ],
  },
  {
    id: 2,
    from: 'ecoSwap23',
    status: 'Accepted',
    offeredProducts: [
      { name: 'Winter Jacket', image: '/images/sample3.jpg' },
    ],
  },
  {
    id: 3,
    from: 'fashionQueen',
    status: 'Rejected',
    offeredProducts: [
      { name: 'Black Dress', image: '/images/sample4.jpg' },
    ],
  },
];

const statusColors = {
  Accepted: 'text-green-600',
  Pending: 'text-yellow-600',
  Rejected: 'text-red-600',
};

const SwapRequests = () => {
  return (
    <div className="p-6 bg-white shadow rounded-lg text-black">
      <h2 className="text-xl font-semibold mb-4">Swap Requests</h2>
      {dummyRequests.map((req) => (
        <div
          key={req.id}
          className="border p-4 mb-4 rounded-lg shadow-sm bg-gray-50"
        >
          <p>
            <strong>From:</strong> {req.from}
          </p>
          <p className={`${statusColors[req.status]} font-medium`}>
            Status: {req.status}
          </p>
          <div className="flex gap-4 mt-2">
            {req.offeredProducts.map((prod, idx) => (
              <div key={idx} className="w-20">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-16 object-cover rounded-md"
                />
                <p className="text-xs text-center mt-1">{prod.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapRequests;
