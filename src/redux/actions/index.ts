import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat, User } from "../../interfaces";

export const getUserData = createAsyncThunk(
    "users/getUserInfo",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
                headers: { Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`}
            })
            return (await res.json()) as User
        } catch (error) {
            return thunkAPI.rejectWithValue(Error)
            
        }
    }
)

export const getChats = createAsyncThunk(
    "users/getChats",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
                headers: { Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`}
            })
            return (await res.json()) as Chat[]
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        } 
    }
)

export const getHistory = createAsyncThunk(
    "users/getHistory",
    async (chatId: string, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/chats/${chatId}`, {
                headers: { Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`}
            })
            if (res.ok) {
                return (await res.json()) as Chat
            } else {
                return thunkAPI.rejectWithValue("fetching error")
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const postNewMessage = createAsyncThunk(
    "users/postNewMessage",
    async (data: {chatId: string, message: string}, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/chats/${data.chatId}`, { //wrong route as there is no socketio yet, ignore this
                method: "POST",
                body: JSON.stringify({message: data.message}),
                headers: { Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`, "Content-Type": "application/json"},
            })
            if (res.ok) {
                return (await res.json()) as Chat
            } else {
                return thunkAPI.rejectWithValue("fetching error")
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

/* export const addNewMessage = createAsyncThunk(
    "users/addNewMessage",
    async (msg: string, thunkAPI) => {
        try {
            
        } catch (error) {
            
        }
    }
) */