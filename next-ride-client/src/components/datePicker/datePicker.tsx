"use client";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

export default function DatePicker() {
  const [date, setDate] = useState("");

  return (
    <div className="relative w-full max-w-sm">
      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border border-gray-500 bg-transparent p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
      />

      {/* Calendar Icon */}
      <CalendarIcon className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
    </div>
  );
}
