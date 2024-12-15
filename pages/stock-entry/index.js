import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import Layout from "../../components/Layout";

export default function StockEntryPage() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await api.get('/stock-entries');
                console.log(response.data);
                setEntries(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Stock Entry</h1>
                <div className="space-y-4">
                    <div className="mb-4">
                        <Link href="stock-entry/add">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Add Stock Entry
                            </button>
                        </Link>
                    </div>
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Item Code</th>
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Type</th>
                                <th className="p-2 border">Quantity</th>
                                <th className="p-2 border">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td className="p-2 border">{entry.item_code}</td>
                                    <td className="p-2 border">{entry.tanggal}</td>
                                    <td className="p-2 border">{entry.type}</td>
                                    <td className="p-2 border">{entry.qty}</td>
                                    <td className="p-2 border">{entry.expiry_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
