import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Task, TaskStatus } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: Record<string, Task>;
  dragginTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  totalTasks: () => number;
  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  tasks: {
    "ABC-1": {
      id: "ABC-1",
      title: "Task 1",
      status: "open",
    },
    "ABC-2": {
      id: "ABC-2",
      title: "Task 2",
      status: "in-progress",
    },
    "ABC-3": {
      id: "ABC-3",
      title: "Task 3",
      status: "open",
    },
    "ABC-4": {
      id: "ABC-4",
      title: "Task 4",
      status: "open",
    },
  },
  dragginTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = { id: uuidv4(), title, status };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },
  totalTasks: () => {
    const totalTasks = Object.keys(get().tasks).length;
    return totalTasks;
  },
  setDragginTaskId: (taskId) => {
    set({ dragginTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ dragginTaskId: undefined });
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    if (!task) return;

    set((state) => {
      state.tasks[task.id].status = status;
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().dragginTaskId;

    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  persist(devtools(immer(storeApi)), { name: "task-store" })
);
