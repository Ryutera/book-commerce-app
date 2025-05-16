import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { title, price, bookId, userId } = await request.json();

  console.log(title, price);

  try {
    // チェックアウトセッションの作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      metadata: {
        bookId: bookId,
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "JPY",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      //クライアントで呼び出す必要ない。成功時に自動で遷移する。だたしページは自分で作る必要がある。
    
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `http://localhost:3000`,
    });

    return NextResponse.json({ checkout_url: session.url });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
