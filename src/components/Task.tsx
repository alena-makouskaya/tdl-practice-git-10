// @flow
import * as React from "react";
import { EditableSpan } from "./EditableSpan";
import { useCallback } from "react";
import { TaskStatuses, TaskType } from "../api/todolists-api";

type TaskPropsType = {
  todolistId: string;
  task: TaskType;

  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    status: TaskStatuses
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;
};
export const Task = React.memo(({
  todolistId,
  task,
  removeTask,
  editTaskTitle,
  changeTaskStatus,
}: TaskPropsType) => {
    console.log(`Task - ${task.id} is called`);

  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    let taskStatus = e.currentTarget.checked

    changeTaskStatus(todolistId, task.id, taskStatus ? TaskStatuses.Completed : TaskStatuses.New);
  };

  const editTaskTitleHandler = useCallback(
    (title: string) => {
      editTaskTitle(todolistId, task.id, title);
    },
    [editTaskTitle, todolistId, task.id]
  );

  const removeTaskHandler = () => {
    removeTask(todolistId, task.id);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.status === TaskStatuses.Completed ? true : false }
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan title={task.title} callBack={editTaskTitleHandler} />
      <button onClick={removeTaskHandler}> x </button>
    </li>
  );
});
