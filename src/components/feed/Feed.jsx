import React, { useContext, useEffect, useState } from 'react';
import "../feed/feed.css";
import Share from '../share/Share';
import Post from '../post/Post';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
// import { Posts } from '../../dummyData';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username ?
          await axios.get(`/post/profile/${username}`) :
          await axios.get("/post/timeline/" + user._id);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="feedWrapeer">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
};
