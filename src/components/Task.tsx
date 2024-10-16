// @flow
import * as React from "react";
import { TasksPropsType } from "./Todolist";
import { EditableSpan } from "./EditableSpan";
import { useCallback } from "react";
type Props = {
  todolistId: string;
  task: TasksPropsType;

  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
};
export const Task = ({
  todolistId,
  task,
  changeTaskStatus,
  editTaskTitle,
  removeTask,
}: Props) => {
  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    changeTaskStatus(todolistId, task.id, e.currentTarget.checked);

  const editTaskTitleHandler = useCallback(
    (title: string) => {
      editTaskTitle(todolistId, task.id, title);
    },
    [editTaskTitle, todolistId, task.id]
  );

  const removeTaskHandler = () => removeTask(todolistId, task.id);

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan title={task.title} callBack={editTaskTitleHandler} />
      <button onClick={removeTaskHandler}> x </button>
    </li>
  );
};
