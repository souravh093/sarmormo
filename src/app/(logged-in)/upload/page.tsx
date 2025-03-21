import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeader from "@/components/upload/UploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Upload = async () => {
  const user = await currentUser();
  const userId = user?.id;
  const email = user?.emailAddresses?.[0]?.emailAddress;
  
  if (!userId && !email) {
    redirect("/sign-in");
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(userId, email);

  if(hasReachedLimit) {
    redirect("/dashboard")
  }

  return (
    <section>
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default Upload;
