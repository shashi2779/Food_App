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
    
    // resetpassword karne ja rhe tab -> otp,email ki jarurat hogi
    // eamil,otp globally save karr liye
    const [resetPassEmail, setResetEmail] = useState(null);
    const [otpPassEmail, setOtpPassEmail] = useState(null);


    
    async function signUp(name, password, email, confirm) {
        try {
            setLoading(true)
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
           
                
            setLoading(false)
            console.log("data", res.data);

        } catch (err) {
            console.log("err", err.message);
            if (err.message == "Request failed with status code 400") {
                alert("user not found kindly login");
                setLoading(false)
                
            } 
            
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
           console.log("rtgrwtyw",res.data)
           return flag;
        }
        catch (err) {
            flag = false
            console.log(err.message);
            alert("Password or email may be wrong");
            if (err.message == "Request failed with status code 404") {
                alert("Password or email may be wrong");
                flag = false;
            } else if (err.message == "Request failed with status code 400") {
                alert("user not found kindly login");
                flag = false;
            } else if (err.message == "Request failed with status code 500") {
                alert("Internal server error")
                flag = false;
            }
            setLoading(false); // error aaya toh
            /* `// return flag` is returning a boolean flag that indicates whether the login was
            successful or not. It is used in the `login` function to check if there was an error
            during the login process and to handle it accordingly. If there was an error, the flag
            is set to `false` and the function returns `false`. Otherwise, the flag is set to `true`
            and the function returns `true`. This flag can be used by the calling component to
            determine if the login was successful or not. */
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
        logout,
        resetPassEmail,
        setResetEmail,
        otpPassEmail,
        setOtpPassEmail
    }
    return (
        < AuthContext.Provider value={value} >
            {/* if not loading show childrens -> agar loding nhi ho rahi toh "children" dikha do */}
            {!loading && children}    
        </AuthContext.Provider >
    )
}
export default AuthProvider
