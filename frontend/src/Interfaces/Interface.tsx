export interface taskProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  username: string;
  email: string;
}

export interface DropDownProps {
  taskId: string;
  completed: boolean;
  markTask: (taskId: string, completed: boolean) => void;
  deleteTask: (taskId: string) => void;
}
