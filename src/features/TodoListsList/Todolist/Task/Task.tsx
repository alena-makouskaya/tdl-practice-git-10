// @flow
import * as React from "react";
import { EditableSpan } from "../../../../components/EditableSpan";
import { useCallback } from "react";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";
type Props = {
  todolistId: string;
  task: TaskType;

  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    status: TaskStatuses
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
  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskStatus = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;

    changeTaskStatus(todolistId, task.id, taskStatus);
  };

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
        checked={task.status === TaskStatuses.Completed ? true : false}
        onChange={changeTaskStatusHandler}
      />
      <EditableSpan title={task.title} callBack={editTaskTitleHandler} />
      <button onClick={removeTaskHandler}> x </button>
    </li>
  );
};
