"use client";

import React from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

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
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file) {
      toast.error("⚠️ Please select a file.");
      return;
    }

    const validateFields = schema.safeParse({ file });

    if (!validateFields.success) {
      toast.error(validateFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file");
      return;
    }

    toast("🔃 Uploading PDF...");

    console.log("Uploading file:", file);

    try {
      console.log("Starting upload...");
      const response = await startUpload([file]);

      if (!response) {
        toast.error("❌ Upload failed. Try again.");
        return;
      }

      toast.success("✅ PDF uploaded successfully!");
      console.log("Upload response:", response);
    } catch (error) {
      console.log("Upload error");
      console.error("Upload error:", error);
      toast.error("❌ An error occurred. Please try again.");
    }

    toast("🎉 All done!");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
