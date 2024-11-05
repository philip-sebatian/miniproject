'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUserId = localStorage.getItem('userId');
  const friendId = localStorage.getItem('lastchatted');

  // Fetch messages when component mounts
  useEffect(() => {
    if (!currentUserId || !friendId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messages?senderId=${currentUserId}&receiverId=${friendId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentUserId, friendId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUserId || !friendId) return;

    try {
      const response = await axios.post('/messages', {
        senderId: currentUserId,
        receiverId: friendId,
        content: newMessage,
      });

      if (response.status === 201) {
        const newMsg: Message = {
          id: response.data.id,
          content: newMessage,
          senderId: currentUserId,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-room">
      <div className="header">
        <h2>Chat with Friend ID: {friendId}</h2>
      </div>

      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
            <p className="message-content">{msg.content}</p>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <style jsx>{`
        .chat-room {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #ddd;
        }

        .header {
          background-color: #075E54;
          color: #fff;
          padding: 1rem;
          text-align: center;
          font-weight: bold;
        }

        .message-list {
          flex-grow: 1;
          padding: 1rem;
          overflow-y: auto;
          background-color: #e5ddd5;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 70%;
          margin: 0.5rem 0;
          padding: 0.5rem 1rem;
          border-radius: 15px;
          font-size: 0.9rem;
        }

        .message.sent {
          align-self: flex-end;
          background-color: #DCF8C6;
          color: #000;
          border-bottom-right-radius: 0;
        }

        .message.received {
          align-self: flex-start;
          background-color: #fff;
          color: #000;
          border-bottom-left-radius: 0;
        }

        .message-content {
          margin-bottom: 0.3rem;
        }

        .timestamp {
          font-size: 0.75rem;
          text-align: right;
          color: #999;
        }

        .message-input {
          display: flex;
          padding: 0.75rem;
          background-color: #f0f0f0;
          border-top: 1px solid #ddd;
        }

        .message-input input {
          flex-grow: 1;
          padding: 0.5rem;
          border-radius: 20px;
          border: 1px solid #ddd;
          margin-right: 0.5rem;
        }

        .message-input button {
          background-color: #075E54;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .message-input button:hover {
          background-color: #128C7E;
        }
      `}</style>
    </div>
  );
}
