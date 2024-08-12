import { collection, query, updateDoc, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";

// @ts-ignore
export async function GET(request) {
  console.log(request.data);

  // Query the users collection to find the document by email
  const q = query(
    collection(db, "users"),
    where("email", "==", request.data.userEmailId)
  );

  // Get the documents matching the query
  const querySnapshot = await getDocs(q);

  // Check if the document exists and update the first matching document
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const ref = doc.ref;
      const updatedValues = {
        ...doc.data(), // Keep the existing data
        paymentId: request.data.uniqueOrderId, // Add the paymentId field
      };
      await updateDoc(ref, updatedValues);
      console.log("Document updated with paymentId:", request.data.uniqueOrderId);
    });
  } else {
    console.log("No matching document found for the given email.");
  }
}
