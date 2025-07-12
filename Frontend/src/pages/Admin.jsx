import React, { useState } from 'react';

const Admin = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Vintage Jacket",
            user: "Ragan Patel",
            status: "pending",
            image: "/img/headphones.jpg",
        },
        {
            id: 2,
            name: "Old Book Set",
            user: "Priya Shah",
            status: "approved",
            image: "/img/laptop.jpg",
        },
        {
            id: 3,
            name: "Rusty Lamp",
            user: "Ankit Mehta",
            status: "rejected",
            image: "/img/shoes.jpg",
        },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
    };

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = items.length;
    const pending = items.filter((i) => i.status === 'pending').length;
    const approved = items.filter((i) => i.status === 'approved').length;
    const rejected = items.filter((i) => i.status === 'rejected').length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Dashboard</h1>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="Total Items" value={total} color="blue" />
                <StatCard label="Pending" value={pending} color="yellow" />
                <StatCard label="Approved" value={approved} color="green" />
                <StatCard label="Rejected" value={rejected} color="red" />
            </div>

            {/* Item Moderation Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded shadow">
                        <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded mb-4" />
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">Listed by: {item.user}</p>
                        <p className="text-xs mb-2">
                            Status:{" "}
                            <span className={`font-bold capitalize text-${item.status === 'approved' ? 'green' :
                                item.status === 'rejected' ? 'red' : 'yellow'
                                }-600`}>
                                {item.status}
                            </span>
                        </p>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleStatusChange(item.id, 'approved')}
                                className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusChange(item.id, 'rejected')}
                                className="bg-yellow-500 text-black text-sm px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className={`bg-${color}-100 text-${color}-700 p-4 rounded shadow`}>
        <p className="text-sm">{label}</p>
        <p className="text-xl font-bold">{value}</p>
    </div>
);

export default Admin;