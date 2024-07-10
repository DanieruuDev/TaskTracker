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
  FormDescription,
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
  username: z.string(),
  password: z.string(),
});

function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
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
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      setLoading(true);

      const response = await axios.post(
        ` ${deploymentURL}/users/login`,
        values
      );

      if (response.status === 401) {
        throw new Error("Incorrect username or password");
      }
      if (response.status === 200) {
        router.push("/task");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        setLoading(false);
      } else {
        console.log("Error");
        throw new Error("Error occured while logging in");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "An unexpected error occurred");
      console.log("error happen");
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Navigation name="authentication" />

      <div className="min-h-[600px] w-full flex justify-center items-center px-5">
        <div className="w-full">
          <h1 className="text-[37px] max-w-[364px] font-light text-center mx-auto ">
            Welcome to Tasky
          </h1>
          <h4 className="text-[18px] text-[#686868] font-semibold text-center">
            To get started, please sign in
          </h4>
          {error && <p className="text-red-500 text-center">{error}</p>}
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
                Login
              </button>
              <div className="text-center">
                <Link
                  href={"/register"}
                  className="text-primary w-full hover:underline"
                >
                  Doesn&apos;t have an account yet? Register
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
