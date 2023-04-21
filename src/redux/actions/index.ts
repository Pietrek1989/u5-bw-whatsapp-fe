import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat, User } from "../../interfaces";

export const getUserData = createAsyncThunk(
  "users/getUserInfo",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });

      if (res.ok) {
        return (await res.json()) as User;
      } else if (res.status === 401) {
        // access token has expired or is invalid, refresh access token
        await refreshAccessToken();

        // try to get user data again
        const newAccessToken = localStorage.getItem("accessToken");
        console.log("the updated access", newAccessToken);
        if (newAccessToken) {
          const response = await fetch(
            `${process.env.REACT_APP_BE_URL}/users/me`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          if (response.ok) {
            return (await response.json()) as User;
          }
        }
        // if we still can't get user data, redirect to login page

        return thunkAPI.rejectWithValue(new Error("Failed to get user data"));
      } else {
        return thunkAPI.rejectWithValue(new Error("Failed to get user data"));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChats = createAsyncThunk(
  "users/getChats",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });
      return (await res.json()) as Chat[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHistory = createAsyncThunk(
  "users/getHistory",
  async (chatId: string, thunkAPI) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );
      if (res.ok) {
        return (await res.json()) as Chat;
      } else {
        return thunkAPI.rejectWithValue("fetching error");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postNewMessage = createAsyncThunk(
  "users/postNewMessage",
  async (data: { chatId: string; message: string }, thunkAPI) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/${data.chatId}`,
        {
          //wrong route as there is no socketio yet, ignore this
          method: "POST",
          body: JSON.stringify({ message: data.message }),
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "accessToken"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        return (await res.json()) as Chat;
      } else {
        return thunkAPI.rejectWithValue("fetching error");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("refresh in func", refreshToken);
  const response = await fetch("http://localhost:3001/users/session/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentRefreshToken: refreshToken,
    }),
  });
  console.log(response.status);
  if (response.ok) {
    console.log("response", response);
    const { accessToken, refreshToken } = await response.json();
    console.log("the new refresh token", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else if (response.status === 401) {
    // refresh token has expired, log user out and redirect to login page
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    window.location.href = "/";
  } else {
    console.log("last error");
  }
};
