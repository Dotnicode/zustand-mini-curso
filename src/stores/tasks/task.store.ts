import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {
  tasks: Record<string, Task>;
  dragginTaskId?: string;
  getTaskByStatus: (status: TaskStatus) => Task[];
  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never]]> = (
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
  setDragginTaskId: (taskId) => {
    set({ dragginTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ dragginTaskId: undefined }, false, "removeDragginTaskId");
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
