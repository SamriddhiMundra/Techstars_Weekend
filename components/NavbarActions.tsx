"use client";

import React, { FunctionComponent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";

interface OwnProps {}
type Props = OwnProps;
type User = {
  email: string;
  name: string;
  paymentId: string;
};

type ParsedUser = {
  userEmailId: string;
  userName: string;
  registrationId: string;
};

export const NavbarAction: FunctionComponent<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/fetch-townscript")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);

        const parsed: ParsedUser[] = JSON.parse(data.data);
        console.log(parsed);

        const activeUser = parsed.find(
          (info) => info.userEmailId === session?.user?.email
        );

        console.log(session);

        if (activeUser) {
          const user: User = {
            email: activeUser.userEmailId,
            name: activeUser.userName,
            paymentId: activeUser.registrationId,
          };

          console.log(user);
          setUser(user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching Townscript data:", err);
      });
  }, [session]);

  return (
    <>
      <div className="flex justify-center items-center">
        {/* {isLoading ? null : !user?.paymentId ? (
          <Link href={"/payment"}>
            <Button variant={"default"} size={"sm"} className={"mr-4 px-4"}>
              Get Ticket
            </Button>
          </Link>
        ) : null} */}

        <Link href={!user?.paymentId ? "/payment" : "/profile"}>
          <Button variant={"default"} size={"sm"} className={"mr-4 px-4"}>
            {!user?.paymentId ? "Get Ticket" : "Payment ID"}
          </Button>
        </Link>

        {/* <Link href={"/payment"}>
          <Button variant={"default"} size={"sm"} className={"mr-4 px-4"}>
            Get Ticket
          </Button>
        </Link> */}

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
  // return (
  //   <>
  //     <div className="flex justify-center items-center">
  //       {
  //         <Link href={"/payment"}>
  //           <Button variant={"default"} size={"sm"} className={"mr-4 px-4"}>
  //             Get Ticket
  //           </Button>
  //         </Link>
  //       }
  //       <Suspense fallback={<div>Loading...</div>}>
  //         {status === "authenticated" ? (
  //           <UserNav />
  //         ) : (
  //           <Button
  //             variant={"secondary"}
  //             size={"sm"}
  //             className={"px-4"}
  //             onClick={() => signIn("google")}
  //           >
  //             Sign In
  //           </Button>
  //         )}
  //       </Suspense>
  //     </div>
  //   </>
  // );
};
