

import { GetTasks } from "./../stories/todolists-api.stories";
import {
  addTodolistAC,
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { title } from "process";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from '../app/store';

export type UpdateTaskActionType = {
  type: "UPDATE-TASK";
  todolistId: string;
  taskId: string;
  model: UpdateDomainTaskModelType;
};

export type EditTaskTitleActionType = {
  type: "EDIT-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
  // todolistId: string;
  // title: string;
};

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type SetTasksActionType = {
  type: "SET-TASKS";
  todolistId: string;
  tasks: TaskType[];
};

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | EditTaskTitleActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      let tasksInTodolist = state[action.todolistId];

      let newtasks = tasksInTodolist.filter((t) => t.id !== action.taskId);

      state[action.todolistId] = newtasks;

      return { ...state };
    }

    case "ADD-TASK": {
      let stateCopy = { ...state };

      const newTask = action.task;

      const tasks = stateCopy[newTask.todoListId];

      const newTasks = [newTask, ...tasks];

      stateCopy[newTask.todoListId] = newTasks;

      return stateCopy;
    }

    case "EDIT-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    }

    case "ADD-TODOLIST": {
      let stateCopy = { ...state };

      stateCopy[action.todolist.id] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TODOLISTS": {
      let stateCopy = { ...state };

      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }

    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = action.tasks;

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
  // todolistId: string,
  // title: string

  task: TaskType
): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    task,
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

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
): UpdateTaskActionType => {
  return {
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model,
  };
};

export const setTasksAC = (
  todolistId: string,
  tasks: TaskType[]
): SetTasksActionType => {
  return {
    type: "SET-TASKS",
    todolistId,
    tasks,
  };
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      const action = setTasksAC(todolistId, tasks);
      dispatch(action);
    });
  };
};

export const removeTaskTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    });
  };
};

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      const action = AddTaskAC(task);
      dispatch(action);
    });
  };
};



export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  
  return (dispatch: Dispatch, getState: () => AppRootState) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if(!task) {
      return
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      // completed: task,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel
    }

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      const action = updateTaskAC(todolistId, taskId, apiModel);
      dispatch(action);
    });
  };
};
