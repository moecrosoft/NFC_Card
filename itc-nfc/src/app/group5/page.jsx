"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function GroupPage() {
  const router = useRouter();
  const [claimed, setClaimed] = useState(false);

  const groupId = 5; // change for each group (1-7)
  const groupImage = `/stamps/${groupId}.png`;

  // Confetti colors for each group
  const confettiColors = {
    1: ["#22c55e", "#bef264"], // green
    2: ["#3b82f6", "#60a5fa"], // blue
    3: ["#facc15", "#fde68a"], // yellow
    4: ["#f87171", "#fca5a5"], // red/pink
    5: ["#a78bfa", "#c4b5fd"], // purple
    6: ["#f472b6", "#f9a8d4"], // pink
    7: ["#ec4899", "#f43f5e"], // magenta
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

    // Trigger confetti for this group
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors[groupId] || ["#ffffff"],
      shapes: ["circle", "square"],
    });

    // Redirect after short delay
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-12 text-red-600">
          You received Group {groupId} <br /> Stamp!
        </h1>

        {/* Circle with stamp image */}
        <div className="w-48 h-48 rounded-full overflow-hidden mb-12 bg-gray-700">
          <img
            src={groupImage}
            alt={`Stamp ${groupId}`}
            className="w-full h-full object-cover"
          />
        </div>

        {!claimed ? (
          <button
            onClick={handleClaim}
            className="bg-red-600 hover:bg-red-700 text-black text-2xl font-bold py-4 px-16 rounded-2xl transition-colors cursor-pointer"
          >
            CLAIM
          </button>
        ) : (
          <p className="text-red-600 font-bold text-2xl">Stamp Claimed!</p>
        )}
      </div>
    </div>
  );
}