import Stripe from "stripe";
import { headers } from 'next/headers'
import { NextResponse,type NextRequest } from "next/server";
//@ts-ignore
export async function POST(request:NextRequest) {
    const baseUrl = request.headers.get("origin");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2022-11-15',
    });
    let data = await request.json();
    let priceId = process.env.PRICEID
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        billing_address_collection: 'required',
        phone_number_collection: { 
            enabled: true
        },
        payment_method_types: ['card',],
        mode: 'payment',
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}`
    })

    return NextResponse.json(session.url)
}