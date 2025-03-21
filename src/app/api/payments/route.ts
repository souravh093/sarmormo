import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payment";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();

  const sig = req.headers.get("Stripe-Signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });
        console.log(session);
        break;
      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to trigger webhook", err },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
