"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary({ summaryId }: { summaryId: string }) {
  try {
    // delete from database
    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();

    const result =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${user.id}
`;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error occurred", error);
    return { success: false };
  }
}
