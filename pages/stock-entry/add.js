import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import Layout from "../../components/Layout";


export default function StockEntry() {
    const [form, setForm] = useState({
        tanggal: '',
        type: 'IN',
        details: [
            { item_code: '', batch_id: '', expiry_date: '', qty: '' },
        ],
    });

    const handleAddDetail = () => {
        setForm({
            ...form,
            details: [...form.details, { item_code: '', batch_id: '', expiry_date: '', qty: '' }],
        });
    };

    const handleInputChange = (e, index, field) => {
        const newDetails = [...form.details];
        newDetails[index][field] = e.target.value;
        setForm({ ...form, details: newDetails });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/stock-entries', form);
            if (response.status === 201) {
                alert('Item successfully added');
                router.push('/stock-entry');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add item');
        }
    };

    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.get('/items');
                setItems(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItems();
    }, []);

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Stock Entry</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Tanggal</label>
                        <input
                            type="date"
                            value={form.tanggal}
                            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Type</label>
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="IN">IN</option>
                            <option value="OUT">OUT</option>
                        </select>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Details</h2>
                        {form.details.map((detail, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <select
                                    value={detail.item_code}
                                    onChange={(e) => handleInputChange(e, index, 'item_code')}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="">Select Item</option>
                                    {items.map((item) => (
                                        <option key={item.item_code} value={item.item_code}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    placeholder="Batch ID"
                                    value={detail.batch_id}
                                    onChange={(e) => handleInputChange(e, index, 'batch_id')}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="date"
                                    placeholder="Expiry Date"
                                    value={detail.expiry_date}
                                    onChange={(e) => handleInputChange(e, index, 'expiry_date')}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={detail.qty}
                                    onChange={(e) => handleInputChange(e, index, 'qty')}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddDetail}
                            className="text-blue-600 hover:underline"
                        >
                            + Add Detail
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
}
