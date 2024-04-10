import React from 'react'
import "../closeFriend/closeFriend.css";

export default function CloseFriend({ users }) {
    const FB = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className='sidebarFriend'>
            <img className='sidebarFriendImg' src={FB + users.profilePicture} alt="" />
            <span className="sidebarFriendName">{users.username}</span>
        </li>
    )
}
