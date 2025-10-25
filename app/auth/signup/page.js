"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [responseData , setResponseData] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim()});
    console.log(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Processing...");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResponseData({data})
      

      if (!res.ok) {
        setMessage(data.message || "❌ Something went wrong");
      } else {
        setMessage("✅ Signup successful! You can now log in.");
        setTimeout(() => {
          router.push(`/auth/verifyOTP/${encodeURIComponent(data.user.email)}`);
        }, 500);
      }
    } catch (error) {
      setMessage("⚠️ Network error, please try again.");
    }
  };
  console.log('Response Data' ,responseData);
  

  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-5">Sign Up</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border p-5 rounded flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">User Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="border bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {message && <p className="pt-4 text-sm">{message}</p>}

      <div className="flex gap-5 pt-5 text-blue-500">
        <Link href="/">Sign in with Google</Link>
        <Link href="/">Sign in with GitHub</Link>
      </div>
    </div>
  );
}
