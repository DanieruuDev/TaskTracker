import React from "react";
import { taskProps } from "@/Interfaces/Interface";
import Dropdown from "./Dropdown";
import { formatDistanceToNow } from "date-fns";
import { FaCircle } from "react-icons/fa";
import TaskLoader from "./TaskLoader";
interface TaskCardInterface {
  id: string;
  getTask: (taskId: string) => void;
  task: taskProps;
  markTask: (taskId: string, completed: boolean) => void;
  deleteTask: (taskId: string) => void;
  taskLoading: {
    [key: string]: boolean;
  };
}
function TaskCard({
  id,
  getTask,
  task,
  markTask,
  taskLoading,
  deleteTask,
}: TaskCardInterface) {
  const isLoading = taskLoading[id];
  return (
    <>
      <div
        key={id}
        className={`bg-white p-3 rounded-[5px] space-y-4 hover:bg-gray-100 shadow-lg ${
          isLoading
            ? "cursor-not-allowed pointer-events-none"
            : "cursor-pointer"
        } overflow-hidden relative`}
        onClick={() => getTask(id)}
      >
        <div className="flex justify-between">
          {task.completed ? (
            <div className="flex items-center text-green-500">
              <FaCircle />
              <p className="text-[10px] ml-1">COMPLETED</p>
            </div>
          ) : (
            <div className="flex items-center text-primary">
              <FaCircle />
              <p className="text-[10px] ml-1">TODO</p>
            </div>
          )}

          <Dropdown
            taskId={task._id}
            completed={task.completed}
            markTask={markTask}
            deleteTask={deleteTask}
          />
        </div>
        {isLoading && <TaskLoader />}
        <div>
          <h1 className="text-[18px] font-bold">{task.title}</h1>
          <p className="text-[12px] text-[#afafaf]">
            {formatDistanceToNow(new Date(task.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="overflow-hidden max-h-[50px]">
          <p className="text-[16px] text-[#6d6d6d] overflow-hidden overflow-ellipsis">
            {task.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
