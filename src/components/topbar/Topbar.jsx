import React, { useContext } from 'react';
import "./topbar.css";
import { Chat, Notifications, Person, Search } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const FB = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Lakruwan Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input placeholder='Search for friend, post or video' className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLink">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className='topbarIcons'>
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">
                            1
                        </span>
                        <Chat />
                        <span className="topbarIconBadge">
                            2
                        </span>
                        <Notifications />
                        <span className="topbarIconBadge">
                            3
                        </span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? FB + user.profilePicture : FB + "no_profile_img.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
};
