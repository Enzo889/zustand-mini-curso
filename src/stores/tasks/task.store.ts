import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interface/task.interface";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: string;

  tasks: Record<string, Task>;

  getTasksByStatus: (status: TaskStatus) => Task[];

  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;

  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get,
) => ({
  draggingTaskId: undefined,
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
  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: window.crypto.randomUUID(),
      title,
      status,
    };

    // forma de zustand con immer

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // Forma tradicional de zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // using immer
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeTaskStatus(taskId, status);
      get().removeDraggingTaskId();
    } else {
      return;
    }
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(immer(persist(storeApi, { name: "tasks-storage" }))),
);
