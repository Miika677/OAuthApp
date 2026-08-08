import { useEffect, useState } from 'react'

import { getRequest, postRequest } from '../api.js'
import { ERROR_CODES } from '../constants/errors.js'
import { TROPHY, WRITE } from '../constants/icons.js'

function Submissions() {
  const [submissionsList, setSubmissionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [userName, setUsername] = useState("Your");
  const [lookUpInput, setLookUpInput] = useState("");

  const [errorMessage, setErrorMessage] = useState("")

 

  const fetchSubmissions = async (optionalUser = "") => {
    let data = await getRequest("/submissions" + optionalUser);

    //Return currently logged in users submissions if http error occurs during user search
    if (data?.detail?.code) {   
      setErrorMessage(optionalUser ? data.detail.message : "");
      setLoading(false);
      return false;
    }

      setSubmissionsList(data);
      setErrorMessage("");
      setLoading(false);
      return true;

  }

  async function handleLookUp(userSearch) {
    //Check if text input is empty
    if (!userSearch.trim()) {
      await fetchSubmissions();
      setUsername("Your");
      return;
    }
    
    const success = await fetchSubmissions(`?username=${userSearch}`);
    setUsername(success ? `${userSearch}'s` : "Your");
    setLookUpInput("");

  }

  useEffect(()=> {
    fetchSubmissions(); 
    }, []);

  //Error message timeout effect
  useEffect(() => {
  if (!errorMessage) return;

  const timer = setTimeout(() => {
    setErrorMessage("");
  }, 5000);

  return () => clearTimeout(timer);
  }, [errorMessage]);

  return(
      <div className="mx-2 mx-md-5 mx-lg-0">
        <div>
          <form
          onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          handleLookUp(lookUpInput);      
          }}
          className="d-flex gap-2"
          >
            <input
              type="text"
              value={lookUpInput}
              onChange={(e) => setLookUpInput(e.target.value)}
              placeholder="Look up another user"
            />
            <button type="submit" className="btn btn-primary">
              Look Up
            </button>
            
            

          </form>

          {errorMessage&&<p className="text-danger">Error: {errorMessage}</p>}

        </div>

        <p>{userName} submissions</p>

        <div>
          {submissionsList.map((submission) => (
            <div className="d-flex align-items-center" key={submission.word}>
                <span className="fs-3">{submission.word}</span>
                
                <div className="d-flex ms-auto">
                  {submission.is_first_submitted && <img
                  src={WRITE}
                  alt="First to submit this word"
                  title="First to submit this word"
                  style={{ cursor: "pointer", width: "30px", height: "30px" }}
                  />}


                  {submission.has_been_wotd && <img
                  src={TROPHY}
                  alt="Has been the highest rated word"
                  title="Has been the highest rated word"
                  style={{ cursor: "pointer", width: "30px", height: "30px" }}
                  />}
                </div>
            </div>
        ))}
      </div>


      </div>

  )
}

export default Submissions;