"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2880px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2880px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1280px-Apple_logo_black.svg.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png" },
  { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2880px-Uber_logo_2018.svg.png" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2880px-Airbnb_Logo_B%C3%A9lo.svg.png" },
  { name: "Twitter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2880px-Logo_of_Twitter.svg.png" },
  { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2880px-LinkedIn_Logo.svg.png" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2880px-Salesforce.com_logo.svg.png" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/2880px-Adobe_Corporate_Logo.svg.png" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/2880px-Intel_logo_%282006-2020%29.svg.png" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2880px-IBM_logo.svg.png" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2880px-Oracle_logo.svg.png" }
];

export function CompaniesGrid() {
  return (
    <div className="py-16 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Trusted by professionals from leading companies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {companies.map((company) => (
            <Card key={company.name} className="p-6 flex items-center justify-center hover:shadow-lg transition-shadow bg-white">
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
                className="object-contain h-8 md:h-10"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}