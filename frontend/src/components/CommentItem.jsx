// importing necessary hooks and components
import { useState, useRef } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineOutlinedFlag } from "react-icons/md";

function CommentItem({ comment, thisComment, setThisComment, render, setRender }) {

// getting token from localStorage
    const token = localStorage.getItem("token");
  
  // state variables to store the username and avatar
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  
  // state variable to store comment menu status and edit status
  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  
  // state to store edit comment input
  const [commentText, setCommentText] = useState(comment.text);
  
  // reference variable to store the reference of edit comment input
    const textAreaRef = useRef(null);
  
// function to resize the edit comment input as per the number of lines
  const autoResize = (e) => {
        const el = textAreaRef.current;
        if (el) {
          el.style.height = 'auto';
          el.style.height = `${el.scrollHeight}px`;
        }
        setCommentText(e.target.value);
      };
  
// function to submit edit comment
  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target[0].value;
    try {
      const res = await fetch(`http://localhost:5000/api/comment/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: `JWT ${token}` },
        body: JSON.stringify({ text: `${text}` })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Comment editing failed');
      e.target[0].value="";
      setEdit(false);
      setMenu(false);
      setRender(!render);
    } catch (err) {
      console.log(err.message);
    }
  }

// function to delete the comment
  async function deleteComment() {
    try {
      const res = await fetch(`http://localhost:5000/api/comment/${comment._id}`, {
        method: 'DELETE',
        headers: { authorization: `JWT ${token}` },
      });
      if (!res.ok) throw new Error(data.message || 'Comment editing failed');
      setRender(!render);
    } catch (err) {
      console.log(err.message);
    }
  }
  
// function to open edit comment
    function editComment() {
      setEdit(true);
    }

// function to close edit comment
  function handleCancel() {
    setEdit(false);
    setMenu(false);
  }

// function to toggle comment menu
  function toggleMenu() {
    setMenu(!menu);
    setThisComment(comment._id);
  }

// rendering the comment item with the user avatar and username and comment menu
  return (
    <>
    {!edit?(
      <div className="comment-item">
      <div className="comment-item-detail">
        <img src={comment.user.avatar} alt="avatar" height={45} />
        <div className="comment-item-details">
          <p className="comment-item-username">@{comment.user.username}</p>
          <p className="comment-item-text">{comment.text}</p>
          <div className="comment-item-feedback">
            <BiLike size={20} />
            <BiDislike size={20} />
            <p>Reply</p>
          </div>
        </div>
      </div>
      <BsThreeDotsVertical size={20} onClick={toggleMenu} className="comment-dots" />
      {menu && thisComment==comment._id?(
        <div className="comment-item-options">
        {username==comment.user.username?(
          <>
          <button className="comment-item-option" onClick={editComment} ><GoPencil size={20} /> Edit</button>
          <button className="comment-item-option" onClick={deleteComment} ><RiDeleteBin6Line size={20} /> Delete</button>
          </>
        ):(
          <button className="comment-item-option"><MdOutlineOutlinedFlag size={20} /> Report</button>
        )}
      </div>
      ):(
        <></>
      )}
    </div>
    ):(
      <div className="your-comment">
          <img src={avatar} alt="avatar" height={45} style={{borderRadius: '50%'}} />
          <form onSubmit={handleSubmit} className="add-comment">
            <textarea ref={textAreaRef} value={commentText} onChange={autoResize} placeholder="Add a comment..." className="comment-text" />
            <div className="comment-btns">
              <button onClick={handleCancel} className="cancel-comment">Cancel</button>
              <button className="comment-btn" type="submit">Save</button>
            </div>
          </form>
        </div>
    )}
    </>
  )
}

export default CommentItem;