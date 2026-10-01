import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b
     border-zinc-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-10">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">

            <Sparkles size={20} className="text-white" />

          </div>

          <h1 className="text-2xl font-bold tracking-wide">

            Veda<span className="text-blue-500">Book</span>

          </h1>

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-10">

          {/* <a
            href="#features"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            Features
          </a> */}

          {/* <a
            href="#pricing"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            Pricing
          </a> */}

          {/* <a
            href="#about"
            className="text-zinc-400 hover:text-white transition duration-300"
          >
            About
          </a> */}

        </nav>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all
             duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"          >
            Get Started
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 transition"
        >

          {open ? <X /> : <Menu />}

        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80" : "max-h-0"
          }`}
      >

        <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-6 space-y-5">

          <a href="#features" className="block">
            Features
          </a>

          <a href="#pricing" className="block">
            Pricing
          </a>

          <a href="#about" className="block">
            About
          </a>

          <Link
            to="/login"
            className="block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block bg-blue-600 text-center py-3 rounded-xl font-semibold hover:bg-blue-700 
            transition" >
            Get Started
          </Link>

        </div>

      </div>

    </header>

  );

}

export default Navbar;