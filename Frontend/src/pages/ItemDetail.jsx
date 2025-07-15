import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`/api/getItem/${id}`);
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load item details");
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <p className="text-center text-green-700">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="bg-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-64 h-64 object-cover rounded-xl mx-auto mb-6 border-4 border-green-500 shadow-md"
                />
                <h1 className="text-3xl font-bold text-green-700 mb-4">{item.name}</h1>
                <p className="text-lg text-gray-700 mb-4">{item.description}</p>

                <p className="text-md text-green-600 mb-2 font-semibold">
                    Seller: {item.seller.name}
                </p>

                <p className="text-md text-yellow-500 font-bold">Points: {item.points}</p>
            </div>
        </div>
    );
};

export default ItemDetails;
