import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
// sync -> if you have a user or not , on login and logout 
// It also exposes you lossley coupled auth functions
// 
function AuthProvider({ children }) {
    // const history = useHistory();
    const [user, userSet] = useState("");  // user set hota hai
    const [loading, setLoading] = useState(false); 
    
    async function signUp(name, password, email, confirm) {
        try {
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
            console.log("data", res.data);

        } catch (err) {
            console.log("err", err.message);
        }
    }
   
    async function login(email, password) {
        // return status
        let flag = true
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/login", {
                email: email,
                password: password
            });
           
            // checks
            if(res.status == 404){
                alert("Password or Email may be wrong")
                flag = false
            }else if(res.status == 400){
                alert("user not found kindly login")
                flag = false
            }else if(res.status == 500){
                alert("Internal server error")
                flag = false
            }else{
                userSet(res.data.user);
            }
            setLoading(false);
           // console.log("40",res.data)
           return flag;
        }
        catch (err) {
            flag = false
            console.log(err);
            setLoading(false); // error aaya toh
            return flag
        }
        console.log("login will be here");
    }
    
    function logout() {
        // localStorage.removeItem("user")
        // userSet(null);
        console.log("logout will come here");
    }

    const value = {
        user,
        login,
        signUp,
        logout
    }
    return (
        < AuthContext.Provider value={value} >
            {/* if not loading show childrens -> agar loding nhi ho rahi toh children dikha do */}
            {!loading && children}    
        </AuthContext.Provider >
    )
}
export default AuthProvider
