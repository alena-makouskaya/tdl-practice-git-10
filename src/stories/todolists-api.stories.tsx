import { ChangeEvent, useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          type="text"
          value={todolistId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodolistId(e.currentTarget.value)
          }
        />

        <button onClick={deleteTodolist}>Delete Todolist</button>
      </div>
    </div>
  );
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState("");

  const createTodolist = () => {
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />

        <button onClick={createTodolist}>Create Todolist</button>
      </div>
    </div>
  );
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const updateTodolist = () => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          type="text"
          value={todolistId}
          placeholder={"Todolist Id"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodolistId(e.currentTarget.value)
          }
        />

        <input
          type="text"
          value={title}
          placeholder={"Title"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />

        <button onClick={updateTodolist}>Update Todolist</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          type="text"
          value={todolistId}
          placeholder={"Todolist Id"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodolistId(e.currentTarget.value)
          }
        />

        <button onClick={getTasks}>Get Tasks</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [taskId, setTaskId] = useState("");

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          type="text"
          value={todolistId}
          placeholder={"Todolist Id"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodolistId(e.currentTarget.value)
          }
        />

        <input
          type="text"
          value={taskId}
          placeholder={"Task Id"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskId(e.currentTarget.value)
          }
        />

        <button onClick={deleteTask}>Delete Task</button>
      </div>
    </div>
  );
};
