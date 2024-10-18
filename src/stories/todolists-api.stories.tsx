import { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";
import { title } from "process";

export default {
  title: "API",
};

export const GetTodolists = () => {
  let [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  let [state, setState] = useState<any>(null);

  let newTodolistTitle = "New Todolist Title";

  useEffect(() => {
    todolistAPI.createTodolist(newTodolistTitle).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  let [state, setState] = useState<any>(null);

  let todolistId = "dd8611ce-96a0-4a60-ba10-3b4617c5043a";

  useEffect(() => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  let [state, setState] = useState<any>(null);

  let todolistId = "e0a05a48-111c-482d-a516-a93d19199b1f";
  let newTodolistTitle = "New Todolist Title";

  useEffect(() => {
    todolistAPI.updateTodolist(todolistId, newTodolistTitle).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

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
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />

        <button onClick={getTasks}>Get tasks</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const deletetask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deletetask}>delete task</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");

  const createTask = () => {
    todolistAPI.createTask(todolistId, taskTitle).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}

      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTask}>Create task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const updateTask = () => {
    todolistAPI
      .updateTask(todolistId, taskId, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
        completed: true,
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
            setTaskId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
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
          type="number"
          onChange={(e) => {
            setStatus(+e.currentTarget.value);
          }}
        />
        <input
          placeholder="Priority"
          value={priority}
          type="number"
          onChange={(e) => {
            setPriority(+e.currentTarget.value);
          }}
        />

        <button onClick={updateTask}>Update task</button>
      </div>
    </div>
  );
};
