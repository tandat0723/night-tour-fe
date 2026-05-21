import { getTours } from '@/services/api'
import TourCard from '@/components/TourCard'

export default async function HomePage() {
  let tours = []
  try {
    const response = await getTours()
    tours = response.data || []
  } catch (error) {
    console.error('Error loading tours:', error)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🚌 Khám phá Sài Gòn về đêm
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Trải nghiệm những cung đường đẹp nhất Sài Gòn cùng hướng dẫn viên chuyên nghiệp
        </p>
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