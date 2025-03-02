"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const topCompanies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2880px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2880px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1280px-Apple_logo_black.svg.png" },
];

const moreCompanies = [
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2880px-Uber_logo_2018.svg.png" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2880px-Airbnb_Logo_B%C3%A9lo.svg.png" },
  { name: "Twitter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2880px-Logo_of_Twitter.svg.png" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2880px-LinkedIn_Logo.svg.png" },
];

export function CompanyScroll() {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const moreScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElements = [
      { ref: topScrollRef.current, speed: 30 },
      { ref: moreScrollRef.current, speed: 40 },
    ];

    const intervals = scrollElements.map(({ ref, speed }) => {
      if (!ref) return;

      return setInterval(() => {
        if (ref.scrollLeft >= ref.scrollWidth / 2) {
          ref.scrollLeft = 0;
        } else {
          ref.scrollLeft += 1;
        }
      }, speed);
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, []);

  const CompanyRow = ({ companies, scrollRef }: { companies: typeof topCompanies, scrollRef: React.RefObject<HTMLDivElement> }) => (
    <div
      ref={scrollRef}
      className="flex space-x-16 overflow-x-hidden whitespace-nowrap py-6 bg-white/50 rounded-lg"
    >
      {[...companies, ...companies].map((company, index) => (
        <div
          key={`${company.name}-${index}`}
          className="flex items-center justify-center min-w-[180px] h-16 opacity-80 hover:opacity-100 transition-opacity"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={140}
            height={50}
            className="object-contain max-h-12"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-16 bg-background/50">
      <div className="container mx-auto px-8">
        <h2 className="text-2xl font-bold text-center mb-12">
          Trusted by professionals from leading companies
        </h2>
        <div className="space-y-8">
          <CompanyRow companies={topCompanies} scrollRef={topScrollRef} />
          <CompanyRow companies={moreCompanies} scrollRef={moreScrollRef} />
        </div>
      </div>
    </div>
  );
}