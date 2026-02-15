'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function App() {
    // Stamps data - you can add src property to display actual stamp images

    let stampss = localStorage.getItem("stamps")

    if (!stampss){
        stampss = [
            { id: 1, src: null },
            { id: 2, src: null },
            { id: 3, src: null },
            { id: 4, src: null },
            { id: 5, src: null },
            { id: 6, src: null },
            { id: 7, src: null },
        ];
    }

    for (let index = 0; index < stampss.length; index++) {
      const element = stampss[index];
      

    }

    const stamps = [
            { id: 1, src: null },
            { id: 2, src: null },
            { id: 3, src: null },
            { id: 4, src: null },
            { id: 5, src: null },
            { id: 6, src: null },
            { id: 7, src: null },
        ];

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Title */}
                <h1 className="text-center mb-8">
                    <div className="text-3xl font-bold leading-tight">ITC Project Showcase</div>
                    <div className="text-3xl font-bold leading-tight">Stamp Card</div>
                </h1>

                {/* Stamp Card Container */}
                <div className="bg-neutral-200 rounded-3xl p-8 mb-6">
                    {/* Stamps Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {stamps.map((stamp) => (
                            <div
                                key={stamp.id}
                                className={`
                                  aspect-square rounded-full flex items-center justify-center
                                  ${stamp.id === 7 ? 'col-span-2 mx-auto w-1/2' : ''}
                                `}
                            >
                              {stamp.src ? (
                                <img
                                  src={stamp.src}
                                  alt={`Stamp ${stamp.id}`}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-full h-full bg-neutral-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-5xl font-bold">{stamp.id}</span>
                                </div>
                              )}
                            </div>
                          ))}
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-center text-lg leading-relaxed">
                    <span>Unlock 5 stamps → Go to Exco table</span>
                    <br />
                    <span>→ <span className="font-bold">Free Popcorn + Lucky Draw!</span></span>
                </div>
            </div>
        </div>
  );
}
