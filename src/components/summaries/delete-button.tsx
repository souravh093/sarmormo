"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const DeleteButton = ({summaryId} : {summaryId: string}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    console.log("Deleting summary...");
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-100 hover:bg-rose-500 hover:border-rose-600 "
          >
            <Trash2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this summary? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              variant={"destructive"}
              className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-100 hover:bg-rose-500 hover:border-rose-600 "
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              variant={"ghost"}
              className="text-gray-400 bg-gray-900 border border-gray-200 hover:text-rose-100 hover:bg-rose-500 hover:border-rose-600 "
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
