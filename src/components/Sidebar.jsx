import {
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlus
} from "react-icons/fi";

import {
  Plus,
  Trash2,
  MessageSquare,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";

function Sidebar({

  conversations = [],

  conversationId = null,

  setConversationId = () => { },

  setMessages = () => { },

  loadHistory = () => { },
  selectedPdfs = [],
  setSelectedPdfs = () => { },

}) {

  const navigate = useNavigate();

  const location = useLocation();

  const isChatPage = location.pathname === "/chat";

  const {
    logout,

  } = useAuth();

  const [open, setOpen] = useState(false);

  const [pdfs, setPdfs] = useState([]);

  //  const [selectedPdfs, setSelectedPdfs] = useState([]);



  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const newChat = () => {

    setConversationId(null);

    setMessages([]);

    navigate("/chat");

    setOpen(false);

  };

  const openConversation = async (id) => {

    try {

      const res = await api.get(
        `/message/${id}`
      );

      if (res.data.success) {

        const formattedMessages =
          res.data.messages.map((msg) => ({

            role:
              msg.role === "assistant"
                ? "ai"
                : "user",

            text: msg.content,

          }));

        setMessages(
          formattedMessages
        );

        setConversationId(id);

        setOpen(false);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load conversation"
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

      if (conversationId === id) {

        setConversationId(null);

        setMessages([]);

      }

    } catch (error) {

      toast.error(
        "Delete Failed"
      );

    }

  };

  const loadPDFs = async () => {

    try {

      const storedUser =
        localStorage.getItem("user");

      if (
        !storedUser ||
        storedUser === "undefined"
      ) {
        return;
      }

      const currentUser =
        JSON.parse(storedUser);

      const res = await api.get(
        `/pdfs/user/${currentUser.id}`
      );

      if (res.data.success) {

        setPdfs(res.data.pdfs);

      }

    } catch (error) {

      console.log(
        "PDF History Error:",
        error
      );

    }

  };
  useEffect(() => {

    loadPDFs();

  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-slate-900 p-3 rounded-xl"
      >
        <FiMenu size={22} />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        h-screen
        w-72
        bg-slate-900
        border-r
        border-slate-800
        flex
        flex-col
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-blue-500">VedaBook</h2>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-5">
          <button
            onClick={newChat}
            className={`
            w-full
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
            font-semibold
            transition
            ${location.pathname === "/chat"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-white"
              }
          `}
          >
            <FiPlus />
            New Chat
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">
            My PDFs & Recent Chats
          </p>

          {/* PDFs Section */}
          <div className="mb-6">
            <div className="space-y-2">
              {pdfs.length === 0 ? (
                <p className="text-zinc-600 text-sm px-2">No PDFs uploaded</p>
              ) : (
                pdfs.map((pdf) => {
                  const isSelected = selectedPdfs.includes(pdf._id);

                  return (
                    <button
                      key={pdf._id}
                      onClick={() => {
                        setSelectedPdfs((prev) => {
                          if (prev.includes(pdf._id)) {
                            return prev.filter((id) => id !== pdf._id);
                          }
                          return [...prev, pdf._id];
                        });
                      }}
                      className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-3
                      rounded-xl
                      text-left
                      transition
                      border
                      ${isSelected
                          ? "bg-blue-600/15 border-blue-500/40 text-blue-400"
                          : "border-transparent hover:bg-slate-800 text-zinc-300"
                        }
                    `}
                    >
                      <div
                        className={`
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                        ${isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-red-500/10 text-red-400"
                          }
                      `}
                      >
                        {isSelected ? "✓" : "📄"}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {pdf.fileName}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">PDF</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Conversations Section */}
          <div className="space-y-2 mb-4">
            {conversations.length === 0 ? (
              <p className="text-gray-500 text-sm">No conversations yet</p>
            ) : (
              conversations.map((chat) => (
                <div
                  key={chat._id}
                  className={`
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3
                  transition
                  ${conversationId === chat._id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 text-gray-300"
                    }
                `}
                >
                  <button
                    onClick={() => openConversation(chat._id)}
                    className="flex items-center gap-2 flex-1 text-left overflow-hidden"
                  >
                    <MessageSquare size={16} />
                    <span className="truncate">{chat.title}</span>
                  </button>

                  <button
                    onClick={() => deleteConversation(chat._id)}
                    className="p-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-slate-800 p-4 space-y-2">
          <Link
            to="/plans"
            className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            transition
            ${location.pathname === "/plans"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-300"
              }
          `}
          >
            <FiCreditCard size={18} />
            Plans
          </Link>

          <Link
            to="/profile"
            className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            transition
            ${location.pathname === "/profile"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 text-gray-300"
              }
          `}
          >
            <FiUser size={18} />
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-gray-300
            hover:bg-red-600
            transition
          "
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );

}

export default Sidebar;