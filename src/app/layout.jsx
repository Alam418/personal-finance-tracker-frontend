import "./globals.css";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "A simple personal finance app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}