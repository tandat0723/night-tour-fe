import Link from 'next/link'
import Image from 'next/image'

export default function TourCard({ tour }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div className="relative h-48 w-full">
                <Image
                    src={tour.image_url || 'https://via.placeholder.com/400x300?text=Tour+Image'}
                    alt={tour.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-orange-500">${tour.price}</span>
                    <span className="text-gray-500 text-sm">⏱️ {tour.duration}</span>
                </div>
                <Link
                    href={`/booking/${tour.id}`}
                    className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    Đặt tour ngay
                </Link>
            </div>
        </div>
    )
}