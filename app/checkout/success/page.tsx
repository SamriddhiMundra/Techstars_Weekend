"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { db } from "@/lib/firebaseStore";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function SuccessPage() {
  const [docID, setDocID] = useState<null | string>(null);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    const fetcher = async () => {
      const q =await query(
          collection(db, "users"),
          where("email", "==", session?.user?.email)
      );
      const querySnapshot = await getDocs(q);
      setDocID(querySnapshot.docs[0].id);
    };
    fetcher();
  }, [session]);

  const URL = sessionId ? `/api/stripe/sessions/${sessionId}` : null;
  const { data: checkoutSession, error } = useSWR(URL, fetcher);

  if (error) return <div>failed to load the session</div>;

  if (checkoutSession) {
    const docId =
        checkoutSession.customer_details?.name +
        checkoutSession.customer_details?.email;

    docID && updateDoc(doc(db, "users", docID!.toString()), {
      paymentId: checkoutSession.payment_intent.id,
    });

    setDoc(doc(db, "payments", docId), checkoutSession);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="">
            Your payment of {checkoutSession.payment_intent.amount_received / 100}{" "}
            is successful
          </h1>
          <h2>Customer details</h2>
          <p>Payment Id: {checkoutSession.payment_intent.id}</p>
          <p>Customer Name: {checkoutSession.customer_details?.name}</p>
          <p>Customer Email: {checkoutSession.customer_details?.email}</p>
        </div>
    );
  } else {
    return (
        <div className="flex flex-col justify-center h-screen items-center space-x-4">
          <Skeleton className="h-4 w-[300px]" />
          <div className="space-y-2 mt-8">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
    );
  }
}