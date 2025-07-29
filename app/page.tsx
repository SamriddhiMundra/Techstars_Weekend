"use client";

import Hero from "@/components/landingPage/Hero";
import WhyStartupWeekend from "@/components/landingPage/WhyStartupWeekend";
import Mentors from "@/components/landingPage/Mentor";
import { Sponsor } from "@/components/landingPage/sponsor";
import { Judges } from "@/components/landingPage/judges";
import Testimonials  from "@/components/landingPage/Testimonials";
import React, { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/lib/firebaseStore";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  // if (status === "loading")
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       <img
  //         src="/assets/loading.gif"
  //         alt="Example GIF"
  //         width={100}
  //         height={100}
  //       />
  //     </div>
  //   );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 scroll-smooth transition duration-1000">
      <Hero />
      <WhyStartupWeekend />
      <Sponsor />
      <Mentors />
      <Judges></Judges>
      <Testimonials />
    </main>
  );
}
