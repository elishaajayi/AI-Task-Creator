import React, { useState, useEffect } from "react";
import "./ChatBox.css";

const ChatBox = ({ handleResponse }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history from the server when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/gemini-history");
        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }
        const data = await response.json();
        setChatHistory(data.history);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const sendMessage = async () => {
    if (value.trim() !== "") {
      // Update chat history with user message
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { role: "user", parts: [{ text: value }] }, // Format user message correctly
      ]);

      try {
        // Send message to server and wait for response
        const response = await fetch("http://localhost:3000/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: value, history: chatHistory }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.text();

        // Update chat history with model response
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory,
          { role: "model", parts: [{ text: data }] }, // Format model message correctly
        ]);
        handleResponse(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setValue(""); // Clear input after sending
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const formatResponseWithMarkdown = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <div key={index}>
        {line}
        <br />
      </div>
    ));
  };

  const messageList = chatHistory.map((message, index) => (
    <div key={index} className="message">
      {message.role === "user" && (
        <span className="user-message">{message.parts[0].text}</span>
      )}
      {message.role === "model" && (
        <div className="gemini-message">
          {formatResponseWithMarkdown(message.parts[0].text)}
        </div>
      )}
    </div>
  ));

  return (
    <div className="gemini-chatbox">
      <div className="message-container">{messageList}</div>
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
