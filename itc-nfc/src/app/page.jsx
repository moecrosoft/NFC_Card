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

  useEffect(() => {
    const stored = window.localStorage.getItem("stamps");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setStamps(parsed);
      } catch {
        console.error("Invalid stamps in localStorage");
      }
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
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.3, y: 0.6 }, colors }), 300);
    setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: 0.7, y: 0.6 }, colors }), 600);
    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.6 }, colors }), 900);
  };

  const allClaimed = stamps.every((s) => s.image);

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col justify-between items-center px-4 pt-6 pb-6 text-white">

      {/* Top Text & Logo */}
      <div className="flex items-center justify-center w-full max-w-md mt-6 sm:mt-0 mb-4">
        <img
          src="/itc.png"
          alt="ITC Logo"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover border-2"
        />
        <div className="flex flex-col justify-center ml-3">
          <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-red-600">
            ITC Project Showcase
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold leading-tight text-red-600 text-center mt-0.5">
            Stamp Card
          </div>
        </div>
      </div>

      {/* Stamp Card Container */}
      <div className="bg-neutral-900 rounded-2xl w-full max-w-md flex flex-col items-center p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 w-full place-items-center">
          {stamps.map((stamp) => {
            const isClaimed = !!stamp.image;
            const circleSizeClass = "w-[120px] sm:w-[135px] aspect-square";

            const stampCircle = (
              <div className={`rounded-full flex items-center justify-center overflow-hidden bg-gray-400 cursor-pointer hover:scale-105 transition-transform ${circleSizeClass}`}>
                {isClaimed ? (
                  <img src={stamp.image} alt={`Stamp ${stamp.id}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-lg sm:text-2xl">{stamp.id}</span>
                )}
              </div>
            );

            return (
              <div key={stamp.id} className={`flex items-center justify-center ${stamp.id === 7 ? "col-span-2" : ""}`}>
                {isClaimed ? (
                  <Link href={groupLinks[stamp.id]} target="_blank" rel="noopener noreferrer">
                    {stampCircle}
                  </Link>
                ) : (
                  stampCircle
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Text */}
      <div className={`text-center leading-snug text-lg sm:text-xl mt-4 mb-6 sm:mt-4 sm:mb-0 font-bold ${allClaimed ? "text-green-500" : "text-white"}`}>
        <span>Unlock 5 stamps → Go to Exco table</span>
        <br />
        <span>
          → <span className="font-extrabold">Free Popcorn + Lucky Draw!</span>
        </span>
      </div>

    </div>
  );
}
