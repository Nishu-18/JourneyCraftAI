import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Edit = () => {
  const [userName, setUserName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [joined, setJoined] = useState(false);

  const joinGroup = () => {
    if (userName && groupName) {
      socket.emit("joinGroup", { userName, groupName });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { groupName, userName, message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  return (
    <div>
      {!joined ? (
        <div>
          <input placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
          <input placeholder="Group Name" onChange={(e) => setGroupName(e.target.value)} />
          <button onClick={joinGroup}>Join Group</button>
        </div>
      ) : (
        <div>
          <div>
            {chat.map((msg, index) => (
              <p key={index}><strong>{msg.userName}:</strong> {msg.message}</p>
            ))}
          </div>
          <input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Edit;


// export default Edit = <d</dev>