"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { db } from "@/lib/firebaseStore";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons";
import useFormCheck from "@/hooks/useFormCheck";

interface OwnProps {}

type Props = OwnProps;
type User = {
  email: string;
  name: string;
  paymentId: string;
  emailVerified: boolean | null;
  imageUrl: string;
};

const Page: FunctionComponent<Props> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  useFormCheck()
  useEffect(() => {
    const fetcher = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", session?.user?.email)
      );
      const querySnapshot = await getDocs(q);
      // @ts-ignore
      setUser(querySnapshot.docs[0].data());
    };
    fetcher();
  }, [session]);

  return (
    <div className={"flex flex-col justify-center items-center h-screen"}>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1">
          <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
            <PersonIcon className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {user?.paymentId && (
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
              <EyeNoneIcon className="mt-px h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Payment ID</p>
                <p className="text-sm text-muted-foreground">
                  {user?.paymentId}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        {!user?.paymentId && (
          <CardFooter>
            <Link href={"/payment"} className={"w-full"}>
              <Button variant={"default"} className={"w-full"}>
                Get Ticket
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Page;
