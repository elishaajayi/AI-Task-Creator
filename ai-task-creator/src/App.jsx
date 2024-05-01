import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import ChatBox from "./components/ChatBox";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  // Function to extract tasklistitems and priority tags from response text
  const extractTasks = (responseText) => {
    const lines = responseText.split("\n");
    const tasks = lines
      .filter((line) => /^(-\s*)?(\*\*\s*)?tasklistitem:/i.test(line.trim()))
      .map((line) => {
        const taskData = line
          .replace(/(-\s*)?(?:\*\*\s*)?tasklistitem:/gi, "")
          .trim();
        const priorityMatch = taskData.match(/\(([^)]+)\)/); // Extract priority tag
        const priority = priorityMatch ? priorityMatch[1].toLowerCase() : ""; // Convert to lowercase
        return {
          task: taskData.replace(/\([^)]+\)/, "").trim(), // Remove priority tag from task name
          status: "todo",
          tags: [priority], // Pass priority tag as the tag
        };
      });
    return tasks;
  };

  // Function to handle the response from the chat box
  const handleResponse = (responseText) => {
    const extractedTasks = extractTasks(responseText);
    setTasks(extractedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(`${activeCard} placed in ${status}, position ${position}`);

    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTask = tasks.filter((task, index) => index !== activeCard);

    updatedTask.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    setTasks(updatedTask);
  };

  return (
    <>
      <div className="app-name">
        <h2>AI Task Creator</h2>
      </div>
      <div className="app">
        <TaskForm setTasks={setTasks} />
        <main className="app_main">
          <TaskColumn
            title="To do"
            icon={todoIcon}
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Doing"
            icon={doingIcon}
            tasks={tasks}
            status="doing"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Done"
            icon={doneIcon}
            tasks={tasks}
            status="done"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        </main>
      </div>
      <div className="chat-section">
        {/* Pass handleResponse as a prop to the ChatBox component */}
        <ChatBox handleResponse={handleResponse} />
      </div>
    </>
  );
};

export default App;
