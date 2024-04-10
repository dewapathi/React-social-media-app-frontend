import React, { useContext, useEffect, useState } from 'react'
import "../rightbar/rightbar.css";
import Online from '../online/Online';
import { Users } from '../../dummyData';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user }) {
  const FB = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  useEffect(() => {
    const getFriends = async () => {
      // if (user && user._id) { 
      const friends = await axios.get("/users/friends/" + user._id);
      setFriends(friends.data);
      // }
    };

    if (user && user._id) {
      getFriends();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="giftContainer">
          <img className='giftImage' src="assets/gift1.webp" alt="" />
          <span className="giftText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div><img className='rightbarAdd' src="assets/add.jpg" alt="" /><h4 className='rightbarTitle'>Online Friends</h4><ul className='rightbarFriendList'>
          {Users.map((u) => (
            <Online key={u.id} users={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "+++++"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "-----"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === "no" ? "Single" : user.relationship === "yes" ? "Married" : "Complecated"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link key={friend._id} to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img
                  className='rightbarFollowingImg'
                  src={friend.profilePicture ? friend.profilePicture : FB + "no_profile_img.png"}
                  alt=""
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  };

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
};
