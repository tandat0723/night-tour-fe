'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getBookingByReference } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ConfirmationPage() {
    const pramas = useParams()
    const reference = pramas?.reference
    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBooking = async () => {
            if (!reference) return

            try {
                setLoading(true)
                const response = await getBookingByReference(reference)
                setBooking(response.data)
            } catch (error) {
                console.error('Error loading booking:', err)
                setError(err.response?.data?.error || 'Không thể tải thông tin booking')
            } finally {
                setLoading(false)
            }
        }

        loadBooking()
    }, [reference])



    if (loading) return <LoadingSpinner />
    if (!booking) return <div className="text-center py-12">Không tìm thấy booking</div>

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h1 className="text-2xl font-bold text-green-600 mb-4">Đặt tour thành công!</h1>
                <p className="text-gray-600 mb-6">Cảm ơn bạn đã đặt tour. Vui lòng lưu lại mã booking để tra cứu sau.</p>

                <div className="bg-gray-100 rounded-lg p-6 mb-6">
                    <p className="text-gray-600">Mã booking của bạn:</p>
                    <p className="text-3xl font-bold text-orange-500 font-mono">{booking.booking_reference}</p>
                </div>

                <div className="text-left border-t pt-6">
                    <h2 className="font-semibold mb-2">Thông tin đặt tour:</h2>
                    <p><strong>Tour:</strong> {booking.tours?.title}</p>
                    <p><strong>Ngày:</strong> {booking.tour_date}</p>
                    <p><strong>Giờ:</strong> {booking.tour_time?.substring(0, 5)}</p>
                    <p><strong>Số người:</strong> {booking.number_of_people}</p>
                    <p><strong>Tổng tiền:</strong> ${booking.total_price}</p>
                    <p><strong>Phương thức thanh toán:</strong> {booking.payment_method}</p>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    Một email xác nhận đã được gửi đến {booking.customer_email}
                </p>
            </div>
        </div>
    )
}