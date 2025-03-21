import { getDbConnection } from "@/lib/db";

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();

    const [summary] = await sql`
            SELECT * FROM pdf_summaries WHERE id = ${id}`;

    return summary;
  } catch (error) {
    console.log("Error occurred", error);
    return null;
  }
}
