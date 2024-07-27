import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import admin from "firebase-admin";
import process from "process";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebaseStore";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export const authOptions: NextAuthOptions = {
  // @ts.ignore
  adapter: FirestoreAdapter({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    }),
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
  ],

  callbacks: {
    signIn: async ({ user }) => {
      try {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // If the user document doesn't exist, create it
          await setDoc(doc(db, "users", user.id), {
            ...user,
            formFilled: false,
          });
        } else {
          // If the user document exists, update it
          const userDoc = querySnapshot.docs[0];
          await updateDoc(doc(db, "users", user.id), {
            ...user,
            formFilled: userDoc.data().formFilled || false,
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false; // Prevent sign-in if there's an error
      }
    },
    redirect: async ({ url, baseUrl }) => {

      return baseUrl;
    },
    session: async ({ session, token, user }) => {

      return session;
    },
  },
};
