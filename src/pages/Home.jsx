import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-[#09090B] text-white min-h-screen overflow-hidden">

      <Navbar />

      {/* Hero */}

      <section className="relative pt-36 pb-24">

        {/* Background Blur */}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center">

            {/* Badge */}

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-5 py-2 rounded-full text-sm text-zinc-300"

            >

              <Sparkles size={16} />

              AI Powered PDF Assistant

            </motion.div>

            {/* Heading */}

            <motion.h1

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: .2 }}

              className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight"

            >

              Chat With

              <br />

              <span className="text-blue-500">

                Your Documents

              </span>

            </motion.h1>

            {/* Subtitle */}

            <motion.p

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              transition={{ delay: .4 }}

              className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg md:text-xl leading-8"

            >

              Upload PDFs, Notes and Text files.

              Ask questions using AI and get accurate answers

              in seconds with your personal AI assistant.

            </motion.p>

            {/* Buttons */}

            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              transition={{ delay: .6 }}

              className="mt-12 flex flex-col sm:flex-row justify-center gap-5"

            >

              <Link

                to="/register"

                className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-600/30"

              >

                Get Started

                <ArrowRight size={18} />

              </Link>

              <Link

                to="/login"

                className="border border-zinc-700 rounded-2xl px-8 py-4 hover:bg-zinc-900 transition"

              >

                Login

              </Link>

            </motion.div>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-3 gap-8 mt-24">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition-all hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">

                <FileText />

              </div>

              <h3 className="text-2xl font-semibold">

                Upload PDFs

              </h3>

              <p className="text-zinc-400 mt-4 leading-7">

                Upload multiple PDF documents and let AI understand every page.

              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition-all hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">

                🤖

              </div>

              <h3 className="text-2xl font-semibold">

                AI Chat

              </h3>

              <p className="text-zinc-400 mt-4 leading-7">

                Ask anything from your uploaded documents and get instant answers.

              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition-all hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">

                🔒

              </div>

              <h3 className="text-2xl font-semibold">

                Secure

              </h3>

              <p className="text-zinc-400 mt-4 leading-7">

                Your documents stay private and are only used for your conversations.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

<section className="py-24 px-6">

  <div className="max-w-6xl mx-auto rounded-[32px] border border-zinc-800 bg-zinc-900 overflow-hidden">

    <div className="px-8 md:px-16 py-20 text-center">

      <h2 className="text-4xl md:text-5xl font-bold">

        Ready to chat with your PDFs?

      </h2>

      <p className="text-zinc-400 mt-6 max-w-2xl mx-auto leading-8">

        Upload your documents and experience a faster,
        smarter and more accurate AI assistant.

      </p>

      <Link

        to="/register"

        className="inline-flex mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"

      >

        Get Started

      </Link>

    </div>

  </div>

</section>

{/* Footer */}

<footer className="border-t border-zinc-800">

  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-5">

    <div>

      <h2 className="text-2xl font-bold">

        AI<span className="text-blue-500">PDF</span>

      </h2>

      <p className="text-zinc-500 mt-2">

        AI Powered PDF Chat Application

      </p>

    </div>

    <p className="text-zinc-500">

      © 2026 AI PDF ChatBot. All Rights Reserved.

    </p>

  </div>

</footer>

    </div>
  );
}

export default Home;