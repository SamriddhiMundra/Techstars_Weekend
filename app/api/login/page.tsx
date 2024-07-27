"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {signIn, useSession} from "next-auth/react";
import { Button } from "@/components/ui/button";
import google from "@/public/assets/GoogleLogo.png"
import Image from "next/image"
import Link from "next/link";
import {
    Card,
} from "@/components/ui/card";
import {useRouter} from "next/navigation";
interface OwnProps {}

type Props = OwnProps;

const Page: FunctionComponent<Props> = (props) => {
    const { data: session } = useSession();
    const route = useRouter()
    useEffect(() => {
       if(session){
           route.push("/")
       }
    }, [session]);

    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <Card>
                <Button className="text-3xl  w-30 h-50" variant={"outline"}
                        onClick={() => signIn("google")}>
                    <Image src={google} width={50} height={50} alt={"googleLogo"}/> Login</Button>
            </Card>
        </div>
    );
};

export default Page;
