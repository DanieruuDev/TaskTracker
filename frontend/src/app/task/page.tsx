"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../ui/shared/Navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { FaCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import CreateTask from "../ui/CreateTask";
import { useToast } from "@/components/ui/use-toast";
import Modal from "../ui/Modal";
import { EditTaskProps } from "../ui/Modal";
import TaskCard from "../ui/TaskCard";
import { taskProps } from "@/Interfaces/Interface";
import { User } from "@/Interfaces/Interface";

function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<taskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const completed = tasks.filter((task) => task.completed === true);
  const todo = tasks.filter((task) => task.completed === false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<taskProps | null>(null);
  const deploymentURL = "https://tasktracker-gjg6.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") as string) || [];
    if (!token) {
      return router.push("/login");
    }
    setLoading(false);
    fetchTasks(token);
    setUser(user);
  }, [router]);
  const fetchTasks = async (token: string) => {
    try {
      const response = await axios.get(`${deploymentURL}/tasks/getTasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    }
  };
  const markTask = async (taskId: string, completed: boolean) => {
    const token = localStorage.getItem("token") as string;
    try {
      const response = await axios.patch(
        `${deploymentURL}/tasks/updateTask/${taskId}`,
        { completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Task status changed",
          duration: 2000,
        });
        fetchTasks(token);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
    }
  };
  const deleteTask = async (taskId: string) => {
    const token = localStorage.getItem("token") as string;
    try {
      const response = await axios.delete(
        `${deploymentURL}/tasks/deleteTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Task has been deleted",
          duration: 2000,
        });
        fetchTasks(token);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
    }
  };
  const getTask = async (taskId: string) => {
    const token = localStorage.getItem("token") as string;
    try {
      const response = await axios.get(
        `${deploymentURL}/tasks/getTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedTask(response.data);
        setShowModal(true);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
    }
  };
  const editTask = async ({ taskId, values }: EditTaskProps) => {
    const token = localStorage.getItem("token") as string;
    try {
      setLoading(true);
      const response = await axios.patch(
        `${deploymentURL}/tasks/updateTask/${taskId}`,
        {
          title: values.title,
          description: values.description,
          completed: values.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Task has been updated",
          duration: 2000,
        });
        fetchTasks(token);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    setShowModal(false);
  }
  console.log(user);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="pt-[72px] bg-[#D9D9D9] min-h-[100vh]">
      <Navigation name="task" />

      {/*task section*/}
      <div className="flex-1 global-container">
        <h1 className="mt-4 text-4xl font-bold text-primary text-center">
          Welcome {user?.username}!
        </h1>
        <div className="my-4 flex justify-between items-center">
          <h1 className="text-[25px] font-semibold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-2">
          <div className="bg-white rounded-[5px] shadow-lg p-3 flex-1">
            <div className="flex items-center text-[15px] justify-between">
              <h3 className="text-[#888888]">Total task </h3>
              <div className="text-primary mt-[-2px]">
                <FaTasks />
              </div>
            </div>
            <h2 className="text-[20px]">{tasks.length}</h2>
          </div>
          <div className="bg-white rounded-[5px] shadow-md p-3 flex-1">
            <div className="flex items-center text-[15px] justify-between">
              <h3 className="text-[#888888]">Completed task </h3>
              <div className="text-green-500 mt-[-2px]">
                <FaCircle />
              </div>
            </div>
            <h2 className="text-[20px]">{completed.length}</h2>
          </div>
          <div className="bg-white rounded-[5px] shadow-md p-3 flex-1">
            <div className="flex items-center text-[15px] justify-between">
              <h3 className="text-[#888888]">Todo</h3>
              <div className="text-primary mt-[-2px]">
                <FaCircle />
              </div>
            </div>
            <h2 className="text-[20px]">{todo.length}</h2>
          </div>
        </div>
        <div className="my-4">
          <CreateTask setTasks={setTasks} fetchTask={fetchTasks} />

          <div className="mt-4 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
            {tasks.length === 0 ? (
              <p>No tasks yet</p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  task={task}
                  getTask={getTask}
                  deleteTask={deleteTask}
                  markTask={markTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          selectedTask={selectedTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}

export default Page;
