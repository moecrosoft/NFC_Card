"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function GroupPage() {
  const router = useRouter();
  const [claimed, setClaimed] = useState(false);

  const groupId = 3;
  const groupImage = `/stamps/${groupId}.png`;

  const confettiColors = {
    1: ["#22c55e", "#bef264"],
    2: ["#3b82f6", "#60a5fa"],
    3: ["#facc15", "#fde68a"],
    4: ["#f87171", "#fca5a5"],
    5: ["#a78bfa", "#c4b5fd"],
    6: ["#f472b6", "#f9a8d4"],
    7: ["#ec4899", "#f43f5e"],
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("stamps");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[groupId - 1]?.image) setClaimed(true);
    }
  }, []);

  const handleClaim = () => {
    const stored = window.localStorage.getItem("stamps");
    let stamps = stored
      ? JSON.parse(stored)
      : Array.from({ length: 7 }, (_, i) => ({ id: i + 1, image: null }));

    stamps[groupId - 1] = { id: groupId, image: groupImage };
    window.localStorage.setItem("stamps", JSON.stringify(stamps));
    setClaimed(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors[groupId] || ["#ffffff"],
    });

    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center px-6 text-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-red-600 mb-6">
        You received Group {groupId}
        <br />
        Stamp!
      </h1>

      <div className="w-[45vw] max-w-[180px] aspect-square rounded-full overflow-hidden bg-gray-700 mb-6">
        <img src={groupImage} alt={`Stamp ${groupId}`} className="w-full h-full object-cover" />
      </div>

      {!claimed ? (
        <button
          onClick={handleClaim}
          className="bg-red-600 hover:bg-red-700 cursor-pointer active:scale-95 text-black text-lg sm:text-xl font-bold py-3 px-10 sm:py-4 sm:px-14 rounded-2xl transition-all"
        >
          CLAIM
        </button>
      ) : (
        <p className="text-red-600 font-bold text-xl sm:text-2xl">Stamp Claimed!</p>
      )}
    </div>
  );
}
