"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { taskProps } from "@/Interfaces/Interface";
import { FaCircle } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";

export interface EditTaskProps {
  taskId: string | undefined;
  values: {
    title: string;
    description: string;
    completed: boolean;
  };
}
interface ModalProps {
  closeModal: () => void;
  selectedTask: taskProps | null;
  editTask: ({ taskId, values }: EditTaskProps) => void;
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

function Modal({ closeModal, selectedTask, editTask }: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      completed: selectedTask?.completed || false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    editTask({ taskId: selectedTask?._id, values });
    setIsLoading(false);
    closeModal();
  }
  const formattedUpdatedAt = selectedTask
    ? formatDistanceToNow(new Date(selectedTask.updatedAt), { addSuffix: true })
    : "";
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="opacity-50 w-full h-full"></div>

      <div className="bg-white max-w-[450px] w-full min-h-[300px] p-5 rounded-[5px] shadow-lg absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Form {...form}>
          <div className="flex justify-between items-center">
            <div className="text-[12px] text-[#aaaaaa] flex items-center">
              <FaCircle
                className={`mr-1 ${
                  form.watch("completed") ? "text-green-500" : "text-primary "
                }`}
              />
              <span>Updated {formattedUpdatedAt}</span>
            </div>
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="checkbox"
                      className="border-0 text-[16px]"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      className="border-0 text-[16px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      maxLength={250}
                      placeholder="Description"
                      rows={5}
                      {...field}
                      className="w-full p-4 resize-none text-[14px] outline-none border-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <button
                className="py-2 px-4  bg-gray-200 rounded-[7px] hover:bg-gray-400 hover:text-white transition-all duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary hover:opacity-80 py-2 px-6 rounded-[7px] text-white transition-all duration-300"
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Modal;
