import Hero from "@/components/landingPage/Hero";
import WhyStartupWeekend from "@/components/landingPage/WhyStartupWeekend";
import  Mentors  from "@/components/landingPage/Mentor";
import { Sponsor } from "@/components/landingPage/sponsor";
import { Judges } from "@/components/landingPage/judges";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/lib/firebaseStore";
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


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 scroll-smooth transition duration-1000">
      <Hero />
      <WhyStartupWeekend />
      <Sponsor />
      <Mentors/>
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
