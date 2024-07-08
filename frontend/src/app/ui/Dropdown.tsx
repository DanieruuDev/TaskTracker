"use client";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDeleteOutline } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { DropDownProps } from "@/Interfaces/Interface";
function Dropdown({ taskId, markTask, completed, deleteTask }: DropDownProps) {
  const handleMarkTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevents click event from reaching parent elements
    markTask(taskId, !completed);
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevents click event from reaching parent elements
    deleteTask(taskId);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MdOutlineKeyboardArrowDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-md">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-200 flex gap-1"
          onClick={handleMarkTask}
        >
          {completed === true ? (
            <>
              <TbProgressCheck className="text-[18px]" />{" "}
              <span>Mark Uncomplete</span>
            </>
          ) : (
            <>
              <IoCheckmarkDoneCircle className="text-[18px]" />{" "}
              <span>Mark Completed</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-200 flex gap-1"
          onClick={handleDeleteTask}
        >
          <MdDeleteOutline className="text-[18px]" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
