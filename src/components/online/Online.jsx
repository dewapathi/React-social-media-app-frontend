import React from 'react'
import "../online/online.css"

export default function Online({ users }) {
    const FB = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className='rightBarFriend'>
            <div className="rightbarProfileImgContainer">
                <img className='rightbarProfileImg' src={FB + users.profilePicture} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{users.username}</span>
        </li>
    )
};
