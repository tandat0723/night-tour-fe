import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Tours
export const getTours = async () => {
    const response = await api.get('/tours')
    return response.data
}

export const getTourDetail = async (id) => {
    const response = await api.get(`/tours/${id}`)
    return response.data
}

// Slots
export const getSlotsByTour = async (tourId) => {
    const response = await api.get(`/slots/tour/${tourId}`)
    return response.data
}

// Bookings
export const createBooking = async (data) => {
    const response = await api.post('/bookings', data)
    return response.data
}

export const getBookingByReference = async (reference) => {
    const response = await api.get(`/bookings/reference/${reference}`)
    return response.data
}

export const getBookingsByEmail = async (email) => {
    const response = await api.get(`/bookings/email/${email}`)
    return response.data
}

export const cancelBooking = async (reference) => {
    const response = await api.put(`/bookings/cancel/${reference}`)
    return response.data
}

export default api