"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function MainPage() {
  const [stamps, setStamps] = useState(
    Array.from({ length: 7 }, (_, i) => ({ id: i + 1, image: null }))
  );

  const groupLinks = {
    1: "https://www.youtube.com",
    2: "https://www.tiktok.com",
    3: "https://www.tiktok.com",
    4: "https://www.youtube.com",
    5: "https://www.youtube.com",
    6: "https://www.youtube.com",
    7: "https://www.youtube.com",
  };

  const prevClaimedCount = useRef(0);
  const stampRefs = useRef([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("stamps");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setStamps(parsed);
      } catch {}
    }
  }, []);

  const playGrandConfetti = () => {
    const colors = ["#22c55e", "#3b82f6", "#facc15", "#f87171", "#a78bfa", "#f472b6", "#ec4899"];
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, colors });
    setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.3, y: 0.6 }, colors }), 300);
    setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { x: 0.7, y: 0.6 }, colors }), 700);
    setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors }), 1100);
  };

  useEffect(() => {
    const claimedCount = stamps.filter((s) => s.image).length;

    // Scroll to the newly claimed stamp
    if (claimedCount > prevClaimedCount.current) {
      const lastClaimed = stamps
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.image)
        .at(-1);

      if (lastClaimed && stampRefs.current[lastClaimed.i]) {
        stampRefs.current[lastClaimed.i].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    // Only trigger grand confetti the first time all stamps are collected
    const grandPlayed = window.localStorage.getItem("grandConfettiPlayed");
    if (claimedCount === 7 && prevClaimedCount.current < 7 && !grandPlayed) {
      playGrandConfetti();
      window.localStorage.setItem("grandConfettiPlayed", "true");
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 600);
    }

    prevClaimedCount.current = claimedCount;
  }, [stamps]);

  const allClaimed = stamps.every((s) => s.image);

  return (
    <div className="w-screen min-h-[100dvh] bg-black flex flex-col items-center px-4 pt-6 pb-6 text-white">
      {/* Top */}
      <div className="flex items-center justify-center w-full max-w-md mb-4">
        <img src="/itc.png" className="h-16 w-16 rounded-xl object-cover" />
        <div className="ml-3 text-center">
          <div className="text-2xl font-extrabold leading-tight text-red-600">
            ITC Project Showcase
          </div>
          <div className="text-2xl font-extrabold leading-tight text-red-600">
            Stamp Card
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="bg-neutral-900 rounded-2xl w-full max-w-md p-4">
        <div className="grid grid-cols-2 gap-3 place-items-center">
          {stamps.map((stamp, i) => {
            const isClaimed = !!stamp.image;
            return (
              <div
                key={stamp.id}
                ref={(el) => (stampRefs.current[i] = el)}
                className={stamp.id === 7 ? "col-span-2 flex justify-center" : "flex justify-center"}
              >
                <Link
                  href={isClaimed ? groupLinks[stamp.id] : "#"}
                  target={isClaimed ? "_blank" : undefined}
                  rel={isClaimed ? "noopener noreferrer" : undefined}
                  className="w-[28vw] max-w-[120px] aspect-square rounded-full bg-gray-400 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                >
                  {isClaimed ? (
                    <img src={stamp.image} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-xl">{stamp.id}</span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div
        ref={bottomRef}
        className={`text-center leading-snug text-lg mt-6 font-bold ${
          allClaimed ? "text-green-500" : "text-white"
        }`}
      >
        Unlock 5 stamps → Go to Exco table
        <br />
        → <span className="font-extrabold">Free Popcorn + Lucky Draw!</span>
      </div>
    </div>
  );
}
