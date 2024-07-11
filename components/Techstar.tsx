import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import techstarsLogo from "@/public/Techstars_Logo_Primary_Black.png";
import React from "react";

export default function Techstar() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="border m-2 flex justify-center items-center h-40 rounded-lg p-2 shadow">
        <Link
          target={"_blank"}
          href={"https://www.techstars.com/"}
          className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
        >
          <Image
            src={techstarsLogo}
            alt={"Techstars Logo"}
            height={400}
            width={300}
          />
        </Link>
      </div>
    </section>
  );
}
