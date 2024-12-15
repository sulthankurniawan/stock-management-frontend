import { useEffect, useState } from 'react';
import api from '../utils/axios'; // Import konfi
import Layout from "../components/Layout";

export default function StockLedger() {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const response = await api.get('/stock-ledger');
                console.log(response.data);
                setLedger(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLedger();
    }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Stock Ledger</h1>
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Item Code</th>
                            <th className="p-2 border">Item Name</th>
                            <th className="p-2 border">Qty In</th>
                            <th className="p-2 border">Qty Out</th>
                            <th className="p-2 border">Current Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledger.map((entry, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2 border">{entry.tanggal}</td>
                                <td className="p-2 border">{entry.item_code}</td>
                                <td className="p-2 border">{entry.name}</td>
                                <td className="p-2 border">{entry.qty_in}</td>
                                <td className="p-2 border">{entry.qty_out}</td>
                                <td className="p-2 border">{entry.current_stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
