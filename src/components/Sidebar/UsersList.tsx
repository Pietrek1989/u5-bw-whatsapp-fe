import { useEffect, useState } from "react"
import { Col, Modal } from "react-bootstrap"
import { BsPencilSquare } from "react-icons/bs"
import { User } from "../../interfaces"


const UsersList: React.FC<{setShowUsers: React.Dispatch<React.SetStateAction<boolean>>, showUsers: boolean}> = ({showUsers, setShowUsers}) => {
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
        <>
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
                    <p>
                        {u.name}
                    </p>
                ) }
            </div>
            <BsPencilSquare size={24} onClick={() =>setShowUsers(false)}/>
        </div>
{/*         <Modal className="left fade" show={showUsers} onHide={() => setShowUsers(false)}>
            <Modal.Header>
                <Modal.Title>New Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex">
                    <BsPencilSquare size={24} onClick={() =>setShowUsers(false)}/>
                </div>
            </Modal.Body>
        </Modal> */}
        </>
    )
}
export default UsersList