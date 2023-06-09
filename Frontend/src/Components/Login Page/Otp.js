import React, { useState } from 'react';
import '../Styles/login.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';

function OTP() {
    const [otp, otpSet] = useState("");
    const history = useHistory();

    const { resetPassEmail, setOtpPassEmail } = useAuth();
    
    const saveOTP = async () => {
        setOtpPassEmail(otp); // otp set/put kiye ==> ye setOtpPassEmail[ otp ] "PasswordReset" page me ja kar "otp" me set krr denge
        // send to password and confirm password page => yha se send kiye password,conform-password page par 
        history.push("/passwordReset")
        
    }
   
   return (<>
        {
            // forget password se jo email bheja maine global store me save huaa , ye wahi eamil hai , check krr rhe agar email null nhi hai toh ye page open karo
            resetPassEmail != null ?
                <div className="container-grey">
                    <div className="form-container">
                        <div className='h1Box'>
                            <h1 className='h1'>ENTER OTP</h1>
                            <div className="line"></div>
                        </div>
                        <div className="loginBox">
                            <div className="entryBox">
                                <div className="entryText">OTP</div>
                                <input className="email input" value={otp}
                                    type="text" name="Email" placeholder="Your OTP"
                                    onChange={(e) => otpSet(e.target.value)} />
                            </div>
                            <button className="loginBtn  form-button"
                                onClick={saveOTP}>
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

export default OTP;