"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CineHallProps {
  rows?: number;
  seatPerRow?: number;
  aislePosition?: number;
  seats?: {
    type: string;
    price: number;
    seat: number[];
  }[];
  bookedSeat?: number[];
  currency?: string;
}

const CinemaHallContainer = ({
  aislePosition = 5,
  bookedSeat = [1, 2, 3, 4,10,20,30,24],
  currency = "$",
  rows = 8,
  seatPerRow = 12,
  seats = [
    {
      type: "Regular",
      price: 500,
      seat: [1, 2, 4,10],
    },
    {
        type:"VIP",
        price:900,
        seat:[11,7,10]
    }
  ],
}: CineHallProps) => {
  return (
    <div className="max-w-[1000px] flex gap-6 justify-between items-center sm:col-span-2 bg-[#262626] p-8 rounded-xl border border-[#343434]">
      <div className="grid grid-cols-6 grid-rows-8 gap-4">
        {[...Array(rows/2 * seatPerRow)].map((item,index:number) => (
          <button className={cn("size-12 bg-blue-200  font-medium text-blue-600",bookedSeat.includes(index+1)? "bg-green-600 text-[10px] text-white rounded-t-xl":" rounded-t-xl text-[10px]")}>{index+1}</button>
        ))}
      </div>
      <div className="hidden sm:grid grid-cols-6 grid-rows-8 gap-4">
        {[...Array(rows/2 * seatPerRow)].map((item,index:number) => (
          <button className={cn("size-12 bg-blue-100  font-medium text-blue-600",bookedSeat.includes(index+1)? "bg-green-600  text-white text-[10px] rounded-t-xl":"rounded-t-xl text-[10px]")}>{index+1}</button>
        ))}
      </div>
    </div>
  );
};

export default CinemaHallContainer;
