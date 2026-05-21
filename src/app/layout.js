import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bụi Tour - Food tour in Saigon',
  description: 'Trải nghiệm tour du lịch Sài Gòn về đêm chuyên nghiệp dành cho khách quốc tế',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>© 2025 Sài Gòn Night Tour - Khám phá Sài Gòn về đêm</p>
            <p className="text-gray-400 text-sm mt-2">Hotline: +84 123 456 789 | Email: info@saigonnights.com</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
