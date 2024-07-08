"use client";
import Navigation from "./ui/shared/Navigation";
import Hero from "./ui/Hero";
import Info from "./ui/Info";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return router.push("/task");
    }
  }, [router]);
  return (
    <div className="pt-[60px]">
      <Navigation name="home" />
      <Hero />
      <Info />
    </div>
  );
}
