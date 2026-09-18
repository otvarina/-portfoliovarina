import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Anastasia Varina — Graphic / Motion Designer",
  description: "Портфолио графического и моушн-дизайнера Анастасии Вариной",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
