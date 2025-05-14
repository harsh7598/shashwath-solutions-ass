import "@/styles/globals.css";

export const metadata = {
  title: "Train Booking",
  description: "Book train seats easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
