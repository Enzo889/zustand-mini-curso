import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interface/task.interface";

interface TaskState {
  tasks: Record<string, Task>;

  getTasksByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Tarea 1",
      status: "pending",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Tarea 2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Tarea 3",
      status: "completed",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Tarea 4",
      status: "pending",
    },
  },

  getTasksByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState>()(storeApi);
