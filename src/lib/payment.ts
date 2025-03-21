import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnection();

    await sql`UPDATE users status = "cancelled" WHERE customer_id = ${subscription.customer}`;
  } catch (error) {
    console.error("Error handling subscription deleted", error);
    throw error;
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("checkout.session.completed", session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);

  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    await crateOrUpdateUser({
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
    });

    await createPayment({
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
  }
}

async function crateOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) {
  try {
    const sql = await getDbConnection();

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (user.length === 0) {
      const newUser =
        await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
      return newUser;
    }
  } catch (error) {}
}

async function createPayment({
  session,
  priceId,
  userEmail,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}) {
  try {
    const sql = await getDbConnection();

    const { amount_total, status, id } = session;

    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
  } catch (error) {
    console.error("Error creating payment", error);
  }
}
