import Hero from "@/components/landingPage/Hero";
import WhyStartupWeekend from "@/components/landingPage/WhyStartupWeekend";

import { Sponsor } from "@/components/landingPage/sponsor";
import { Judges } from "@/components/landingPage/judges";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Techstar from "@/components/Techstar";
import Mentors from "@/components/landingPage/Mentor";
export interface Album {
  name: string;
  artist: string;
  cover: string;
}
export const metadata: Metadata = {
  title: "Startup Weekend Varanasi",
  description: "Google Startup Week in IIT BHU -8 Aug 2023",
  keywords: [
    "Google Startup Week in IIT BHU",
    "gsw varanasi",
    "gsw iit bhu",
    "Google Startup Week",
    "IIT BHU Varanasi",
    "Startup events in India",
    "Entrepreneurship programs",
    "Google events and workshops",
    "Technology startup conferences",
    "Startup community in Varanasi",
    "IIT BHU tech events",
    "Networking for startups",
    "",
  ],
};

const listenNowAlbums: Album[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 scroll-smooth transition duration-1000">
      <Hero />
      <WhyStartupWeekend />
      <Sponsor />
<<<<<<< HEAD
      <Mentors />
=======
      <Judges></Judges>
     
>>>>>>> 894c28695f6c4fc5a53eb11d1850c6532296eb9e
      {/*<Techstar />*/}
      {/*<h1 className="m-4 text-4xl  font-medium tracking-tight leading-none text-gray-900 md:text-3xl lg:text-6xl dark:text-white">*/}
      {/*    Meet Our Mentor*/}
      {/*</h1>*/}
      {/*<div className="flex flex-wrap justify-center space-x-4 pb-4" >*/}
      {/*    {listenNowAlbums.map((album) => (*/}
      {/*        <Mentor*/}
      {/*            key={album.name}*/}
      {/*            album={album}*/}
      {/*            className="w-[300px] m-4 transition ease-in-out"*/}
      {/*            aspectRatio="portrait"*/}
      {/*            width={300}*/}
      {/*            height={300}*/}
      {/*        />*/}
      {/*    ))}*/}
      {/*</div>*/}
    </main>
  );
}
