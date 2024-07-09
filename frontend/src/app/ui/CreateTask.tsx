"use client";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { useState } from "react";

function CreateTask({
  setTasks,
  fetchTask,
}: {
  setTasks: any;
  fetchTask: (token: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-primary max-w-[135px] w-full text-white p-3 rounded-[5px] flex items-center justify-between">
          <IoMdAdd className="text-[20px]" /> <span>Create Task</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>Make sure to have a title</DialogDescription>
          </DialogHeader>
          <TaskForm
            setTasks={setTasks}
            handleClose={handleClose}
            fetchTask={fetchTask}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateTask;
