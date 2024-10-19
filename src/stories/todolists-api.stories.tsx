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

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState("");
  const [title, setTitle] = useState("");

  const createTask = () => {
    todolistAPI.createTask(todolistId, title).then((res) => {
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
          placeholder={"Task Id"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />

        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("Title 01");
  const [description, setDescription] = useState<string>("Description 01");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, settaskId] = useState<string>("");

  const updateTask = () => {
    // const todolistId = "bf334189-caef-42ed-8026-dbf9eeee692d";
    // const taskTitle = "Task Title";

    todolistAPI
      .updateTask(todolistId, taskId, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
        completed: true
      })
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          placeholder="Todolist ID"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />

        <input
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => {
            settaskId(e.currentTarget.value);
          }}
        />

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />

        <input
          placeholder="Status"
          value={status}
          onChange={(e) => {
            setStatus(+e.currentTarget.value);
          }}
        />

        <input
          placeholder="Priority"
          value={priority}
          onChange={(e) => {
            setPriority(+e.currentTarget.value);
          }}
        />

        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
};

// 80e3c3dc-1bbc-4fcc-a15b-88f6d4e81397

// 94dfb180-490c-468e-bcbb-935a344c5921