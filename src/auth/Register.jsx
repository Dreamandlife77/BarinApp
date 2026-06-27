import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Auth.png";

import { registerUser } from "../api/auth";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleRegister =
    async () => {

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      if (
        password !==
        confirmPassword
      ) {
        return alert(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        const data =
          await registerUser({
            name,
            email,
            password,
          });

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        navigate("/home");

      } catch (err) {

        alert(
          err?.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="min-h-screen bg-[#020617] px-6">

      {/* Logo */}

      <div className="pt-10 flex justify-center">

        <img
          src={logo}
          alt=""
          className="
            w-60
            object-contain
          "
        />

      </div>

      {/* Heading */}

      <div className="mt-6 text-center">

        <h1
          className="
            text-white
            text-3xl
            font-bold
          "
        >
          Create Account
        </h1>

        <p className="text-slate-400 mt-2">
          Join the BARIN mining ecosystem
        </p>

      </div>

      {/* Form */}

      <div className="mt-8 space-y-4">

        <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  className="
    w-full
    bg-[#091827]
    text-white
    rounded-2xl
    p-4
    outline-none
  "
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="
    w-full
    bg-[#091827]
    text-white
    rounded-2xl
    p-4
    outline-none
  "
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  className="
    w-full
    bg-[#091827]
    text-white
    rounded-2xl
    p-4
    outline-none
  "
/>

<input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(
      e.target.value
    )
  }
  className="
    w-full
    bg-[#091827]
    text-white
    rounded-2xl
    p-4
    outline-none
  "
/>

      </div>

      <button
  onClick={handleRegister}
  disabled={loading}
  className="
    w-full
    mt-8
    py-4
    rounded-2xl
    bg-yellow-500
    text-black
    font-bold
  "
>
  {
    loading
      ? "Creating..."
      : "CREATE ACCOUNT"
  }
</button>

      <div className="mt-8 text-center">

        <span className="text-slate-400">
          Already have an account?
        </span>

        <button
          onClick={() =>
            navigate("/login")
          }
          className="
            ml-2
            text-yellow-500
            font-bold
          "
        >
          Login
        </button>

      </div>

    </div>
  );
}