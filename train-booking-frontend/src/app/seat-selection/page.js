'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function SeatSelection() {
  const searchParams = useSearchParams();
  const trainId = searchParams.get('trainId');

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (trainId) {
      axios.get(`http://localhost:5000/seats/${trainId}`)
        .then(res => setSeats(res.data))
        .catch(err => console.error(err));
    }
  }, [trainId]);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < 7) {
      setSelectedSeats(prev => [...prev, seatNumber]);
    } else {
      alert("You can select a maximum of 7 seats.");
    }
  };

  const handleBooking = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post('http://localhost:5000/seats/book', {
        userId,
        trainId,
        seats: selectedSeats,
      });
      setMessage(res.data.message);
      setSelectedSeats([]);
      // Refresh seat status
      const updated = await axios.get(`http://localhost:5000/seats/${trainId}`);
      setSeats(updated.data);
    } catch (err) {
      console.error(err);
      setMessage('Booking failed');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Seat Selection</h1>
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
      <div className="grid grid-cols-7 gap-3 max-w-xl mx-auto mb-6">
        {seats.map((seat) => (
          <button
            key={seat.number}
            disabled={seat.isBooked}
            onClick={() => toggleSeat(seat.number)}
            className={`p-2 border rounded text-sm font-medium ${
              seat.isBooked
                ? 'bg-gray-400 cursor-not-allowed'
                : selectedSeats.includes(seat.number)
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-blue-100'
            }`}
          >
            {seat.number}
          </button>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Book Selected Seats
        </button>
      </div>
    </div>
  );
}
