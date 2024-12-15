import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import Layout from "../../components/Layout";

export default function ItemsPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get('/items'); 
                setItems(response.data); 
                setLoading(false); 
            } catch (err) {
                setError(err.message); 
                setLoading(false); 
            }
        };

        fetchItems();
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Items</h1>
                <div className="mb-4">
                    <Link href="items/add">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add Item
                        </button>
                    </Link>
                </div>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Item Code</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">UOM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2 border">{item.item_code}</td>
                                <td className="p-2 border">{item.name}</td>
                                <td className="p-2 border">{item.uom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
