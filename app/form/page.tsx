"use client"
import React from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import {FormComponent}from "@/components/Form";
import {Skeleton} from "@/components/ui/skeleton";


export default function Home() {
    const { data: session, status } = useSession();
    const route = useRouter()
    React.useEffect(()=>{
       if(!session) {
           route.push("/api/login")
       }
    },[session])
    return (
        <div className="flex min-h-screen flex-col items-center justify-between  scroll-smooth transition duration-1000">
            {session?<FormComponent/>:<div className="flex flex-col justify-center h-screen items-center space-x-4">
                <Skeleton className="h-8 w-[300px]" />
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>}
        </div>
    );
}
