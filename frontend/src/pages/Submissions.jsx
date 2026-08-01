import { useEffect, useState } from 'react'

import { getRequest, postRequest } from '../api.js'
import { TROPHY, WRITE } from '../constants/icons.js'

function Submissions() {
  const [submissionsList, setSubmissionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [userName, setUsername] = useState("Your");
  const [lookUpInput, setLookUpInput] = useState("");

  const fetchSubmissions = async (optionalUser = "") => {
    let data = await getRequest("/submissions" + optionalUser);

    //Fallback for changing displayed username
    let success = true;

    if (data === null && optionalUser) {
      data = await getRequest("/submissions");
      success = false;
    }   
    
    setSubmissionsList(data);
    setLoading(false);

    return(success) 
  }

  async function handleLookUp(userSearch) {
    //Check if text input is empty
    if (!userSearch.trim()) {
      await fetchSubmissions();
      setUsername("Your");
      return;
    }
    
    const success = await fetchSubmissions(`?username=${userSearch}`);
    if(success === true) {
      setUsername(`${userSearch}'s`)
    }
    else {
      setUsername("Your")
    }
    
    setLookUpInput("");
  }


  useEffect(()=> {
    fetchSubmissions(); 
    }, [])
  

  return(
      <div className="mx-2 mx-md-5 mx-lg-0">

        <form
        onSubmit={(e) => {
        e.preventDefault();
        handleLookUp(lookUpInput);
        setLoading(true);
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