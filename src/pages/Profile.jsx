import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { User, Mail, Database } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-[#09090B] text-white font-sans antialiased">

  <Sidebar />

  <div
    className="
    lg:ml-72
    h-screen
    overflow-y-auto
    "
  >
        {/* <Navbar /> */}
<main
  className="
  min-h-screen
  p-6
  max-w-5xl
  mx-auto
  "
>
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              My Profile
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              Manage your personal information and application usage statistics.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto sm:mx-0 shadow-lg">
            <div className="space-y-6">

              <div>
                <label className="text-zinc-400 block text-sm font-medium mb-2 flex items-center gap-2">
                  <User size={16} className="text-blue-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none cursor-default select-none focus:border-zinc-700 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="text-zinc-400 block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none cursor-default select-none focus:border-zinc-700 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="text-zinc-400 block text-sm font-medium mb-2 flex items-center gap-2">
                  <Database size={16} className="text-blue-500" />
                  Remaining Tokens
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={user?.tokens ?? 0}
                    readOnly
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-blue-400 font-bold outline-none cursor-default select-none focus:border-zinc-700 text-sm sm:text-base"
                  />
                  <span className="absolute right-4 text-xs font-semibold bg-blue-600/10 text-blue-500 px-2.5 py-1 rounded-md border border-blue-500/20">
                    Active Credits
                  </span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;