import { GetTasks } from "./../stories/todolists-api.stories";
import {
  addTodolistAC,
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../app/AppWithRedux";
import { title } from "process";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from "../app/store";

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
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };

    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: [],
      };

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TODOLISTS": 
      let stateCopy = { ...state };

      return action.todolists.reduce(
        (acc, tl) => {
          stateCopy[tl.id] = [];
          return stateCopy;
        },
        { ...state }
      );

      // let stateCopy = { ...state };

      // action.todolists.forEach((tl) => {
      //   stateCopy[tl.id] = [];
      // });

      // return stateCopy;
    

    case "SET-TASKS": 
    return {...state, [action.todolistId]: action.tasks}

      // const stateCopy = { ...state };
      // stateCopy[action.todolistId] = action.tasks;

      // return stateCopy;
    

    default:
      return state;
  }
};

//actions
export const RemoveTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const);

export const AddTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);

export const EditTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
) => ({ type: "EDIT-TASK-TITLE", todolistId, taskId, title } as const);

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: "UPDATE-TASK", todolistId, taskId, model } as const);

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const);

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
  todolistAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items;
    const action = setTasksAC(todolistId, tasks);
    dispatch(action);
  });
};

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTask(todolistId, title).then((res) => {
      const task = res.data.data.item;
      const action = AddTaskAC(task);
      dispatch(action);
    });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ) =>
  (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      // completed: task,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };

    todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
      const action = updateTaskAC(todolistId, taskId, apiModel);
      dispatch(action);
    });
  };

//types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type EditTaskTitleActionType = ReturnType<typeof EditTaskTitleAC>;
export type AddTaskActionType = ReturnType<typeof AddTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
