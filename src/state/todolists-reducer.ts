import { title } from "process";
import { v1 } from "uuid";
import { todolistAPI, TodolistType } from "../api/todolists-api";
import { Dispatch } from "redux";

export type FilterValueType = "all" | "active" | "completed";

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterValueType;
};

export type EditTodolistTitleActionType = {
  type: "EDIT-TODOLIST-TITLE";
  todolistId: string;
  title: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolistId: string;
  title: string;
};

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistType>;
};

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
};

let initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionType
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }

    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 0,
        },
        ...state,
      ];
    }

    case "EDIT-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.todolistId);

      if (todolist) {
        todolist.title = action.title;
      }

      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.todolistId);

      if (todolist) {
        todolist.filter = action.filter;
      }

      return [...state];
    }

    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => {
        return {
          ...tl,
          filter: "all",
        };
      });
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    todolistId,
  };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    todolistId: v1(),
    title,
  };
};

export const editTodolistTitleAC = (
  todolistId: string,
  title: string
): EditTodolistTitleActionType => {
  return {
    type: "EDIT-TODOLIST-TITLE",
    todolistId,
    title,
  };
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter,
  };
};

export const setTodolistsAC = (
  todolists: Array<TodolistType>
): SetTodolistsActionType => {
  return {
    type: "SET-TODOLISTS",
    todolists: todolists,
  };
};

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
  };
};
