"use client";
import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";

interface ISeatProps {
  id: string;
  row: number;
  seat: number;
  type: string;
  price: number;
  color: string;
  status: string;
  selected: boolean;
}

const colors: Record<string, string> = {
  booked:
    "bg-gray-400  border-2 border-gray-500  text-gray-600  cursor-not-allowed",
    selected:"bg-green-500 border-green-600 text-white  transform scale-110",
  vip: "bg-yellow-800 border-2 border-yellow-600 text-red-600",
  premium: "bg-pink-800 border-2 border-pink-600 text-pink-600",
  regular: "border-2 border-blue-300 font-bold bg-blue-200 text-blue-800",
};

const getClassNames = (
  seat: {
    id: string;
    row: number;
    seat: number;
    type: string;
    price: number;
    color: string;
    status: string;
    selected: boolean;
  },
  selectedSeat: ISeatProps[]
) => {
  const base = `w-8 h-8 sm:w-10 sm:h-10 lg:12 lg:12 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold ${colors["regular"]}`;

  if (seat.status === "booked") {
    return `${base} ${colors["booked"]}`;
  }

  if (selectedSeat.find((item) => item.id.includes(seat.id))) {
    return `${base} ${colors["selected"]}`;
  }

  if (seat.type === "regular") {
    return `${base} ${colors["regular"]}`;
  }

  if (seat.type === "vip") {
    return `${base} ${colors["vip"]}`;
  }

  if (seat.type === "premium") {
    return `${base} ${colors["premium"]}`;
  }
};

interface CineHallProps {
  rows?: number;
  seatPerRow?: number;
  aislePosition?: number;
  seats?: {
    type: string;
    price: number;
    seat: string[];
  }[];
  bookedSeat?: string[];
  currency?: string;
}

const CinemaHallContainer = ({
  aislePosition = 5,
  bookedSeat = ["A1", "B3", "C9", "E9", "A10"],
  currency = "₹",
  rows = 8,
  seatPerRow = 12,
  seats = [
    {
      type: "vip",
      price: 900,
      seat: [
        "B1",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G12",
        "G11",
        "G10",
      ],
    },
    {
      type: "premium",
      price: 700,
      seat: ["B2", "B6", "B7", "B8", "B9", "B10", "B11", "B12"],
    },
    {
      type: "regular",
      price: 500,
      seat: [],
    },
  ],
}: CineHallProps) => {
  const getSeatType = (seatId: string) => {
    for (let i = 0; i < seats.length; i++) {
      const { type, price, seat } = seats[i];
      if (seat.includes(seatId)) {
        const color = colors[type];
        return { type, color, price, seat };
      }
    }
    return { type: "regular", color: "gray", price: 500, seat: [] };
  };

  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < rows; row++) {
      const seatRow = [];
      for (let seat = 0; seat < seatPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        const seatType = getSeatType(seatId);
        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatType?.type || "regular",
          price: seatType?.price || 500,
          color: seatType?.color || "blue",
          status: bookedSeat.includes(seatId) ? "booked" : "avaiable",
          selected: false,
        });
      }
      seats.push(seatRow);
    }
    return seats;
  }, [rows, seatPerRow, aislePosition]);

  const [initialseat, setInitialSeat] = useState(initializeSeats);
  const [selectedSeat, setSelectedSeat] = useState<ISeatProps[]>([]);

  const handleSeatSelect = (item: ISeatProps) => {
    if (item.status === "booked") return;

    setSelectedSeat((prev) => {
      const exists = prev.find((s) => s.id === item.id);
      if (exists) {
        // Toggle off: remove seat
        return prev.filter((s) => s.id !== item.id);
      }
      // Add new seat with selected = true
      return [...prev, { ...item, selected: true }];
    });
  };

  const handleBook = () => {
    if (selectedSeat.length === 0) return;
    alert(`You booked ${selectedSeat.length} seats successfully!`);
    setSelectedSeat([]);
  };

  const renderSeatSection = (
    seatRow: ISeatProps[],
    startIndex: number,
    endIndex: number
  ) => {
    return (
      <div className="flex m-2 gap-2">
        {seatRow.slice(startIndex, endIndex).map((item, index) => (
          <button
            disabled={item.status === "booked"}
            className={getClassNames(item, selectedSeat)}
            onClick={() => handleSeatSelect(item)}
          >
            {startIndex + index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto overflow-x-scroll flex flex-col gap-6 justify-between  sm:col-span-2 bg-[#262626] p-8 rounded-xl border border-[#343434]">
      {/* seat map */}
      <div>
        {initialseat.map((row, rowIndex) => (
          <div className="flex justify-between">
            <span className="text-white m-6">
              {String.fromCharCode(65 + rowIndex)}
            </span>
            {renderSeatSection(row, 0, aislePosition)}
            <div className="w-20"></div>
            {renderSeatSection(row, aislePosition, seatPerRow)}
          </div>
        ))}
      </div>
      {/* legend */}
      <div className="flex justify-start sm:justify-center gap-4 sm:gap-12 text-white items-center w-full">
        {seats.reverse().map((item) => (
          <div key={item.type} className="flex-none flex gap-2 items-center">
            <p className={cn("rounded-t-xl w-6 h-6", colors[item.type])}></p>
            <p className="capitalize">
              {item.type} ({item.price} {currency})
            </p>
          </div>
        ))}
        {["booked", "selected"].map((item: string,index:number) => (
          <div key={index} className="flex-none flex gap-2 items-center">
            <p className={cn("rounded-t-xl w-6 h-6",colors[item])}></p>
          </div>
        ))}
      </div>
      {/* booking summary */}
      <div className="flex flex-col justify-start items-start">
        <p className="text-white text-lg">Booking Summary</p>
        {selectedSeat.length > 0 ? (
          <div className="text-white text-base">
            You selected :
            {selectedSeat.map((item) => (
              <span className="font-medium">{` ${item.id}, `}</span>
            ))}
            <br />
            Total price :{" "}
            <span className="font-medium">
              {selectedSeat
                .map((item) => item.price)
                .reduce((item, currentitem) => item + currentitem, 0)}
              {" " + currency}
            </span>
          </div>
        ) : (
          <button className="text-white text-base">No Seat Selected</button>
        )}
      </div>
      {/* BookButton */}
      <div>
        <button
          disabled={selectedSeat.length === 0}
          className=" w-full h-[42px] rounded-full px-8 py-4 flex justify-center items-center bg-green-600 border-2 border-green-800 text-white disabled:bg-gray-400 disabled:border-2 disabled:border-gray-600"
          onClick={handleBook}
        >
          {selectedSeat.length === 0
            ? "Please select seats"
            : `You Selectd ${selectedSeat.length} seats - (${selectedSeat
                .map((item) => item.price)
                .reduce((item, currentitem) => item + currentitem, 0)}${
                " " + currency
              })`}
        </button>
      </div>
    </div>
  );
};

export default CinemaHallContainer;
