"use client"
import React, { useEffect, useLayoutEffect, useState } from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import FormComponent from "@/components/Form";
import {Skeleton} from "@/components/ui/skeleton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";


export default function Home() {
    const { data: session, status } = useSession();
    const [userId,setUserId] =useState<string>("");
    const route = useRouter()
    useLayoutEffect(()=>{
       if(!session) {
           route.push("/api/login")
       }
    },[session])
    useEffect(()=>{
        const fetcher = async ()=>{
            const  q= query(collection(db,"users"),where("email","==","shivanshu264@gmail.com"));
             const querySnapshot = await getDocs(q);
             console.log(querySnapshot.docs[0].data(),"qtt")
             setUserId(querySnapshot.docs[0].id)
        }
        fetcher();
    },[session])
    return (
        <div className="flex min-h-screen flex-col items-center justify-between  scroll-smooth transition duration-1000">
            {session?<FormComponent userId={userId}/>:<div className="flex flex-col justify-center h-screen items-center space-x-4">
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
