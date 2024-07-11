"use client";
import React, { FunctionComponent, Suspense ,useState,useEffect} from "react";
interface OwnProps {}
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = OwnProps;

 const Payment: FunctionComponent<Props> = (props) => {
     const { data: session } = useSession();
     const route = useRouter()

     useEffect(() => {
         if(!session){
             route.push("/api/login")
         }
     }, [session]);

     return (
        <div className="max-w-full max-h-full p-2 my-4 mx-auto lg:mx-10">
            {session?<div>
                <iframe id="ts-iframe"
                        src={`https://www.townscript.com/v2/widget/startup-weekend-varanasi-430334/booking?td-ticket-name-1=5&td-ticket-name-2=6&name=${session.user?.name}&emailid=${session.user?.email}`}
                        height="600" width="100%"></iframe>
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