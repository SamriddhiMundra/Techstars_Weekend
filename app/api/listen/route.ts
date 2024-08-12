import { collection, query, updateDoc, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseStore";

// @ts-ignore
export async function POST(request) {
  try {
    // Parse the JSON data sent by Townscript
    const { userEmailId, uniqueOrderId } = await request.json();

    // Query the users collection to find the document by email
    const q = query(
      collection(db, "users"),
      where("email", "==", userEmailId)
    );

    // Get the documents matching the query
    const querySnapshot = await getDocs(q);

    // Check if the document exists and update the first matching document
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        const ref = doc.ref;
        const updatedValues = {
          ...doc.data(), // Keep the existing data
          paymentId: uniqueOrderId, // Add the paymentId field
        };
        await updateDoc(ref, updatedValues);
        console.log("Document updated with paymentId:", uniqueOrderId);
      });
      return new Response("Document updated successfully", { status: 200 });
    } else {
      console.log("No matching document found for the given email.");
      return new Response("No matching document found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
