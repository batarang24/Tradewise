import {Form,Field, ErrorMessage} from 'formik'
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
function Auth()
{
    const [err,serr]=useState('')
    const pstyle={
        color:'blue',
        textDecoration:'underline',
        cursor:'pointer'
    }
    const [login,slogin]=useState(true)
    const validationSchema=Yup.object({
        name:Yup.string(),
        email:Yup.string().email("Invalid email format").required("Required"),
        password:Yup.string().required("Required")
    })
    const validationSchemas=Yup.object({
        name:Yup.string().required('Required'),
        email:Yup.string().email("Invalid email format").required("Required"),
        password:Yup.string().required("Required")
    })
    const initialValues={
        name:'',
        email:'',
        password:'' ,
       
       };
    const submit= async (values,props)=>{
        console.log(values)
        if (!login){
            
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                const docRef = doc(db, "users", user.uid )
                const hello= await setDoc(docRef,{
                    uuid:user.uid,
                    name:values.name,
                    email:values.email,
                    
                })
                console.log('succes')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
               
                serr(errorCode)
                // ..
            });
            

        }
        else
        {
            signInWithEmailAndPassword(auth,values.email,values.password).then((val)=>{
                console.log('login success')
            }).catch((err)=>{
                console.log(err)
                serr(err.code)
            })
        }
    }
    const divstyle={
        color:'red'
    }
    return (
        <div>
            <Formik
            validateOnChange
            validationSchema={login?validationSchema:validationSchemas}
            initialValues={initialValues}
            onSubmit={submit}
            >
               {
                    (formik)=>{
                        return(
                            
                            <Form>
                          {
                            !login?<div>
                                <label htmlFor="name">Name:</label>
                                <Field type="text" name="name"  id="name" /><br/>
                                <ErrorMessage name='name'/>
                            </div>:''
                          }
                            <br/>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" id="email"  /><br/>
                            <ErrorMessage name='email'/><br/>
                            <label htmlFor="password">Password:</label>
                            <Field type="password" name="password" id="password"  /><br/>
                            <ErrorMessage name='password'/><br/>
                            {!login?<p style={pstyle} onClick={()=>{
                                slogin((v)=>!v )
                                serr('')
                            }}>Already a user?</p>:<p style={pstyle} onClick={()=>{
                                slogin((v)=>!v)
                                serr('')
                                console.log(login)
                            }}>Create an account</p>
                            
                            
                            }
                            {
                                login?<p style={pstyle} onClick={()=>{
                                   
                                }}>Forgot password</p>:''
                            }
                            {err}
                            <input type="submit" value={!login?'Sign up':'Login'}></input>
                            <br/>
                        </Form>
                        )
                    }
               }
            </Formik>
        </div>
    )
}
export default Auth