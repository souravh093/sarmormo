"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);

    let summary;
    try {
      let summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.log(error);
      //   call gemini
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);

          console.log({ summary });
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quote exceeded",
            geminiError
          );

          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate PDF summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "PDF summary generated successfully",
      data: {
        title: formattedFileName,
        summary,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate PDF summary",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) {
  try {
    const sql = await getDbConnection();

    const [saveSummary] =
      await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, status, title, file_name)
        VALUES (
            ${userId},
            ${fileUrl},
            ${summary},
            'completed',
            ${title},
            ${fileName}
        ) RETURNING id, summary_text
        `;

    return saveSummary;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) {
  // user is logged in and has a userId

  // save pdf summary

  // save pdf summary()

  let saveSummary: any;

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    saveSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!saveSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to save PDF summary",
    };
  }

  // revalidate pdf summary page
  revalidatePath(`/summaries/${saveSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: saveSummary.id,
    },
  };
}
