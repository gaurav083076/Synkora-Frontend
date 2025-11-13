import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesRef = useRef(null);
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(
        BASE_URL + "/chat/" + targetUserId,
        { withCredentials: true }
      );
      const formatted = chat?.data?.messages.map((msg) => ({
        name: msg.firstName,
        avatar: msg.avatar || "/assets/profile-avatar.png",
        text: msg.text,
        time: new Date(msg.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fromMe: msg.fromMe,
      }));
      setMessages(formatted || []);
      setTimeout(() => scrollToBottom(), 50);
    } catch (err) {
      console.error("Chat fetch error:", err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const newSocket = createSocketConnection();
    setSocket(newSocket);
    newSocket.emit("joinChat", { userId, targetUserId });
    newSocket.on("messageReceived", ({ firstName, newMessage, photoUrl, senderId }) => {
      if (!newMessage?.trim()) return;
      if (senderId === userId) return;
      setMessages((prev) => {
        const updated = [
          ...prev,
          {
            fromMe: false,
            name: firstName,
            text: newMessage,
            avatar: photoUrl || "/assets/profile-avatar.png",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
        setTimeout(() => scrollToBottom(), 20);
        return updated;
      });
    });

    return () => newSocket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      newMessage,
    });

    const outgoing = {
      fromMe: true,
      name: user.firstName,
      avatar: user.photoUrl || "/assets/profile-avatar.png",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => {
      const updated = [...prev, outgoing];
      setTimeout(() => scrollToBottom(), 10);
      return updated;
    });

    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  return (
    <div className="h-full flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-[#00000050] backdrop-blur-md rounded-3xl shadow-lg w-full max-w-3xl flex flex-col p-6 h-[700px]">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Chat</h1>

        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto mb-4 flex flex-col gap-3"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat ${msg.fromMe ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={msg.avatar || "/assets/profile-avatar.png"}
                    alt={msg.name}
                    onError={(e) => (e.target.src = "/assets/profile-avatar.png")}
                  />
                </div>
              </div>
              <div className="chat-header text-white">
                {msg.name}
                <time className="text-xs opacity-50 ml-2">{msg.time}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50 text-white">
                {msg.fromMe ? "Delivered" : "Seen"}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-end">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-4 rounded-2xl focus:outline-none resize-none h-12 max-h-32 text-black"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#F28383] via-[#9D6CD2] to-[#481EDC] text-white font-semibold px-6 py-3 rounded-2xl hover:scale-105 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;