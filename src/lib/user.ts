import { pricePlans } from "@/constant/pricePlans";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getPriceId(email: string) {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(
  userId: string | undefined,
  email: string | undefined
) {
  if (!userId) {
    throw new Error("User Id not found");
  }

  const uploadCount = await getUserUploadCount(userId);

  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceId(email);
  }

  const isPro =
    pricePlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit: number = isPro ? 1000 : 19;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}
