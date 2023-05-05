// esme [ password , conform-password ] wala "page" hoga
// ess page parr email,otp dono chahiye

import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider';
import { useHistory } from "react-router-dom";

function PasswordReset() {
    const [password, passwordSet] = useState("");
    const [passwordCnf, passwordCnfSet] = useState("");
    const { resetPassEmail, setResetEmail, otpPassEmail, setOtpPassEmail } = useAuth();
    const history = useHistory();

    // email,otp  => ess page ko open karne k liye email, otp dono chahiye  
    // ye send karega request to your reset password 
    const resetPassword = async () => {
        // i will send evrything jo required 
        // -> done  -> email,otp -> null => email,otp ko null kar degen ki page open ho jaye dubara 
        // send to login page  => agar kam ho jaye " password reset karne ka " to bhej degen "login" page par
        // no done -> email ,otp-> null => done ho chahe not done toh bhi hmm email,otp ko null kar degen ki page open ho dubara
        try {
            // backend me - resetPassword kya kya leta hai -> otp, password, confirmPassword, email
            let res = await axios.patch("/api/v1/auth/resetPassword", {
                otp: otpPassEmail,
                email: resetPassEmail,
                password: password,
                confirmPassword: passwordCnf
            })
            if (res.status == 201) {
                alert("password changed successfully");
                setOtpPassEmail(null); // enn dono ko null kar diya ki koi miss use na karr paye
                setResetEmail(null);  
                history.push("/login");  // login prr bhej diya , password change hone k bad 
            } else if (res.status == 200) {
                if (res.message == "Otp Expired") {
                    alert("Otp expried kindly regenerate ")
                } else if (res.message == "wrong otp") {
                    alert("wrong otp");
                }
                setOtpPassEmail(null);
                setResetEmail(null);
            }
        } catch (err) {
            console.log(err.message);
            if (err.message == "Request failed with status code 500") {
                alert("Internal server error");
            }
            setOtpPassEmail(null);
            setResetEmail(null);
        }
    }

    return (
        <>
            {
                // email,otp aayi ho toh open kar do page ko
                resetPassEmail && otpPassEmail ?
                    <div className="container-grey">
                        <div className="form-container">
                            <div className='h1Box'>
                                <h1 className='h1'>RESET PASSWORD</h1>
                                <div className="line"></div>
                            </div>
                            <div className="loginBox">
                                <div className="entryBox">
                                    <div className="entryText">Password</div>
                                    <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                                </div>
                                <div className="entryBox">
                                    <div className="entryText">Confirm Password</div>
                                    <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                                </div>
                                <button className="loginBtn  form-button"
                                    onClick={resetPassword}>
                                    Send OTP
                                </button>

                            </div>
                        </div>
                    </div>
                    : <h2 className='container-grey'>First go to your Forget Password</h2>

            }
        </>


    )
}

export default PasswordReset