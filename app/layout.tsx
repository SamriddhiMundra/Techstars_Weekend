import "./globals.css";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { siteConfig } from "@/config/site";
import { NavbarAction } from "@/components/NavbarActions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Provider from "@/app/Provider";
import { Metadata } from "next";
import { Footer } from "@/components/landingPage/Footer";
import { Card } from "@/components/ui/card";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startup Weekend Varanasi",
  description:
    "Join us for the Google Startup Week in IIT BHU on 8th August 2023. Explore innovation, entrepreneurship, and technology in Varanasi.",
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
    "8 Aug 2023",
    "Tech innovation",
    "Business networking",
    "Startup culture",
    "Technology trends",
    "Entrepreneurship summit",
    "IIT BHU event",
    "Startup showcase",
    "Technology exhibition",
    "Digital marketing",
    "Tech entrepreneurship",
    "Innovation in business",
    "Entrepreneurial ecosystem",
    "IIT BHU campus",
    "Industry experts",
    "Startup funding",
    "Business pitch competition",
    "Emerging technologies",
    "Tech talks",
    "Career opportunities",
    "Business mentorship",
    "Startup success stories",
    "IIT BHU alumni",
    "Women entrepreneurs",
    "Youth entrepreneurship",
    "Startup workshops",
    "Startup pitches",
    "Venture capital",
    "Product development",
    "Startup ecosystem",
    "Business growth",
    "Entrepreneurial skills",
    "Idea validation",
    "Innovative solutions",
    "Tech industry",
    "Startup challenges",
    "Entrepreneurial networking",
    "Business strategy",
    "IIT BHU startups",
    "Tech entrepreneurship",
    "Startup resources",
    "Digital innovation",
    "Startup acceleration",
    "IIT BHU tech community",
    "Tech startups showcase",
    "Startup mentorship",
    "Google event registration",
    "Technology in India",
    "IIT BHU entrepreneurship",
    "Startup funding opportunities",
    "Tech trends in 2023",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <header className="container z-40 bg-background -mb-2.5 overflow-hidden mt-1 border rounded-lg shadow">
            <div className="flex h-20 items-center justify-between ">
              <MainNav items={siteConfig.mainNav} />
              <nav className="flex align-middle"></nav>
              <NavbarAction />
            </div>
          </header>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <footer>
            <Footer />
          </footer>
        </Provider>
      </body>
    </html>
  );
}
