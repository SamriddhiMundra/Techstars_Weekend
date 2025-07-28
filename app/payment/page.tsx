"use client";
import React, {
  FunctionComponent,
  Suspense,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
interface OwnProps {}
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";

type Props = OwnProps;

const Payment: FunctionComponent<Props> = (props) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    // if (session === undefined) return;
    if (!session) {
      router.push("/api/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetcher = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", session?.user?.email)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data();
      console.log(data);
      setUser(data);
      if (data && !data.formFilled) {
        console.log("form not filled");
        router.push("/form");
      }
    };
    fetcher();
  }, [session, router]);

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

  return (
    <div className="max-w-full max-h-full p-2 my-4 mx-auto lg:mx-10">
      {session ? (
        <div>
          <iframe
            id="ts-iframe"
            src="https://www.townscript.com/v2/widget/techstars-weekend-040320/booking"
            height="600"
            width="80%"
          ></iframe>
          {/* <iframe
            id="ts-iframe"
            src="https://www.townscript.com/v2/widget/google-startup-weekend-004210/booking"
            height="600"
            width="80%"
          ></iframe> */}
        </div>
      ) : (
        <div className="flex flex-col justify-center h-screen items-center space-x-4">
          <Skeleton className="h-8 w-[300px]" />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-6 w-[200px]" />
          </div>
        </div>
      )}
    </div>
  );
};
export default Payment;

// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import { useEffect } from "react";

// // export default function PaymentPage() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (status === "unauthenticated") router.push("/");
// //   }, [status]);

// //   if (status === "loading") return <p>Loading...</p>;

// //   return (
// //     <div className="p-10 text-center">
// //       <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
// //       <div>
// //         <iframe
// //           id="ts-iframe"
// //           src={`https://www.townscript.com/v2/widget/startup-weekend-varanasi-2024-430334/booking?name=${session.user?.name}&emailid=${session.user?.email}&confirmemailid=${session.user?.email}&contact=1234567890&college=XYZUniversity&linkedin=https://www.linkedin.com/in/johndoe`}
// //           height="600"
// //           width="80%"
// //         ></iframe>
// //         <link
// //           rel="stylesheet"
// //           href="https://www.townscript.com/static/Bookingflow/css/ts-iframe.style.css"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { FunctionComponent, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebaseStore";

// interface OwnProps {}
// type Props = OwnProps;

// const Payment: FunctionComponent<Props> = () => {
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState<any>(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   const router = useRouter();

//   // Fetch user data only after session is loaded
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!session?.user?.email) {
//         setLoadingUser(false);
//         return;
//       }

//       try {
//         const q = query(
//           collection(db, "users"),
//           where("email", "==", session.user.email)
//         );
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs[0].data();
//           setUser(data);

//           // Instead of immediate redirect, wait for user action
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoadingUser(false);
//       }
//     };

//     fetchUserData();
//   }, [session]);

//   useEffect(() => {
//     if (user && !user.formFilled) {
//       router.replace("/form");
//     }
//   }, [user, router]);

//   // Show loading skeleton while checking session/user
//   if (status === "loading" || loadingUser) {
//     return (
//       <div className="flex flex-col justify-center h-screen items-center space-x-4">
//         <Skeleton className="h-8 w-[300px]" />
//         <div className="space-y-2 mt-2">
//           <Skeleton className="h-6 w-[250px]" />
//           <Skeleton className="h-6 w-[200px]" />
//           <Skeleton className="h-6 w-[200px]" />
//           <Skeleton className="h-6 w-[200px]" />
//         </div>
//       </div>
//     );
//   }

//   // Show login if no session
//   if (!session) {
//     return (
//       <main className="flex h-screen items-center justify-center">
//         <button
//           onClick={() => signIn("google")}
//           className="bg-blue-500 text-white px-6 py-2 rounded shadow"
//         >
//           Login with Google
//         </button>
//       </main>
//     );
//   }

//   // Payment page
//   return (
//     <div className="max-w-full max-h-full p-2 my-4 mx-auto lg:mx-10">
//       <iframe
//         id="ts-iframe"
//         src="https://www.townscript.com/v2/widget/techstars-weekend-040320/booking"
//         height="600"
//         width="80%"
//       ></iframe>

//       <div className="mt-4">
//         <button
//           onClick={() => router.back()}
//           className="bg-gray-200 px-4 py-2 rounded"
//         >
//           ← Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
