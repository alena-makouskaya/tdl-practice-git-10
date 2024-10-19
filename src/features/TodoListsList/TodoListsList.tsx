import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../app/store";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType,
} from "../../state/todolists-reducer";
import { TasksStateType } from "../../app/AppWithRedux";
import { useCallback, useEffect } from "react";
import { addTaskTC, removeTaskTC, updateTaskTC } from "../../state/tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { AddItemForm } from "../../components/AddItemForm";
import { Todolist } from "./Todolist/Todolist";

type TodoListsListPropsType = {};

export const TodoListsList = (props: TodoListsListPropsType) => {
  let dispatch = useAppDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  useEffect(() => {
    const thunk = fetchTodolistsTC();
    dispatch(thunk);
    // fetchTodolistsThunk(dispatch);
  }, []);

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      const thunk = removeTaskTC(todolistId, taskId);
      dispatch(thunk);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      let thunk = addTaskTC(todolistId, title);
      dispatch(thunk);
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      let thunk = updateTaskTC(todolistId, taskId, { status: status });
      dispatch(thunk);
    },
    [dispatch]
  );

  const editTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      let thunk = updateTaskTC(todolistId, taskId, { title: title });
      dispatch(thunk);
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
      const thunk = removeTodolistTC(todolistId);
      dispatch(thunk);
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );

  const editTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      const thunk = changeTodolistTitleTC(todolistId, title);
      dispatch(thunk);
    },
    [dispatch]
  );

  return (
    <div className="tlList">

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
};
