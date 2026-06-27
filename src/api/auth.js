import axios from "axios";

const API = axios.create({
  baseURL:
     //"http://localhost:5000/api/auth",
     //"http://18.171.221.21:5000/api/auth",
     `${import.meta.env.VITE_API_URL}/api/auth`
});


export const googleLogin =
  async ({
    googleId,
    email,
    name,
  }) => {

    const response =
      await API.post(
        "/google-login",
        {
          googleId,
          email,
          name,
        }
      );

    return response.data;
};

export const loginUser =
  async ({
    email,
    password,
  }) => {

    const response =
      await API.post(
        "/login",
        {
          email,
          password,
        }
      );

    return response.data;
  };

  // api/auth.js

export const telegramLogin =
  async (telegramUser) => {

    const response =
      await API.post(
        "/telegram-login",
        telegramUser
      );

    return response.data;
};

export const registerUser =
  async ({
    name,
    email,
    password,
  }) => {

    const response =
      await API.post(
        "/register",
        {
          name,
          email,
          password,
        }
      );

    return response.data;
  };