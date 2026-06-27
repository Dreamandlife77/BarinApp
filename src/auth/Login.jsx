import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, telegramLogin, googleLogin} from "../api/auth";

import logo from "../assets/Auth.png";
import Google from "../assets/google.png";
import Telegram from "../assets/telegram.png";
import {
  signInWithRedirect,
  getRedirectResult,
   signInWithPopup,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] =
  useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

const handleGoogleLogin = async () => {

  try {

    const isTelegram =
      window.Telegram?.WebApp;

    if (isTelegram) {

      await signInWithRedirect(
        auth,
        provider
      );

      return;
    }

    const result =
      await 
      Telegram.WebApp.openLink(`${import.meta.env.VITE_API_URL}/api/auth/google`);
      
    const googleUser =
      result.user;

    const response =
      await googleLogin({
        googleId:
          googleUser.uid,

        email:
          googleUser.email,

        name:
          googleUser.displayName,
      });

    localStorage.setItem(
      "token",
      response.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.user
      )
    );

    navigate("/home");

  } catch (err) {

    console.log(
      "Google Login Error:",
      err
    );

  }

};

useEffect(() => {

  const finishGoogleLogin =
    async () => {

      try {

        const result =
          await getRedirectResult(
            auth
          );

        console.log(
          "REDIRECT RESULT:",
          result
        );

        if (!result) {
          return;
        }

        const googleUser =
          result.user;

        const response =
          await googleLogin({
            googleId:
              googleUser.uid,

            email:
              googleUser.email,

            name:
              googleUser.displayName,
          });

        localStorage.setItem(
          "token",
          response.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        navigate("/home");

      } catch (err) {

        console.log(
          "Google Redirect Error:",
          err
        );

      }

    };

  finishGoogleLogin();

}, [navigate]);

  const handleTelegramLogin =
  async () => {

    try {

      const tg =
        window.Telegram.WebApp;

      const user =
        tg.initDataUnsafe.user;

      const response =
        await telegramLogin(user);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      navigate("/home");

    } catch (err) {

      console.log(err);

    }

};

  const handleLogin =
  async () => {

    if (!email || !password) {

      setError(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);
      setError("");

      const response =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      navigate("/home");

    } catch (error) {

      setError(
        error?.response?.data
          ?.message ||
        "Wrong Credentials"
      );

    } finally {

      setLoading(false);

    }
  };
  return (
    <div className="min-h-screen bg-[#020617] px-6">

      {/* Logo */}

      <div className="pt-12 flex justify-center">
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
          Welcome Back
        </h1>

        <p className="text-slate-400 mt-2">
          Continue your mining journey
        </p>

      </div>

      {/* Form */}

      <div className="mt-10 space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
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

        {error && (
          <p
            className="
              text-red-500
              text-sm
              mt-2
              px-1
            "
          >
            {error}
          </p>
        )}

      </div>

      {/* Login Button */}

      <button
        onClick={handleLogin}
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
        {loading
          ? "Signing In..."
          : "LOGIN"}
      </button>

      {/* Divider */}

      <div className="flex items-center gap-3 mt-8">

        <div className="flex-1 h-px bg-slate-700" />

        <span className="text-slate-400 text-sm">
          OR
        </span>

        <div className="flex-1 h-px bg-slate-700" />

      </div>

      {/* Telegram Login */}

      {/* <button
        onClick={handleTelegramLogin}
        className="
          w-full
          mt-6
          py-4
          rounded-2xl
          bg-white
          text-black
          font-bold
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <img
          src={Telegram}
          alt="Telegram"
          className="w-6 h-6"
        />

        Continue with Telegram
      </button>

     

      <button
        onClick={handleGoogleLogin}
        className="
          w-full
          mt-4
          py-4
          rounded-2xl
          bg-white
          text-black
          font-bold
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <img
          src={Google}
          alt="Google"
          className="w-6 h-6"
        />

        Continue with Google
      </button> */}

      {/* Register */}

      <div className="mt-8 text-center">

        <span className="text-slate-400">
          Don't have an account?
        </span>

        <button
          onClick={() =>
            navigate("/register")
          }
          className="
            ml-2
            text-yellow-500
            font-bold
          "
        >
          Register
        </button>

      </div>

    </div>
  );
}