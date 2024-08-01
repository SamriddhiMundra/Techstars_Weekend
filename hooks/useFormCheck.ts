
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";
import { useSession } from "next-auth/react";

const useFormCheck = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkFormStatus = async () => {
      if (!session) return;

      const q = query(collection(db, "users"), where("email", "==", session.user?.email));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0]?.data();

      if (data && !data.formFilled) {
        router.push("/form");
      }
    };

    checkFormStatus();
  }, [session, router]);
};

export default useFormCheck;
