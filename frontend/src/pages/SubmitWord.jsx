import { useState } from "react";
import { postRequest } from "../api";

function SubmitWord() {
  const [wordInput, setWordInput] = useState("");

  async function handleSubmitWord(postedWord) {

      await postRequest("/word", {word : postedWord});
      setWordInput("");

  }

  return(
    <div className="d-flex flex-column align-items-center">
      <p>Submit a word</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitWord(wordInput);
        }}
        className="d-flex gap-2"
      >
        <input
          type="text"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit" className="btn btn-primary">
          Submit Word
        </button>
      </form>
    </div>
  )
}

export default SubmitWord;