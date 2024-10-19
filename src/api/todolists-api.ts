import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
    // Authorization: `Bearer ${token}`,
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("todo-lists");
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
      title: title,
    });
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: title,
    });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title: title }
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

//types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export enum TaskStatuses  {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities  {
  Low = 0,
  Middle = 1,
  Hight = 2,
  Urgently = 3,
  Later = 3,
}

export type TaskType = {
  description: string;
  title: string;
  // completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
