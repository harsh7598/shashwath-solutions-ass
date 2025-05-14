'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const router = useRouter();

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};

useEffect(() => {
  const id = localStorage.getItem('userId');
  if (!id) {
    router.push('/login');
  }
}, []);
  useEffect(() => {
    axios.get('http://localhost:5000/seats/1')
      .then(res => setSeats(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleSeat = (seatNum) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(n => n !== seatNum));
    } else if (selectedSeats.length < 7) {
      setSelectedSeats([...selectedSeats, seatNum]);
    }
  };

  const bookSeats = async () => {
    if (selectedSeats.length === 0) return alert('No seats selected');
    try {
      const res = await axios.post('http://localhost:5000/seats/book', {
        userId,
        trainId: 1,
        seats: selectedSeats
      });
      alert(res.data.message);
      setSelectedSeats([]);
      const refreshed = await axios.get('http://localhost:5000/seats/1');
      setSeats(refreshed.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Train Seat Booking</h1>
      <div className="grid grid-cols-7 gap-4 mb-6">
        {seats.map(seat => (
          <button
            key={seat.number}
            className={`p-4 rounded font-semibold 
              ${seat.is_booked ? 'bg-gray-400 cursor-not-allowed' : 
                selectedSeats.includes(seat.number) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}
            `}
            disabled={seat.is_booked}
            onClick={() => toggleSeat(seat.number)}
          >
            {seat.number}
          </button>
        ))}
      </div>
      <button
        onClick={bookSeats}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Book Selected Seats
      </button>
      <button
  onClick={handleLogout}
  className="bg-red-600 text-white px-4 py-2 rounded mb-4"
>
  Logout
</button>
    </div>
  );
}
