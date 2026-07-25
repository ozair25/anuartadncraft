"use client"

import { useState } from "react"
import Link from "next/link"

const CLOUDINARY_LEFT = "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784923409/left_fjows4.png"
const CLOUDINARY_RIGHT = "https://res.cloudinary.com/dtrvyelcg/image/upload/v1784923405/right_d12jcm.png"

export function Inspiration() {
  const [leftImgSrc, setLeftImgSrc] = useState(CLOUDINARY_LEFT)
  const [rightImgSrc, setRightImgSrc] = useState(CLOUDINARY_RIGHT)
  const [leftFailed, setLeftFailed] = useState(false)
  const [rightFailed, setRightFailed] = useState(false)

  const handleLeftError = () => {
    if (!leftFailed) {
      setLeftFailed(true)
      setLeftImgSrc("/images/inspiration-left.png")
    }
  }

  const handleRightError = () => {
    if (!rightFailed) {
      setRightFailed(true)
      setRightImgSrc("/images/inspiration-right.png")
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#e0d0b8] border-b border-[#cca97f]/30">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">
          {/* Left Column: Photographer & Perspective Ray Pool Collage with Callout Labels */}
          <div className="relative w-full h-[420px] sm:h-[500px] md:h-[540px] lg:h-auto lg:min-h-[580px] overflow-hidden bg-[#ebd8c1] border-b lg:border-b-0 lg:border-r border-[#d8c3a9]">
            <img
              src={leftImgSrc}
              onError={handleLeftError}
              alt="Our Inspiration - Photographer and Perspective Ray Pool Collage"
              className="h-full w-full object-cover object-left -ml-[15px]"
              referrerPolicy="no-referrer"
              decoding="async"
            />

            {/* SVG Callout Lines & Badges - Locked to 1756x896 image coordinates */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full z-10"
              viewBox="0 0 1756 896"
              preserveAspectRatio="xMinYMid slice"
            >
              {/* Anu Callout */}
              <line
                x1="245"
                y1="149"
                x2="320"
                y2="270"
                stroke="#1f1c19"
                strokeWidth="3"
              />
              <circle cx="320" cy="270" r="5" fill="#1f1c19" />
              <rect
                x="180"
                y="105"
                width="130"
                height="44"
                rx="4"
                fill="#24211e"
                stroke="#3d3732"
                strokeWidth="2"
              />
              <text
                x="245"
                y="133"
                textAnchor="middle"
                fill="#fdfbf7"
                fontSize="20"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1"
              >
                Anu
              </text>

              {/* Arts Callout */}
              <line
                x1="570"
                y1="109"
                x2="570"
                y2="230"
                stroke="#1f1c19"
                strokeWidth="3"
              />
              <circle cx="570" cy="230" r="5" fill="#1f1c19" />
              <rect
                x="505"
                y="65"
                width="130"
                height="44"
                rx="4"
                fill="#24211e"
                stroke="#3d3732"
                strokeWidth="2"
              />
              <text
                x="570"
                y="93"
                textAnchor="middle"
                fill="#fdfbf7"
                fontSize="20"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1"
              >
                Arts
              </text>

              {/* Crafts Callout */}
              <line
                x1="860"
                y1="159"
                x2="810"
                y2="280"
                stroke="#1f1c19"
                strokeWidth="3"
              />
              <circle cx="810" cy="280" r="5" fill="#1f1c19" />
              <rect
                x="795"
                y="115"
                width="130"
                height="44"
                rx="4"
                fill="#24211e"
                stroke="#3d3732"
                strokeWidth="2"
              />
              <text
                x="860"
                y="143"
                textAnchor="middle"
                fill="#fdfbf7"
                fontSize="20"
                fontFamily="serif"
                fontStyle="italic"
                letterSpacing="1"
              >
                Crafts
              </text>
            </svg>
          </div>

          {/* Right Column: Inspiration Copy, Pen Nib Art & Red Brushstroke Button */}
          <div className="relative w-full h-[420px] sm:h-[500px] md:h-[540px] lg:h-auto lg:min-h-[580px] overflow-hidden bg-[#ebd8c1]">
            <img
              src={rightImgSrc}
              onError={handleRightError}
              alt="Our Inspiration - Passion. Creativity. Community."
              className="h-full w-full object-cover object-[5%_center] sm:object-left -ml-[15px]"
              referrerPolicy="no-referrer"
              decoding="async"
            />

            {/* SVG Hotspot for "KNOW OUR STORY" Brush Button - Locked to 1535x1024 coordinates */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full z-10"
              viewBox="0 0 1535 1024"
              preserveAspectRatio="xMinYMid slice"
            >
              <foreignObject x="80" y="820" width="510" height="150" className="pointer-events-auto">
                <Link
                  href="/about"
                  className="block h-full w-full rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-700/50"
                  aria-label="Know Our Story - Learn more about Anu Arts"
                />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}


