import { useState, useEffect } from 'react'
import { getRequest, postRequest } from "../api.js"
import CommentField from './CommentField.jsx';
import { WRITE } from '../constants/icons.js';

function GuestBook({currentUser}) {
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(()=> {
      const fetchComments = async () => {
        const data = await getRequest("/comments");
        if (data) {
          setCommentsList(data);
        }
        else {
          setCommentsList([]);
        }
        
        setLoading(false);
      }
      
      fetchComments(); 
  
  }, [])


  
  async function handleSubmitComments(postedComment) {
    
        await postRequest("/comments", {body : postedComment});
        setCommentInput("");
    
    }

  return(
  <div className="d-flex flex-column pt-2 px-4">
    <div className="d-flex border-bottom">
      <h4>What people are saying about WotD...</h4>

      {currentUser&& (
        <img
          className="d-block d-lg-none ms-4"
          src={WRITE}
          alt="test"
          style={{ cursor: "pointer", width: "30px", height: "30px" }}
          onClick={() => setShowModal(true)}
        />
      )}

      {showModal&& (<span>LOL</span>)}

    </div>
    
    {/* List of comments div */}
    <div className="flex-grow-1 overflow-auto px-lg-1">

      {/* Individual comment rendering */}
      {[...commentsList].reverse().map((comments) => (
          <div className="d-flex py-2" key={comments.id} >

            <div style={{ 
              width: "5px",  
              backgroundColor: 
                comments.user.id === currentUser?.id ? "green" : "gray"}}
              className="rounded-5 flex-shrink-0"
            />

            <div className="d-flex flex-column mx-2">

              <div className="d-flex gap-1 align-items-center">
                  <img
                  src={comments.user.avatar}
                  alt="Avatar"
                  style={{width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                  <span>{comments.user.username}</span>
              </div>

              <div className="d-flex flex-column border rounded-4 p-2 mt-2 text-break">

                <p className="text-muted m-0">
                  <small>
                    {new Date(comments.date).toLocaleString()}
                  </small>
                </p>

                <span style={{ whiteSpace: "pre-wrap" }}>{comments.body}</span>

              </div>

            </div>
          </div>
          
      ))}
    </div>

    {showModal&&
      <div className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 9999
        }}
        onClick={() => setShowModal(false)}
      >

        <div
          onClick={(e)=>e.stopPropagation()}
        >

          <CommentField
            input={commentInput}
            setInput={setCommentInput}
            postComment={() => {
              handleSubmitComments(commentInput);
              setShowModal(false);
            }}
          />

        </div>

      </div>
    }

    {currentUser&& (
    <div className="d-none d-lg-flex">
      <CommentField
        input={commentInput}
        setInput={setCommentInput}
        postComment={() => handleSubmitComments(commentInput)}
      />
    </div>
    )}

  </div>
  )
}

export default GuestBook;