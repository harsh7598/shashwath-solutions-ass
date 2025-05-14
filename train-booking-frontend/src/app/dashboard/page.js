"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SeatGrid from "@/components/SeatGrid";

export default function Dashboard() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch seats from backend
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/seats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSeats(res.data.seats);
      } catch (err) {
        alert("Failed to fetch seats");
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, []);

  // Toggle seat selection
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
    } else if (selectedSeats.length < 7) {
      setSelectedSeats((prev) => [...prev, seatId]);
    } else {
      alert("You can only book up to 7 seats at once.");
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;

    try {
      await axios.post(
        "http://localhost:5000/book",
        { seatIds: selectedSeats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Seats booked successfully!");
      window.location.reload();
    } catch (err) {
      alert("Booking failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Train Seat Booking</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <SeatGrid
          seats={seats}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
      )}
      <div className="mt-4">
        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={selectedSeats.length === 0}
        >
          Book Selected Seats
        </button
