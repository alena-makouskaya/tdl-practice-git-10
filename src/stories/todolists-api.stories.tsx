import { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolists-api";

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

  let newTodolistTitle = "New Todolist Title"

  useEffect(() => {
    todolistAPI.createTodolist(newTodolistTitle).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  let [state, setState] = useState<any>(null);

  let todolistId = "dd8611ce-96a0-4a60-ba10-3b4617c5043a"

  useEffect(() => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  let [state, setState] = useState<any>(null);

  let todolistId = "e0a05a48-111c-482d-a516-a93d19199b1f"
  let newTodolistTitle = "New Todolist Title"

  useEffect(() => {
    todolistAPI.updateTodolist(todolistId, newTodolistTitle).then((res) => {
      setState(res.data);
    });
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
  
    const todolistId = "dbbba888-aa88-409b-a914-f23b662ad00e";
  
    useEffect(() => {
      todolistAPI.getTasks(todolistId).then((res) => {
        setState(res.data);
      });
    }, []);
  
    return <div>{JSON.stringify(state)}</div>;
  };

  export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>("");
    const [todolistId, setTodolistId] = useState<string>("");
  
    const deletetask = () => {
      const todolistId = "dbbba888-aa88-409b-a914-f23b662ad00e";
      const taskId = "";
  
      useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId).then((res) => {
          setState(res.data);
        });
      }, []);
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
  