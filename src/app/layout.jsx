import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "A simple personal finance app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-6 flex-1 overflow-auto">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
