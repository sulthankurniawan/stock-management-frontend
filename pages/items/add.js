import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/axios';
import Layout from "../../components/Layout";

export default function AddItemPage() {
    const [form, setForm] = useState({ item_code: '', item_name: '', description: '', stock: 0 });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/items', form);
            if (response.status === 201) {
                alert('Item successfully added');
                router.push('/items');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add item');
        }
    };

    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Add Item</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Item Code</label>
                        <input
                            type="text"
                            value={form.item_code}
                            onChange={(e) => setForm({ ...form, item_code: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">UOM</label>
                        <input
                            type="text"
                            value={form.uom}
                            onChange={(e) => setForm({ ...form, uom: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </form>
            </div>
        </Layout>
    );
}
