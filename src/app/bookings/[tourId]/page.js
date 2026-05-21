'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getTourDetail, getSlotsByTour, createBooking } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function BookingPage() {
    const pramas = useParams()
    const tourId = pramas?.tourId
    const router = useRouter()
    const [tour, setTour] = useState(null)
    const [slots, setSlots] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        number_of_people: 1,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        pickup_location: '',
        preferred_contact: 'email',
        payment_method: 'paypal',
        special_requests: ''
    })

    useEffect(() => {
        const loadData = async () => {
            if (!tourId) return

            setLoading(true)
            try {
                const [tourRes, slotsRes] = await Promise.all([
                    getTourDetail(tourId),
                    getSlotsByTour(tourId)
                ])
                setTour(tourRes.data)
                setSlots(slotsRes.data || [])
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [tourId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedSlot) {
            alert('Vui lòng chọn ngày và giờ tour')
            return
        }

        setSubmitting(true)
        try {
            const bookingData = {
                slot_id: selectedSlot.id,
                ...formData,
                number_of_people: parseInt(formData.number_of_people)
            }
            const response = await createBooking(bookingData)
            alert(`✅ Đặt tour thành công! Mã booking: ${response.data.booking_reference}`)
            router.push(`/confirmation/${response.data.booking_reference}`)
        } catch (error) {
            alert('❌ Có lỗi xảy ra: ' + (error.response?.data?.error || 'Vui lòng thử lại'))
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <LoadingSpinner />
    if (!tour) return <div className="text-center py-12">Không tìm thấy tour</div>

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Đặt tour: {tour.title}</h1>
            <p className="text-2xl font-bold text-orange-500 mb-8">💰 ${tour.price}/người</p>

            {/* Chọn slot */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">📅 1. Chọn ngày và giờ</h2>
                {slots.length === 0 && (
                    <p className="text-gray-500">Hiện tại chưa có lịch tour. Vui lòng quay lại sau!</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {slots.map(slot => (
                        <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-lg border-2 transition ${selectedSlot?.id === slot.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300'
                                }`}
                        >
                            <div className="text-center">
                                <div className="font-semibold">{slot.tour_date}</div>
                                <div className="text-sm text-gray-600">{slot.tour_time.substring(0, 5)}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Form thông tin */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">📝 2. Thông tin khách hàng</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Họ và tên *"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.customer_name}
                        onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                    />

                    <input
                        type="email"
                        placeholder="Email *"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.customer_email}
                        onChange={e => setFormData({ ...formData, customer_email: e.target.value })}
                    />

                    <input
                        type="tel"
                        placeholder="Số điện thoại (có mã quốc gia) *"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.customer_phone}
                        onChange={e => setFormData({ ...formData, customer_phone: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Địa điểm đón (có thể cập nhật sau)"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.pickup_location}
                        onChange={e => setFormData({ ...formData, pickup_location: e.target.value })}
                    />

                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.preferred_contact}
                        onChange={e => setFormData({ ...formData, preferred_contact: e.target.value })}
                    >
                        <option value="email">Liên lạc qua Email</option>
                        <option value="whatsapp">Liên lạc qua WhatsApp</option>
                    </select>

                    <select
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        value={formData.payment_method}
                        onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                    >
                        <option value="paypal">💰 PayPal</option>
                        <option value="credit_card">💳 Credit Card / Visa</option>
                        <option value="cash_on_tour">💵 Tiền mặt cuối tour</option>
                    </select>
                </div>

                <textarea
                    placeholder="Yêu cầu đặc biệt (ăn chay, dị ứng, ...)"
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    rows="3"
                    value={formData.special_requests}
                    onChange={e => setFormData({ ...formData, special_requests: e.target.value })}
                />

                <button
                    type="submit"
                    disabled={submitting || !selectedSlot}
                    className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:bg-gray-400"
                >
                    {submitting ? 'Đang xử lý...' : `Xác nhận đặt tour - $${tour.price * formData.number_of_people}`}
                </button>
            </form>
        </div>
    )
}