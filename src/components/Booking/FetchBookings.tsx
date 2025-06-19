import { useEffect, useState } from 'react';
import './booking.css';
import type { TBooking } from '../../types/TBooking';

const FetchBookings = () => {
    const [bookings, setBookings] = useState<TBooking[]>([]);
    const FetchBookingsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/booking_all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            setBookings(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(String(error));
            }
        }
    };

    useEffect(() => {
        FetchBookingsData();
    }, []);

    return (
        <div className="bookings-container">
            {bookings.length === 0 ? (
                <div> No Bookings available </div>
            ) : (
                <table className='bookings-table'>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Car ID</th>
                            <th>Customer ID</th>
                            <th>Rental Start Date</th>
                            <th>Rental End Date</th>
                            <th>Total Amount</th>
                            </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bookingId}>
                                <td>{booking.bookingId}</td>
                                <td>{booking.carId}</td>
                                <td>{booking.customerId}</td>
                                <td>{booking.rentalStartDate}</td>
                                <td>{booking.rentalEndDate}</td>
                                <td>{booking.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
    );
        };

export default FetchBookings;