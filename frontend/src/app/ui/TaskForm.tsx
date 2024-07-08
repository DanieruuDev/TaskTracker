"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { taskProps } from "@/Interfaces/Interface";

const formSchema = z.object({
  title: z.string(),
  description: z.string().min(1, {
    message: "Task must contain a description",
  }),
});

function TaskForm({
  setTasks,
  handleClose,
}: {
  setTasks: any;
  handleClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem("token");
    let { title, description } = values;
    if (title === "") title = "Untitled task";
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/createTask",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const newTask = response.data;
        toast({
          title: "Task created succesfully",
          duration: 2000,
        });
        setTasks((prevTasks: taskProps[]) => [...prevTasks, newTask]);
        setLoading(false);
        handleClose();
      } else {
        toast({
          title: "Error happen",
        });
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An unexpected error occurred");
      console.log("error happen");
    } finally {
      setLoading(false);
    }
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title"
                  className="border-primary text-[16px]"
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
                  className="w-full p-4 resize-none text-[14px]"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="bg-primary p-2 rounded-[7px] text-white w-full"
        >
          {loading ? "Loading..." : "Create task"}
        </button>
      </form>
    </Form>
  );
}

export default TaskForm;
