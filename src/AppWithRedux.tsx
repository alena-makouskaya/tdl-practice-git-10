import React, { useCallback, useEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistAC,
  setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  EditTaskTitleAC,
  RemoveTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, AppRootState, useAppDispatch } from "./app/store";
import {
  TaskStatuses,
  TaskType,
  todolistAPI,
  TodolistType,
} from "./api/todolists-api";

export type TasksStateType = {
  [key: string]: TaskType[];
};

const AppWithRedux = React.memo(() => {
  console.log("App is called");

  let dispatch = useAppDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTodolistsTC());
    // fetchTodolistsThunk(dispatch);
  }, []);

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      let action = RemoveTaskAC(todolistId, taskId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      let action = AddTaskAC(todolistId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      let action = ChangeTaskStatusAC(todolistId, taskId, status);
      dispatch(action);
    },
    [dispatch]
  );

  const editTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      let action = EditTaskTitleAC(todolistId, taskId, title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodolistFilter = useCallback(
    (todolistId: string, filter: FilterValueType) => {
      let action = changeTodolistFilterAC(todolistId, filter);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      let action = removeTodolistAC(todolistId);
      dispatch(action);
      // dispatch(action)
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      let action = addTodolistAC(title);
      dispatch(action);
      // dispatch(action)
    },
    [dispatch]
  );

  const editTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      let action = editTodolistTitleAC(todolistId, title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AddItemForm callBack={addTodolist} />

      {todolists.map((tl) => {
        let filteredTasks = tasks[tl.id];

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            editTaskTitle={editTaskTitle}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            removeTodolist={removeTodolist}
            editTodolistTitle={editTodolistTitle}
          />
        );
      })}
    </div>
  );
});

export default AppWithRedux;
