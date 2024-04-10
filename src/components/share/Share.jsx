import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material';
import React, { useContext, useRef, useState } from 'react'
import "../share/share.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {
  const { user } = useContext(AuthContext);
  const FB = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  // console.log('useruser', user);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/upload", formData);
        const imageUrl = response.data.imageUrl;
        newPost.img = imageUrl;
      } catch (err) {
        console.log("Upload error:", err);
      }
    }

    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className='shareProfileImg'
            src={user.profilePicture ? FB + user.profilePicture : FB + "no_profile_img.png"}
            alt=""
          />
          <input
            placeholder={`What's in you mind ${user.username} ?`}
            className='shareInput'
            type="text"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className="sahareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id='file'
                accept='.png,.jpeg,.jpg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor='blue' className='shareIcon' />
              <span className="sahareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor='green' className='shareIcon' />
              <span className="sahareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className="sahareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  )
};
