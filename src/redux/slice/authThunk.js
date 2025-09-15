import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout } from "./authSlicer"

const AuthLogoutThunk = ()=>{
    return async (dispatch)=>{
        try{
            await signOut(auth);
            dispatch(logout());
        }catch(err){
            alert(err.message);
        }        
    }
}

export default AuthLogoutThunk