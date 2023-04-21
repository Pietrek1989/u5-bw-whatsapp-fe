import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../interface";
import { Chat, Message, User } from "../../interfaces";
import { getChats, getUserData, getHistory, newChat } from "../actions";


const initialState: Store = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: "",
    list: [],
    history: []
  },
  error: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats.list = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.chats.active = action.payload;
    },
    setHistory: (
      state,
      //action: PayloadAction<{ chatId: string; history: Message[] }>
      action: PayloadAction<Message[]>
    ) => {
/*        const i = state.chats.list.findIndex(
        (c) => c._id === action.payload.chatId
      );
      state.chats.list[i].messages = action.payload.history; */
    },
    newMessage: (
      state,
      //action: PayloadAction<{ chatId: string; message: Message }>
      action: PayloadAction<Message>
    ) => {
/*       const i = state.chats.list.findIndex(
        (c) => c._id === action.payload.chatId
      );
      state.chats.list[i].messages = [
        ...state.chats.list[i].messages,
        action.payload.message,
      ]; */
      state.chats.history.push(action.payload)
    },
  },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            state.userInfo = action.payload
        })
        builder.addCase(getUserData.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
            state.userInfo = {_id: "", name: "", email: "", avatar: "",}
        })
        builder.addCase(getChats.fulfilled, (state, action) => {
            state.chats.list = action.payload
        })
        builder.addCase(getHistory.fulfilled, (state, action) => {
           /*  const i = state.chats.list.findIndex(c => c._id === action.payload._id)
            state.chats.list[i].messages = action.payload.messages */
            state.chats.history = action.payload.messages
        })
        builder.addCase(newChat.fulfilled, (state, action) => {
          if (state.chats.list.findIndex(c => c._id === action.payload._id) === -1) {
            state.chats.list.push(action.payload)
            state.chats.active = action.payload._id
          } else {
            state.chats.active = action.payload._id
          }
        })
    }
})

export const { setUserInfo, setChats, setActiveChat, setHistory, newMessage } =
  userSlice.actions;

export default userSlice.reducer;
