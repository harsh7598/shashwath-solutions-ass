import React from "react";

export default function SeatGrid({ seats, selectedSeats, onSeatClick }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id);
        const isBooked = seat.booked;
        const lastRowStart = 77; // last 3 seats are seat 78, 79, 80 (index 77 to 79)

        return (
          <button
            key={seat.id}
            onClick={() => !isBooked && onSeatClick(seat.id)}
            className={`p-3 text-sm rounded border ${
              isBooked
                ? "bg-gray-400 cursor-not-allowed"
                : isSelected
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-100"
            }`}
            style={{
              gridColumn:
                seat.id > 77
                  ? `span ${seat.id === 78 ? 1 : seat.id === 79 ? 1 : 1}`
                  : undefined,
            }}
          >
            {seat.number}
          </button>
        );
      })}
    </div>
  );
}
