import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Send, Plus, Paperclip, Loader2, Trash2, MessageSquare } from "lucide-react";


import toast from "react-hot-toast";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfs, setSelectedPdfs] = useState([]);

  const { user, setUser } = useAuth();
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {

    loadHistory();

  }, []);


  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      alert("Please login again");
      return;
    }

    const currentUser = JSON.parse(storedUser);
    const userMessage = {
      role: "user",
      text: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      setLoading(true);
      console.log("SELECTED PDFS BEFORE SEND:", selectedPdfs);
      const res = await api.post("/chat/message", {

        userId: currentUser.id,
        conversationId,
        message: userMessage.text,
        selectedPDFs: selectedPdfs,
        selectedTexts: [],

      });

      const aiMessage = {
        role: "ai",
        text: res.data.aiMessage,
      };

      setConversationId(
        res.data.conversationId
      );

      loadHistory();

      const updatedUser = {
        ...currentUser,
        tokens: res.data.remainingTokens,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {

  console.log("CHAT STATUS:", error.response?.status);

  console.log(
    "CHAT ERROR:",
    error.response?.data
  );

  toast.error(
    error.response?.data?.message ||
    "Chat request failed"
  );

} finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };


  const openFilePicker = () => {
    fileRef.current?.click();
  };


  const handleFileUpload = async (e) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setUploading(true);
      const formData = new FormData();


      for (let i = 0; i < files.length; i++) {
        formData.append("pdfs", files[i]);
      }


      if (user?.id) {
        formData.append("userId", user.id);
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          formData.append("userId", JSON.parse(storedUser).id);
        }
      }

      await api.post("/pdfs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("PDF uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload PDF");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const loadHistory = async () => {

    try {

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser) return;

      const res = await api.get(
        `/chat/history/${storedUser.id}`
      );

      if (res.data.success) {

        setConversations(
          res.data.conversations
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  const openConversation = async (id) => {

    try {

      const res = await api.get(
        `/message/${id}`
      );

      if (res.data.success) {

        setConversationId(id);

        setMessages(
          res.data.messages
        );

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load chat"
      );

    }

  };

  const deleteConversation = async (id) => {

    try {

      await api.delete(
        `/conversation/${id}`
      );

      toast.success(
        "Conversation Deleted"
      );

      loadHistory();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const newChat = () => {

    setConversationId(null);

    setMessages([]);

  };

  return (
    <div className="bg-[#09090B] text-white font-sans antialiased">

      <Sidebar
        conversations={conversations}
        conversationId={conversationId}
        setConversationId={setConversationId}
        setMessages={setMessages}
        loadHistory={loadHistory}
        // pdfs={pdfs}
        selectedPdfs={selectedPdfs}
        setSelectedPdfs={setSelectedPdfs}
      />

      <div
        className="
  lg:ml-72
  h-screen
  overflow-hidden
  flex
  flex-col
  "
      >
        {/* <Navbar/> */}


        <main
          className="
flex-1
flex
flex-col
p-6
overflow-hidden
"
        >


          <div
            className="
flex-1
min-h-0
bg-zinc-900/50
border
border-zinc-800
rounded-2xl
p-4
overflow-y-auto
custom-scrollbar
scroll-smooth
"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-700/50">
                  📚
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Start a new conversation</h3>
                <p className="text-sm text-zinc-500 max-w-xs mt-1">
                  Upload your documents and ask any questions. The AI will assist you.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 px-4 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-800 border border-zinc-700/50 text-zinc-100 rounded-bl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}


            {loading && (
              <div className="flex justify-start items-center gap-2 text-zinc-400 text-sm">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span>AI is reading & thinking...</span>
              </div>
            )}


            <div ref={chatEndRef} />
          </div>


          <input
            type="file"
            accept=".pdf"
            multiple
            hidden
            ref={fileRef}
            onChange={handleFileUpload}
          />


          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex items-center gap-2 shadow-lg focus-within:border-zinc-700 transition-colors">


            <button
              onClick={openFilePicker}
              disabled={uploading}
              title="Upload PDF"
              className="w-11 h-11 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition disabled:opacity-50 cursor-pointer relative"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin text-blue-500" />
              ) : (
                <Paperclip size={20} />
              )}
            </button>

            {/* Input Field */}
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={uploading ? "Uploading document..." : "Ask anything about your document..."}
              disabled={uploading}
              className="flex-1 bg-transparent px-2 py-3 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 outline-none resize-none disabled:opacity-50"
            />

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!message.trim() || loading || uploading}
              className="h-11 px-4 sm:px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:pointer-events-none cursor-pointer"
            >
              <span className="hidden sm:inline">Send</span>
              <Send size={15} />
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Chat;