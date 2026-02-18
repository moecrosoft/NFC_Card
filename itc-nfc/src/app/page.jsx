"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function MainPage() {
  const [stamps, setStamps] = useState(
    Array.from({ length: 7 }, (_, i) => ({ id: i + 1, image: null }))
  );

  const groupLinks = {
    1: "https://www.youtube.com",
    2: "https://www.tiktok.com",
    3: "https://group3-website.com",
    4: "https://group4-website.com",
    5: "https://group5-website.com",
    6: "https://group6-website.com",
    7: "https://group7-website.com",
  };

  const prevClaimedCount = useRef(null);

  // Prevent scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("stamps");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setStamps(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const claimedCount = stamps.filter((s) => s.image).length;
    const confettiPlayed = window.localStorage.getItem("grandConfettiPlayed");

    if (prevClaimedCount.current === null) {
      prevClaimedCount.current = claimedCount;
      return;
    }

    if (claimedCount === 7 && prevClaimedCount.current < 7 && !confettiPlayed) {
      triggerGrandConfetti();
      window.localStorage.setItem("grandConfettiPlayed", "true");
    }

    prevClaimedCount.current = claimedCount;
  }, [stamps]);

  const triggerGrandConfetti = () => {
    const colors = ["#22c55e", "#3b82f6", "#facc15", "#f87171", "#a78bfa", "#f472b6", "#ec4899"];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
  };

  const allClaimed = stamps.every((s) => s.image);

  return (
    <div className="flex-center-column">

      {/* Top */}
      <div className="flex items-center justify-center w-full max-w-md mt-4 mb-2">
        <img
          src="/itc.png"
          alt="ITC Logo"
          className="h-16 w-16 sm:h-14 sm:w-14 rounded-lg object-cover border-2"
        />
        <div className="ml-3 text-center">
          <div className="text-3xl sm:text-2xl font-extrabold leading-tight text-red-600">
            ITC Project Showcase
          </div>
          <div className="text-3xl sm:text-2xl font-extrabold leading-tight text-red-600 mt-1">
            Stamp Card
          </div>
        </div>
      </div>

      {/* Middle Card */}
      <div className="bg-neutral-900 rounded-2xl w-full max-w-md flex flex-col items-center px-4 py-4 sm:px-5 sm:py-5">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full place-items-center">
          {stamps.map((stamp) => {
            const isClaimed = !!stamp.image;
            const size = "w-[120px] sm:w-[135px] aspect-square";

            const circle = (
              <div className={`rounded-full flex items-center justify-center overflow-hidden bg-gray-400 transition-transform hover:scale-105 ${size}`}>
                {isClaimed ? (
                  <img src={stamp.image} alt={`Stamp ${stamp.id}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-2xl sm:text-xl">{stamp.id}</span>
                )}
              </div>
            );

            return (
              <div key={stamp.id} className={stamp.id === 7 ? "col-span-2" : ""}>
                {isClaimed ? (
                  <Link href={groupLinks[stamp.id]} target="_blank" rel="noopener noreferrer">
                    {circle}
                  </Link>
                ) : (
                  circle
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className={`text-center leading-snug text-xl sm:text-lg mt-2 mb-4 font-bold ${allClaimed ? "text-green-500" : "text-white"}`}>
        Unlock 5 stamps → Go to Exco table
        <br />
        → <span className="font-extrabold">Free Popcorn + Lucky Draw!</span>
      </div>

    </div>
  );
}
