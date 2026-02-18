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

  // Lock scrolling
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
    <div className="w-screen h-screen bg-black flex justify-start items-center">

      {/* Scaling wrapper to shrink content proportionally and align near top */}
      <div
        className="w-full max-w-md flex flex-col justify-between items-center px-4 pt-6 pb-4"
        style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}
      >

        {/* Top Text & Logo */}
        <div className="flex items-center justify-center w-full mb-6">
          <img
            src="/itc.png"
            alt="ITC Logo"
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div className="flex flex-col justify-center ml-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-red-600">
              ITC Project Showcase
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-red-600 mt-0.5">
              Stamp Card
            </div>
          </div>
        </div>

        {/* Stamp Card Container */}
        <div className="bg-neutral-900 rounded-2xl w-full flex flex-col items-center p-5">
          <div className="grid grid-cols-2 gap-3 w-full place-items-center">
            {stamps.map((stamp) => {
              const isClaimed = !!stamp.image;
              const sizeClass = "w-[120px] sm:w-[135px] aspect-square";

              const circle = (
                <div
                  className={`rounded-full flex items-center justify-center overflow-hidden bg-gray-400 cursor-pointer hover:scale-105 transition-transform ${sizeClass}`}
                >
                  {isClaimed ? (
                    <img src={stamp.image} alt={`Stamp ${stamp.id}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-xl sm:text-2xl">{stamp.id}</span>
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

        {/* Bottom Text */}
        <div
          className={`text-center leading-snug text-lg sm:text-xl mt-4 mb-4 font-bold ${
            allClaimed ? "text-green-500" : "text-white"
          }`}
        >
          Unlock 5 stamps → Go to Exco table
          <br />
          → <span className="font-extrabold">Free Popcorn + Lucky Draw!</span>
        </div>

      </div>
    </div>
  );
}
