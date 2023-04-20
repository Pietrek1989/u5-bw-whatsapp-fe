import { Chat, Message } from "../interfaces"

export interface Store {
    userInfo: {
        _id: string,
        name: string,
        email: string,
        avatar?: string,
    },
    chats: {
        active: string,
        history: Message[],
        list: Chat[]
    },
    error?: string,
    loading: boolean
}