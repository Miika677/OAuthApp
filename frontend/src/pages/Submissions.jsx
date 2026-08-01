import { useEffect, useState } from 'react'

import { getRequest, postRequest } from '../api.js'
import { TROPHY, WRITE } from '../constants/icons.js'

function Submissions() {
    const [submissionsList, setSubmissionsList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        
        const fetchSubmissions = async () => {
          const data = await getRequest("/submissions");
          setSubmissionsList(data)
          setLoading(false);
        }
        
        fetchSubmissions(); 
        console.log(submissionsList);
    
      }, [])
    
    return(
        <div className="mx-2 mx-md-5 mx-lg-0">
          <p>Your submissions</p>

          <div>
            {submissionsList.map((submission) => (
              <div className="d-flex align-items-center" key={submission.word}>
                  <span className="fs-3">{submission.word}</span>
                  
                  <div className="d-flex ms-auto">
                    {submission.is_first_submitted && <img
                    src={WRITE}
                    alt="i do be testing"
                    title="First to submit this word"
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                    />}


                    {submission.has_been_wotd && <img
                    src={TROPHY}
                    alt="i do be testing"
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