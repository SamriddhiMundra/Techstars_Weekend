import "./globals.css";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { siteConfig } from "@/config/site";
import { NavbarAction } from "@/components/NavbarActions";
import Provider from "@/app/Provider";
import { Metadata } from "next";
import { Footer } from "@/components/landingPage/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startup Weekend Varanasi",
  description:
    "Join us for the Google Startup Week in IIT BHU on 8th August 2023. Explore innovation, entrepreneurship, and technology in Varanasi.",
  keywords: [
    /* your keywords */
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
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

// import "./globals.css";
// import Provider from "./Provider";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <Provider>{children}</Provider>
//       </body>
//     </html>
//   );
// }
