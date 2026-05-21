import { getTours } from '@/services/api'
import TourCard from '@/components/TourCard'

export default async function ToursPage() {
    let tours = []
    try {
        const response = await getTours()
        tours = response.data || []
    } catch (error) {
        console.error('Error loading tours:', error)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Tất cả tours</h1>
                <p className="text-gray-600 mt-2">Chọn tour yêu thích của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    )
}

export const revalidate = 60