import { Link } from 'react-router-dom'

import { INDEX } from '../../constants/icons'

const HOME = 'Home'

function HomeLink(){
    return(
    <Link to="/"
            className="d-flex align-items-center me-2 gap-2 py-1 text-decoration-none"
            >

                <img
                src={INDEX}
                alt={HOME}
                style={{ cursor: "pointer", width: "30px", height: "30px" }}
                />
                <span className="text-black d-none d-md-block">{HOME}</span>

    </Link>
    )
}

export default HomeLink;