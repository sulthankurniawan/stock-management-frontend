import Layout from "../components/Layout";

const Dashboard = () => {
    return (
        <Layout>
            <h2 className="text-2xl font-bold mb-4">Welcome to Stock Management</h2>
            <p className="text-gray-700">Use the navigation above to manage items, stock entries, and view stock reports.</p>
        </Layout>
    );
};

export default Dashboard;
