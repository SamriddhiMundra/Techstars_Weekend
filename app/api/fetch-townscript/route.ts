// app/api/fetch-townscript/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.townscript.com/api/registration/getRegisteredUsers?eventCode=techstars-weekend-040320",

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_TOWNSCRIPT_AUTH || "",
          //   Authorization:
          //     "eyJhbGciOiJIUzUxMiJ9.eyJST0xFIjoiUk9MRV9VU0VSIiwic3ViIjoic2hpdmFtc3JpdmFzdGF2YTA2MDEwQGdtYWlsLmNvbSIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTc1MzQ2NDE1MDI5NiwiTUFHSUNfTE9HSU4iOmZhbHNlLCJVU0VSX0lEIjo2MDEyODM4LCJleHAiOjE3NjEyNDAxNTB9.zv-WDadXLFlBN7CR9pg1vrOYWFbd_ICXI1CR4b5UBkrw5MCCVgIFhO6HAbFvuorwBbi7_e0ElqDGFYlsHPYLOQ",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Townscript data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
