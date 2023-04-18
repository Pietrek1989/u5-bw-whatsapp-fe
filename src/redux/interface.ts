import { Chat } from "../interfaces"

export interface Store {
    userInfo?: {
        _id: string,
        name: string,
        email: string,
        avatar?: string,
    },
    chats: {
        active: string,
        list: Chat[]
    },
    error?: string,
    loading: boolean
}