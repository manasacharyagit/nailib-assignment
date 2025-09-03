"use client";
import React, { useRef, useEffect, useState } from "react";
import Book from "../assets/book.png";
import Image from "next/image";
import { gsap } from "gsap";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

function Sendingguide() {
  const btnRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // button animation
  useEffect(() => {
    gsap.to(btnRef.current, {
      y: -10,
      duration: 0.8,
      ease: "bounce.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please enter both name and email!");
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        { name, email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      toast.success("Guide sent to your email!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="container text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="lg:w-1/4 md:w-1/3 w-full flex justify-center">
            <Image
              alt="ecommerce"
              className="w-48 lg:w-86 h-100 lg:h-[28rem] object-cover object-center rounded"
              src={Book}
            />
          </div>

          <div className="lg:w-2/4 md:w-2/3 w-full shadow-lg bg-gray-100 rounded-lg p-10 lg:p-14 flex flex-col">
            <h2 className="text-gray-900 text-4xl font-bold title-font mb-6">
              A GUIDE THAT WILL HELP YOU GET AN{" "}
              <span className="text-blue-500 text-3xl">
                EASY ‘A’ IN YOUR EXTENDED ESSAY!
              </span>
            </h2>

            <div className="relative mb-6">
              <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-6">
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              ref={btnRef}
              onClick={handleSubmit}
              disabled={loading}
              className="text-white cursor-pointer bg-blue-500 border-0 py-3 px-10 text-xl focus:outline-none hover:bg-indigo-600 rounded-lg "
            >
              {loading ? "Sending..." : "Get your free guide now!"}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              This FREE guide reveals the most powerful information for boosting your extended essay score...
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sendingguide;
