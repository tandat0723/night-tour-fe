'use client'
import { useState } from 'react'
import { getBookingsByEmail } from '@/services/api'

export default function SearchPage() {
    const [email, setEmail] = useState('')
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        setSearched(true)
        try {
            const response = await getBookingsByEmail(email)
            setBookings(response.data || [])
        } catch (error) {
            console.error('Error:', error)
            setBookings([])
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-600 bg-green-100'
            case 'pending': return 'text-yellow-600 bg-yellow-100'
            case 'cancelled': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">🔍 Tra cứu booking</h1>
                <p className="text-gray-600">Nhập email bạn đã dùng để đặt tour</p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    required
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-400"
                >
                    {loading ? 'Đang tìm...' : 'Tra cứu'}
                </button>
            </form>

            {searched && !loading && (
                <div>
                    {bookings.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500">Không tìm thấy booking nào với email này</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-gray-600">Tìm thấy {bookings.length} booking:</p>
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 font-mono">{booking.booking_reference}</p>
                                            <p className="font-semibold text-lg">{booking.tours?.title}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                                            {booking.status === 'confirmed' ? 'Đã xác nhận' :
                                                booking.status === 'pending' ? 'Chờ xử lý' : 'Đã hủy'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><strong>Ngày:</strong> {booking.tour_date}</div>
                                        <div><strong>Giờ:</strong> {booking.tour_time?.substring(0, 5)}</div>
                                        <div><strong>Số người:</strong> {booking.number_of_people}</div>
                                        <div><strong>Tổng tiền:</strong> ${booking.total_price}</div>
                                        <div><strong>Thanh toán:</strong> {booking.payment_method}</div>
                                        <div><strong>Trạng thái thanh toán:</strong> {booking.payment_status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}