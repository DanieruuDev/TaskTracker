import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <section className="bg-background min-h-[357px] flex items-center">
      <div className="global-container text-center">
        <h1 className="font-medium text-[40px] max-md:text-[25px]">
          Your Ultimate Online Task Management Solution
        </h1>
        <h4 className="text-secondary text-[20px] max-md:text-[15px] max-w-[766px] mx-auto mt-[15px] mb-[30px]">
          Tasky simplifies task management, allowing you to create, track, and
          manage tasks online. With its intuitive design, Tasky helps you stay
          organized and productive.
        </h4>
        <Link
          href={"/register"}
          className="bg-primary border-2 border-primary text-white py-2 px-5 rounded-md hover:bg-transparent hover:text-primary transition-all duration-200 mt-10"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}

export default Hero;
