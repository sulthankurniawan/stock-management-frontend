const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-blue-600 p-4 text-white">
                <div className="container mx-auto flex justify-between">
                    <h1 className="font-bold text-lg">Stock Management</h1>
                    <div>
                        <a href="/" className="mx-2 hover:underline">Dashboard</a>
                        <a href="/items" className="mx-2 hover:underline">Items</a>
                        <a href="/stock-entry" className="mx-2 hover:underline">Stock Entry</a>
                        <a href="/stock-ledger" className="mx-2 hover:underline">Stock Ledger</a>
                    </div>
                </div>
            </nav>
            <main className="flex-grow container mx-auto py-8">{children}</main>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>© 2024 Stock Management</p>
            </footer>
        </div>
    );
};

export default Layout;