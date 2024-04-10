import React, { useContext, useEffect, useState } from 'react';
import "../post/post.css";
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
    const [like, setLike] = useState(post.like.length);
    const [isLike, setIsLike] = useState(false);
    const [users, setUsers] = useState(false);
    const FB = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    const handleLike = () => {
        try {
            axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }
        setLike(isLike ? like - 1 : like + 1);
        setIsLike(!isLike);
    };

    useEffect(() => {
        setIsLike(post.like?.includes(currentUser._id));
    }, [currentUser._id, post.like]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUsers(res.data);
        }
        fetchUsers();
    }, [post.userId]);

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${users.username}`}>
                            <img className='postPrfileImg' src={users.profilePicture ? FB + users.profilePicture : FB + "no_profile_img.png"} alt="" />
                        </Link>
                        <span className="postUsername">{users.username}</span>
                        <span className="postData">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className='postImg' src={`${FB}${post.img}`} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img onClick={handleLike} className='likeButton' src={`${FB}like.png`} alt="" />
                        <img onClick={handleLike} className='heartButton' src={`${FB}heart.jpeg`} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
