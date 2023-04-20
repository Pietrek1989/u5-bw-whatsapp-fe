export interface User {
	_id: string,
	name: string
	email: string
	avatar?: string
}

export interface Chat {
	_id: string,
	members: User[]
	messages: Message[]
}

export interface Message {
	_id?: string,
	sender: User
	content: {
		text?: string
		media?: string
	}
	createdAt: Date
}