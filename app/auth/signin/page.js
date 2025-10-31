"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/userSlice";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ emailOrName: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  // =====andle input change====
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // ======handle form submit====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Logging in...");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "❌ Something went wrong");
      } else {
        setMessage(`✅ Welcome ${data.user.name}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        dispatch(setUser({
          user: data.user,
          token: data.token
        }));

        router.push("/dashboard");
      }
    } catch (error) {
      setMessage("⚠️ Network error, please try again.");
    }
  };


  async function sendVerification() {
    const code = Math.floor(1000 + Math.random() * 9000);
    const email = form.emailOrName;
    const res = await fetch("/api/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
  }



  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-5">Sign In</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border p-5 rounded flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label>User Name or Email</label>
          <input
            type="text"
            name="emailOrName"
            value={form.emailOrName}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
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
          Sign In
        </button>
      </form>

      {message && <p className="pt-4 text-sm">{message}</p>}

      <div className="flex gap-5 pt-5 text-blue-500">
        <Link href="/auth/signup">Sign Up Here</Link>
        {form.emailOrName && (
          <Link href={`/auth/forgot-password/${encodeURIComponent(form.emailOrName)}`} onClick={sendVerification} >
            Forgot Password?
          </Link>
        )}

      </div>
    </div>
  );
}
