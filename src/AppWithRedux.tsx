import React, { useCallback, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {  Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { title } from "process";
import { AddItemForm } from "./components/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  editTodolistTitleAC,
  removeTodolistAC,
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
import { AppRootState } from "./app/store";
import { TaskStatuses, TaskType } from "./api/todolists-api";

export type FilterValueType = "all" | "active" | "completed";

export type TasksStateType = {
  [key: string]: TaskType[];
};

const AppWithRedux = React.memo(() => {
  console.log("App is called");

  let dispatch = useDispatch()

const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


  const removeTask = useCallback ((todolistId: string, taskId: string) => {
    let action = RemoveTaskAC(todolistId, taskId);
    dispatch(action);
  }, []);

  const addTask = useCallback ((todolistId: string, title: string) => {
    let action = AddTaskAC(todolistId, title);
    dispatch(action);
  }, []);

  const changeTaskStatus = useCallback ((
    todolistId: string,
    taskId: string,
    status: TaskStatuses
  ) => {
    let action = ChangeTaskStatusAC(todolistId, taskId, status);
    dispatch(action);
  }, []);

  const editTaskTitle = useCallback ((todolistId: string, taskId: string, title: string) => {
    let action = EditTaskTitleAC(todolistId, taskId, title);
    dispatch(action);
  }, []);

  const changeTodolistFilter = (
    todolistId: string,
    filter: FilterValueType
  ) => {
    let action = changeTodolistFilterAC(todolistId, filter);
    dispatch(action);
  };

  const removeTodolist = useCallback ((todolistId: string) => {
    let action = removeTodolistAC(todolistId)
    dispatch(action)
    // dispatch(action)
  }, []);

  const addTodolist = useCallback ((title: string) => {
    let action = addTodolistAC(title);
    dispatch(action);
    // dispatch(action)
  }, []);

  const editTodolistTitle = useCallback ((todolistId: string, title: string) => {
    let action = editTodolistTitleAC(todolistId, title);
    dispatch(action);
  }, []);

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
})

export default AppWithRedux;
