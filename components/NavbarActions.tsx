"use client";

import React, { FunctionComponent, Suspense } from "react";
import Link from "next/link";
import { signIn} from "next-auth/react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";

interface OwnProps {}

type Props = OwnProps;

export const NavbarAction: FunctionComponent<Props> = (props) => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href={"/payment"}>
          <Button variant={"default"} size={"sm"} className={"mr-4 px-4"}>
            Get Ticket
          </Button>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          {session?.user && status === "authenticated" ? (
            <UserNav />
          ) : (
            <Button
              variant={"secondary"}
              size={"sm"}
              className={"px-4"}
              onClick={() => signIn("google")}
            >
              Sign In
            </Button>
          )}
        </Suspense>
      </div>
    </>
  );
};
