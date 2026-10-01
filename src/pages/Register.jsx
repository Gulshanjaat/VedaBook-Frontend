import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

import api from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

  });

  const { setUser } = useAuth();

  const handleChange = (e) => {

    setForm((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    if (form.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/user/register",
        form
      );

      // Backend Success
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
          "Registration Successful"
        );

        navigate("/chat");

      } else {

        // Backend validation (User already exists etc.)
        toast.error(
          res.data.message ||
          "Registration Failed"
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

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center">

          Create Account

        </h1>

        <p className="text-center text-gray-400 mt-3">

          Join AI PDF ChatBot today

        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          {/* Name */}

          <div>

            <label className="text-gray-300">

              Full Name

            </label>

            <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

              <FiUser className="text-gray-400" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-transparent p-4 outline-none"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="text-gray-300">

              Email

            </label>

            <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

              <FiMail className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent p-4 outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-300">

              Password

            </label>

            <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

              <FiLock className="text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent p-4 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}

              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-xl font-semibold text-lg"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <p className="text-center mt-8 text-gray-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;