import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import {auth,db} from '..firebase'
import { useState } from 'react';
import OtpInput from "otp-input-react";
import { addDoc, collection, doc, getDoc, getDocs,getFirestore, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router';
function Otp()
{
    const [phoneno,sphoneno]=useState();
    const navigate=useNavigate();
    const [otp,setOtp]=useState();
    const collect=collection(db,'users')
    
    function setrecaptcha() {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
        window.recaptchaVerifier.render()
    }
    const verify=async()=>{
        const code = otp
        const confirmationResult=window.confirmationResult
        confirmationResult.confirm(code).then( async(result) => {
            
        console.log('success')
        const user = result.user;
        console.log(user.uid)
        const docRef = doc(db, "users", user.uid )
        const help=await getDoc(docRef)
        console.log(help.get('userid'))
        console.log(help.data)
        if (!help.get('userid')) {
            console.log('hello')
            navigate('user',{
                state:{
                    'userid':user.uid,
                    'phno':user.phoneNumber
                }
            })
            const hello= await setDoc(docRef,{
                uuid:user.uid,
                phno:user.phoneNumber
            })
        }
        console.log(help)
       
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error)
        });

    }
    const clicker= async (e)=>{
       const res=await setrecaptcha()
       const phoneNumber = "+"+phoneno;
       const appVerifier = window.recaptchaVerifier;
       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
        console.log('heeeee')
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult)
        
      // ...
     }).catch((error) => {
      // Error; SMS not sent
      // ...
        console.log(error)
        });

    }
    return(
        <div>
            <PhoneInput
                country={'in'}
                value={phoneno}
                onChange={sphoneno}
            />
            <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  
                ></OtpInput>
                <br/>
                <button onClick={verify}>Verify</button>
                <br/>
            <br/>
            <div id='recaptcha-container'></div>
            <button className='bg-blue-400 p-2' onClick={(e)=>clicker(e)}>Send otp</button>
        </div>
    )
}

export default Otp