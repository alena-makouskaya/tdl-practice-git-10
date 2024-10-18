import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  UnknownAction,
} from "redux";
import {
  TodolistDomainType,
  todolistsReducer,
} from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";

import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export const store = legacy_createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
);
export type AppRootState = ReturnType<typeof rootReducer>;
// export type AppRootState = ReturnType<typeof store.getState>;

export type AppDispatchType = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;
export const useAppDispatch = useDispatch<AppDispatchType>;

// @ts-ignore
window.store = store;
