import React from "react";
import Image from "next/image";

function Info() {
  return (
    <section className="global-container flex justify-between min-h-[500px] items-center gap-4 max-lg:flex-col-reverse max-lg:mt-5">
      <div className="max-w-[486px]">
        <h2 className="font-semibold text-[#090909] text-[24px]">
          Stay on Task, with Tasky.
        </h2>
        <p className="text-secondary text-[15px]">
          With Tasky, effortlessly create and manage your to-do lists. From
          simple tasks to complex projects, Tasky adapts to your needs. Easily
          assign tasks, collaborate with teammates, and keep everyone updated in
          real-time. Tasky ensures that your team stays organized and
          productive, no matter the size of the project.
        </p>
      </div>
      <div>
        <Image
          src={"/Tasky.png"}
          alt="tasky"
          width={400}
          height={300}
          className="shadow-lg object-fill w-auto h-auto"
          priority
        />
      </div>
    </section>
  );
}

export default Info;
