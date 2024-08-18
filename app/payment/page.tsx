"use client";
import React, { FunctionComponent, Suspense ,useState,useEffect, useLayoutEffect} from "react";
interface OwnProps {}
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";

type Props = OwnProps;

 const Payment: FunctionComponent<Props> = (props) => {
     const { data: session } = useSession();
     const [user,setUser]=useState({})
     const route = useRouter()

     useLayoutEffect(() => {
         if(!session){
             route.push("/api/login")
         }
     }, [session]);
     useEffect(()=>{
        const fetcher = async ()=>{
            const  q= query(collection(db,"users"),where("email","==",session?.user?.email));
             const querySnapshot = await getDocs(q);
             const data=querySnapshot.docs[0].data()
             setUser(data)
             if(!data.formFilled){
                console.log("form not filled")
                route.push("/form")
             }
            
        }
        fetcher();
    },[session])
     return (
        <div className="max-w-full max-h-full p-2 my-4 mx-auto lg:mx-10">
            {session?<div>
                <iframe id="ts-iframe" 
        src={`https://www.townscript.com/v2/widget/startup-weekend-varanasi-2024-430334/booking?name=${session.user?.name}&emailid=${session.user?.email}&confirmemailid=${session.user?.email}&contact=1234567890&college=XYZUniversity&linkedin=https://www.linkedin.com/in/johndoe`} 
        height="600" 
        width="80%">
</iframe>
<link rel="stylesheet" href="https://www.townscript.com/static/Bookingflow/css/ts-iframe.style.css"/>

            </div>:<div className="flex flex-col justify-center h-screen items-center space-x-4">
                <Skeleton className="h-8 w-[300px]" />
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>
                }
        </div>
    );
};
export default Payment;

