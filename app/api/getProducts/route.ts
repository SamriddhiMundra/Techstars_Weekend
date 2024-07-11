import Stripe from "stripe";
import { NextResponse } from "next/server";

// @ts-ignore
export async function GET(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY||"", {

        apiVersion: '2022-11-15',
    })
    const prices = await stripe.prices.list({
        limit: 4,
    });

    return NextResponse.json(prices.data.reverse())
}