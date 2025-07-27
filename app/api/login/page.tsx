"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/payment";

  useEffect(() => {
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  if (!session)
    return (
      <main className="flex h-screen items-center justify-center">
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow"
        >
          Login with Google
        </button>
      </main>
    );
};

export default Page;
