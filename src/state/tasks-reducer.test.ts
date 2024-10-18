import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";
import { TasksStateType } from "../AppWithRedux";
import { AddTaskAC, ChangeTaskStatusAC, EditTaskTitleAC, RemoveTaskAC, setTasksAC,  tasksReducer } from "./tasks-reducer";
import { addTodolistAC, setTodolistsAC, TodolistDomainType } from "./todolists-reducer";

test.skip("task shoud be removed", () => {
  let initialState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "JS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Milk",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "Juce",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  };

  let action = RemoveTaskAC("todolistId1", "1");

  let endState = tasksReducer(initialState, action);

  expect(endState["todolistId1"].length).toBe(2);
  expect(endState["todolistId1"][0].title).toBe("CSS");

  expect(endState["todolistId2"].length).toBe(3);
});

test.skip("new task shoud be added", () => {
  let initialState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "JS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Milk",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "Juce",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  };


  let newTaskTitle = "New Task Title"

  let action = AddTaskAC("todolistId1", newTaskTitle);

  let endState = tasksReducer(initialState, action);

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId1"][0].title).toBe("New Task Title");

});

test.skip("task title shoud be edited", () => {
  let initialState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "JS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Milk",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "Juce",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  };


  let newTaskTitle = "New Task Title"

  let action = EditTaskTitleAC("todolistId1", "1", newTaskTitle);

  let endState = tasksReducer(initialState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][0].title).toBe("New Task Title");

});

test.skip("task status shoud be changed", () => {
  let initialState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "JS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Milk",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "Juce",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  };


  let action = ChangeTaskStatusAC("todolistId1", "1", TaskStatuses.InProgress);

  let endState = tasksReducer(initialState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId1"][0].status).toBe(TaskStatuses.InProgress);

});

test.skip("new proprty with new array should be added when new todolist is added", () => {
  let initialState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "CSS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "JS",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Milk",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Bread",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "Juce",
        description: "description",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  };

  let action = addTodolistAC("Todolist title");

  let endState = tasksReducer(initialState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if(!newKey){
    throw new Error ("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([]);

});

test.skip("empty arrays should be added when we set todolists", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let initialState: TodolistDomainType[] = [
    {
      id: todolistId1,
      title: "What to learn?",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy?",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ];

  let action = setTodolistsAC(initialState);

  let endState = tasksReducer({}, action);

  const keys = Object.keys(endState);


  expect(keys.length).toBe(2)
  expect(endState["todolistId1"]).toStrictEqual([])
  expect(endState["todolistId2"]).toStrictEqual([])

});

test.skip("tasks should be added for todolist", () => {
  let todolistId1 = v1();

  let initialState: TaskType[] = [
    {
      id: "1",
      title: "HTML",
      description: "description",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    },
    {
      id: "2",
      title: "CSS",
      description: "description",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    },
    {
      id: "3",
      title: "JS",
      description: "description",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    },
  ]
  let action = setTasksAC(todolistId1, initialState);

  let endState = tasksReducer({
    "todolistId1": []
  }, action);

  expect(endState["todolistId1"].length).toBe(3)

});

