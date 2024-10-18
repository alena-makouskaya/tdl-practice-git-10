
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
  todolist: TodolistType
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

      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all"
      }

      return [
        newTodolist,
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

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    todolist
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

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };
};

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
    });
  };
};

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(editTodolistTitleAC(todolistId, title));
    });
  };
};

// export const changeTodolistFilterTC = (todolistId: string, filter: FilterValueType) => {
//   return (dispatch: Dispatch) => {
//     todolistAPI.change(todolistId, title).then((res) => {
//       dispatch(editTodolistTitleAC(todolistId, title));
//     });
//   };
// };
