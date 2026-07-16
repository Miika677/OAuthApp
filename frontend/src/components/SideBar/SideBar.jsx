
import UserBar from "./UserBar"
import LoginBar from "./LoginBar"



function SideBar({user, onLogout}) {

    

    return(
    <div className="border gap-2 d-flex flex-row flex-lg-column px-2 text-truncate">

    {user ?
        (
        <UserBar user={user} onLogout={onLogout}/>
        ) : (
        <LoginBar/>
        )
    }
    </div>  
    ) 

}

export default SideBar;