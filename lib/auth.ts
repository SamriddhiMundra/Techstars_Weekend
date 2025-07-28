import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import admin from "firebase-admin";
import process from "process";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./firebaseStore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const authOptions: NextAuthOptions = {
  // @ts.ignore
  // adapter: FirestoreAdapter({
  //   credential: admin.credential.cert({
  //     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  //     clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  //     privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  //   }),
  // }),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        console.log(user);
        if (!user.email) return false;
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);

        if (querySnapshot.empty) {
          await setDoc(doc(db, "users", user.id), {
            ...user,
            formFilled: false,
          });
        } else {
          const userDoc = querySnapshot.docs[0];
          console.log(userDoc);
          await updateDoc(doc(db, "users", user.id), {
            ...user,
            formFilled: userDoc.data().formFilled || false,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

// import GoogleProvider from "next-auth/providers/google";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// };
