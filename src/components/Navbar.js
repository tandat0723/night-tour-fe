'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-orange-500">
                            🚌 Bụi Tour
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="hover:text-orange-400 transition">Trang chủ</Link>
                        <Link href="/tours" className="hover:text-orange-400 transition">Tours</Link>
                        <Link href="/search" className="hover:text-orange-400 transition">Search booking</Link>
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 p-4">
                    <Link href="/" className="block py-2 hover:text-orange-400">Trang chủ</Link>
                    <Link href="/tours" className="block py-2 hover:text-orange-400">Tours</Link>
                    <Link href="/search" className="block py-2 hover:text-orange-400">Tra cứu booking</Link>
                </div>
            )}
        </nav>
    )
}