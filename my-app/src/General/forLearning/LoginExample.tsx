import {useDispatch} from "react-redux";
import {login,logout} from './features/UserReducer'


function LoginExample() {
    const dispatch = useDispatch();
  
    return (
    <div className="app">
     <button onClick={()=>{
     dispatch(login({name:"name1",age:25,email:"email1"})) 
     }}>Login</button>

     <button onClick={()=>{
     dispatch(logout()) 
     }}>Log-Out</button>
    
    </div>
  );
}

export default LoginExample;
