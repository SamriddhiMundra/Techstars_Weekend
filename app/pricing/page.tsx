"use client";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import PricingCard from "@/components/PricingCard";
import { Skeleton } from "@/components/ui/skeleton";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const Pricing = () => {
  const [prices, setPrices] = useState([]);
    const route = useRouter()

    const { data: session } = useSession();


  useEffect(() => {
      if(session){
          fetchPrices();
      }
      else{
          route.push("/api/login")
      }
  }, [session]);

  

    const fetchPrices = async () => {
        const {data} = await axios.get('https://www.startupweekendvaranasi.com/api/getProducts')

        setPrices(data)
    }

  return (
    <section className="w-full">
        {session? prices.length>0?<>
        <div className="mx-auto max-w-4xl text-center mt-10 items-center">
            <h2 className="text-3xl font-bold leading-7 text-green-500">
               Get Ticket
            </h2>
            {/*<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">*/}
            {/*    Choose the right option for you!*/}
            {/*</p>*/}
            {/*<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">*/}
            {/*    Check out all the information below*/}
            {/*</p>*/}
        </div>
        <div className="flex flex-wrap justify-center gap-8 max-w-[1040px] items-center mx-auto">
    {prices &&
        prices.map((price) => (
        //@ts-ignore
        <PricingCard price={price} key={price.id}/>
  )
)}
</div></>:<div className="flex flex-col justify-center h-screen items-center space-x-4">
            <Skeleton className="h-8 w-[300px]" />
            <div className="space-y-2 mt-2">
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[200px]" />
            </div>
        </div>:<div><div className="flex flex-col justify-center h-screen items-center space-x-4">
            <Skeleton className="h-4 w-[300px]" />
            <div className="space-y-2 mt-8">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div></div>}
    </section>
  );
};

export default Pricing;
