import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleLogin = async (e) => {

    e.preventDefault();

    if (!form.email.trim()) {

      return toast.error(
        "Email is required"
      );

    }

    if (!form.password.trim()) {

      return toast.error(
        "Password is required"
      );

    }

    try {

      setLoading(true);

      const res = await api.post(
        "/user/login",
        form
      );

      if (res.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        setUser(res.data.user);

        toast.success(
          res.data.message ||
          "Login Successful"
        );

        navigate("/chat");

      } else {

        toast.error(
          res.data.message ||
          "Invalid email or password"
        );

      }

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

      );

    } finally {

      setLoading(false);

    }



  };

  return (

    <div className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">

      {/* Background Blur */}

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[170px]" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* Card */}

      <div className="relative flex items-center justify-center min-h-screen px-5 py-10">

        <div className="w-full max-w-md">

          {/* Logo */}

          <div className="text-center mb-10">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-bold">

                AI

              </div>

              <h1 className="text-3xl font-bold">

                AI
                <span className="text-blue-500">
                  PDF
                </span>

              </h1>

            </Link>

          </div>

          {/* Form Card */}

          <form

            onSubmit={handleLogin}

            className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 md:p-10 shadow-2xl"

          >

            <h2 className="text-3xl font-bold text-center">

              Welcome Back 👋

            </h2>

            <p className="text-zinc-400 text-center mt-3 leading-7">

              Login to continue chatting
              with your AI assistant.

            </p>

            {/* Email */}

            <div className="mt-8">

              <label className="text-sm text-zinc-400">

                Email

              </label>

              <div className="mt-2 flex items-center bg-zinc-800 border border-zinc-700 rounded-2xl px-5">

                <Mail
                  size={20}
                  className="text-zinc-500"
                />

                <input

                  type="email"

                  name="email"

                  value={form.email}

                  onChange={handleChange}

                  placeholder="Enter your email"

                  className="w-full bg-transparent px-4 py-4 outline-none"

                />

              </div>

            </div>

            {/* Password */}

            <div className="mt-6">

              <label className="text-sm text-zinc-400">

                Password

              </label>

              <div className="mt-2 flex items-center bg-zinc-800 border border-zinc-700 rounded-2xl px-5">

                <Lock
                  size={20}
                  className="text-zinc-500"
                />

                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  value={form.password}

                  onChange={handleChange}

                  placeholder="Enter your password"

                  className="w-full bg-transparent px-4 py-4 outline-none"

                />

                <button

                  type="button"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                  }

                </button>

              </div>

            </div>

            {/* Forgot */}

            <div className="mt-4 text-right">

              <button className="text-blue-500 hover:text-blue-400 transition">

                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:text-blue-400 transition"
                >
                  Forgot Password?
                </Link>

              </button>

            </div>

            {/* Button */}

            <button
              disabled={loading}

              className="
              w-full
              mt-8
              bg-blue-600
              hover:bg-blue-700
              rounded-2xl
              py-4
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-300
              hover:scale-[1.02]
              shadow-lg
              shadow-blue-600/20
              "

            >

              {loading
                ? "Please Wait..."
                : (
                  <>
                    Login

                    <ArrowRight size={18} />
                  </>
                )}

            </button>

            {/* Bottom */}

            <p className="mt-8 text-center text-zinc-400">

              Don't have an account?

              <Link

                to="/register"

                className="ml-2 text-blue-500 hover:text-blue-400"

              >

                Create Account

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;