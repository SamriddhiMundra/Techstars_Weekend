import HomeClient from "@/components/landingPage/HomeClient";
import { Metadata } from "next";

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
  ],
};

export default function Home() {
  return <HomeClient />;
}
