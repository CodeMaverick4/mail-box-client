import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const IsLoggedIn = ({children})=>{    
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    
    return(
        isLoggedIn ? children : <Navigate to={"/"} /> 
    )
}

export default IsLoggedIn