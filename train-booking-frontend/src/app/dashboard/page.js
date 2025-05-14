'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch trains on mount
    axios.get('http://localhost:5000/trains')
      .then(res => setTrains(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelectTrain = (trainId) => {
    router.push(`/seat-selection?trainId=${trainId}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl mb-6 font-semibold">Available Trains</h1>
      {trains.length === 0 ? (
        <p>Loading trains...</p>
      ) : (
        <div className="grid gap-4">
          {trains.map((train) => (
            <div key={train.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">{train.name}</h2>
                <p>From: {train.source} - To: {train.destination}</p>
                <p>Date: {train.date} | Time: {train.time}</p>
              </div>
              <button
                onClick={() => handleSelectTrain(train.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Select Seats
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
