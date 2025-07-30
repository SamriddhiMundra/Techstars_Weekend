"use client";

import Hero from "@/components/landingPage/Hero";
import WhyStartupWeekend from "@/components/landingPage/WhyStartupWeekend";
import Mentors from "@/components/landingPage/Mentor";
import { Sponsor } from "@/components/landingPage/sponsor";
import { Judges } from "@/components/landingPage/judges";
import Testimonials from "@/components/landingPage/Testimonials";
import { useSession } from "next-auth/react";

export default function HomeClient() {
  const { data: session, status } = useSession();

  // Optional loading spinner
  // if (status === "loading") {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <img src="/assets/loading.gif" alt="Loading" width={100} height={100} />
  //     </div>
  //   );
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 scroll-smooth transition duration-1000">
      <Hero />
      <WhyStartupWeekend />
      <Sponsor />
      <Mentors />
      <Judges />
      <Testimonials />
    </main>
  );
}
