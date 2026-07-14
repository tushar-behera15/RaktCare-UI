import * as React from "react";

interface BloodDonationIllustrationProps {
  className?: string;
}

export function BloodDonationIllustration({ className }: BloodDonationIllustrationProps) {
  return (
    <svg
      viewBox="0 0 380 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Blood donation illustration"
      role="img"
    >
      {/* Background circle */}
      <circle cx="190" cy="170" r="140" fill="currentColor" fillOpacity="0.04" />

      {/* IV Bag */}
      <rect x="140" y="30" width="100" height="130" rx="14" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <rect x="152" y="46" width="76" height="100" rx="8" fill="currentColor" fillOpacity="0.12" />

      {/* Blood level in bag */}
      <rect x="152" y="96" width="76" height="50" rx="4" fill="currentColor" fillOpacity="0.55" />

      {/* Bag cap */}
      <rect x="172" y="18" width="36" height="16" rx="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* Bag hanger hole */}
      <circle cx="190" cy="14" r="5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />

      {/* IV tube */}
      <path d="M190 160 C190 200 160 210 160 240" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />

      {/* Drip chamber */}
      <rect x="150" y="238" width="20" height="28" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Continuing tube */}
      <path d="M160 266 C160 290 175 300 175 310" stroke="currentColor" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />

      {/* Needle connector */}
      <path d="M175 310 L190 310 L200 322" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Heart - large, decorative */}
      <path
        d="M260 100 C260 100 240 82 222 82 C205 82 194 96 194 110 C194 138 226 158 260 180 C294 158 326 138 326 110 C326 96 315 82 298 82 C280 82 260 100 260 100Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* Small heart left */}
      <path
        d="M80 210 C80 210 72 203 64 203 C57 203 52 208 52 214 C52 225 65 232 80 242 C95 232 108 225 108 214 C108 208 103 203 96 203 C88 203 80 210 80 210Z"
        fill="currentColor"
        fillOpacity="0.2"
      />

      {/* Blood drop 1 */}
      <path
        d="M310 210 C310 210 300 196 300 188 C300 182 304 177 310 177 C316 177 320 182 320 188 C320 196 310 210 310 210Z"
        fill="currentColor"
        fillOpacity="0.5"
      />

      {/* Blood drop 2 */}
      <path
        d="M50 140 C50 140 43 130 43 124 C43 119 46 115 50 115 C54 115 57 119 57 124 C57 130 50 140 50 140Z"
        fill="currentColor"
        fillOpacity="0.3"
      />

      {/* Blood drop 3 */}
      <path
        d="M345 170 C345 170 339 161 339 156 C339 152 341 148 345 148 C349 148 351 152 351 156 C351 161 345 170 345 170Z"
        fill="currentColor"
        fillOpacity="0.25"
      />

      {/* Pulse line */}
      <path
        d="M30 280 L75 280 L88 255 L100 305 L112 270 L126 280 L350 280"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stars / Plus signs – healthcare symbols */}
      <text x="60" y="90" fontSize="14" fill="currentColor" fillOpacity="0.2" textAnchor="middle">✚</text>
      <text x="330" y="240" fontSize="12" fill="currentColor" fillOpacity="0.2" textAnchor="middle">✚</text>
      <text x="340" y="80" fontSize="10" fill="currentColor" fillOpacity="0.15" textAnchor="middle">✦</text>
      <text x="50" y="310" fontSize="8" fill="currentColor" fillOpacity="0.15" textAnchor="middle">✦</text>
    </svg>
  );
}
