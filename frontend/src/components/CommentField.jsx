import { useState } from "react";
import { postRequest } from "../api.js"

function CommentField({input, setInput, postComment}) {

    return(
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postComment(input);
          }}
          className="d-block gap-2 w-100 h-50"
        >
          <textarea
            className="form-control"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
          />

          <button type="submit" className="btn btn-primary">
            Submit Word
          </button>
        </form>
    )
}

export default CommentField;