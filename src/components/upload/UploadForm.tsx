"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/action/upload-actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size should be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File should be a PDF",
    }),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("✅ Upload complete!");
    },
    onUploadError: (error) => {
      toast.error(`❌ Upload failed: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      if (!file) {
        toast.error("⚠️ Please select a file.");
        return;
      }

      const validateFields = schema.safeParse({ file });

      // Check if the file is valid
      if (!validateFields.success) {
        toast.error(
          validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
        );
        setIsLoading(false);
        return;
      }

      toast("🔃 Uploading PDF...");

      // Start the upload
      const response = await startUpload([file]);

      if (!response) {
        toast.error("❌ Upload failed. Try again.");
        setIsLoading(false);
        return;
      }

      toast.success("✅ PDF uploaded successfully!");

      // parse the file
      // @ts-ignore
      const result = await generatePdfSummary(response);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;

        if (data?.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: response[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });

          toast.success("✅ Summary Generated");

          formRef.current?.reset();

          setIsLoading(false);

          router.push(`/summaries/${storeResult.data.id}`);
          
        }
      }

      console.log({ message });
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
