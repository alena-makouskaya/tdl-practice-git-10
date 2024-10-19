import React, { useCallback, useEffect, useReducer, useState } from "react";
import "../App.css";
import { TaskType } from "../api/todolists-api";
import { TodoListsList } from "../features/TodoListsList/TodoListsList";
import { addTodolistTC } from "../state/todolists-reducer";
import { AddItemForm } from "../components/AddItemForm";
import { useAppDispatch } from "./store";

export type TasksStateType = {
  [key: string]: TaskType[];
};

export const App = React.memo(() => {
  console.log("App is called");
  let dispatch = useAppDispatch();
  

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AddItemForm callBack={addTodolist} />
      
      <TodoListsList />
    </div>
  );
});

