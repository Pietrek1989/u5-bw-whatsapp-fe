import { useEffect, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import { User } from "../../interfaces"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { newChat } from "../../redux/actions"


const UsersList: React.FC<{setShowUsers: React.Dispatch<React.SetStateAction<boolean>>, showUsers: boolean}> = ({showUsers, setShowUsers}) => {
    const user = useAppSelector(state => state.users.userInfo)
    const dispatch = useAppDispatch()
    const [users, setUsers] = useState<User[]>([])
    const fetchUsers = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                setUsers(data)
            } else {
                console.log("Problem fetching users")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])

    return (
        <div className="users-list">
            <div className="users-header">
                <button onClick={() => setShowUsers(false)}>
                    <svg
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1"
                        x="0px"
                        y="0px"
                        enable-background="new 0 0 24 24"
                    >
                        <path
                        fill="currentColor"
                        d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
                        ></path>
                    </svg>
                </button>
                <h5 className="m-0">New Chat</h5>
            </div>
            <div className="users">
                {users && users.map(u => 
                    <div key={u._id} className="contact-item" onClick={() => {dispatch(newChat(u._id))}}>
                        <img className="contact-avatar" src={u.avatar ? u.avatar : "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg"} alt={"bla"} />
                        <div className="contact-details">
                            <h4 className="contact-name">{u.name} {u._id === user._id ? "(you)" : ""}</h4>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    )
}
export default UsersList