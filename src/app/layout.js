import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Personal Finance Tracker</h1>
            <p className="text-gray-500 text-sm">
              Kelola pemasukan dan pengeluaranmu dengan mudah
            </p>
          </header>

          <main>{children}</main>

          <footer className="mt-10 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} - Finance Tracker App
          </footer>
        </div>
      </body>
    </html>
  );
}
