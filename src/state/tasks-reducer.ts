import {
  addTodolistAC,
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type EditTaskTitleActionType = {
  type: "EDIT-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | EditTaskTitleActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      // let tasksInTodolist = state[action.todolistId];

      // let newtasks = tasksInTodolist.filter((t) => t.id !== action.taskId);

      // state[action.todolistId] = newtasks;

      // return { ...state };

      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      // let tasksInTodolist = state[action.todolistId];

      // let newTasks = [
      //   {
      //     id: v1(),
      //     title: action.title,
      //     status: TaskStatuses.n,
      //   },
      //   ...tasksInTodolist,
      // ];

      // state[action.todolistId] = newTasks;

      // return { ...state };

      return {
        ...state,
        [action.todolistId]: [
          {
            todoListId: action.todolistId,
            id: v1(),
            title: action.title,
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            order: 0,
            addedDate: "",
          },
          ...state[action.todolistId],
        ],
      };
    }

    case "EDIT-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task
        ),
      };
    }

    case "ADD-TODOLIST": {
      let stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    default:
      return state;
  }
};

export const RemoveTaskAC = (
  todolistId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    todolistId,
    taskId,
  };
};

export const AddTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    todolistId,
    title,
  };
};

export const EditTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): EditTaskTitleActionType => {
  return {
    type: "EDIT-TASK-TITLE",
    todolistId,
    taskId,
    title,
  };
};

export const ChangeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskId,
    status,
  };
};
