"use client";
import React, { useEffect } from "react";
import Navigation from "../ui/shared/Navigation";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." })
    .refine(
      (value) => {
        // Modified regex pattern for password
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;
        return regex.test(value);
      },
      {
        message: "Password must include at least one letter and one number.",
      }
    ),
});

function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
  const deploymentURL = "https://tasktracker-gjg6.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/task");
    } else {
      setLoading(false);
    }
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${deploymentURL}/users/register`,
        values
      );
      if (response.status === 200) {
        toast({
          title: "Registered succesfully",
          description: "Congratulation on registering an account!",
        });

        setLoading(false);
        form.reset();
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        console.log("Error");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An unexpected error occurred");
      console.log("error happen");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="pt-[80px] global-container ">
      <Navigation name="authentication" />

      <div className="min-h-[600px] flex justify-center items-center">
        <div className="w-full">
          <h1 className="text-[37px] max-w-[364px] font-medium text-center mx-auto ">
            You&apos;re one click away from less busywork
          </h1>
          {error && <p className="text-red-500 text-center ">{error}</p>}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 max-w-[400px] mx-auto"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-[7px] border-[#1C87E1]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-[7px] border-[#1C87E1] "
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="rounded-[7px] max-w-[400px] border-[#1C87E1]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="py-2 rounded-[7px] text-center bg-primary w-full text-white hover:opacity-90"
              >
                Continue
              </button>
              <div className="text-center">
                <Link
                  href={"/login"}
                  className="text-primary w-full hover:underline"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Page;
