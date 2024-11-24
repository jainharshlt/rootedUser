"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import axiosInstance from "@/config/axiosInstance";
import 'react-toastify/dist/ReactToastify.css';

import FacebookLogin from 'react-facebook-login';

import { GoogleLogin } from '@react-oauth/google';


const Page = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile');
    }
  }, [router]);


  const [mobile, setMobile] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.add('headeBorder');
    return () => {
      document.body.classList.remove('headeBorder');
    };
  }, []);
  

  const initialValues = {
    mobileNumber: "",
  };

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const handleSubmit = async (values) => {
    setMobile(values.mobileNumber);
    try {
      const response = await axiosInstance.post('login', {
        phone: values.mobileNumber
      });
      
      localStorage.setItem('mobileNumber', values.mobileNumber);
      localStorage.setItem('OTmessage', response.data.message);
      setTimeout(() => {
        router.push('/login-otp')
      }, 200)
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };``

  const handleLoginSuccess = async (response) => {
    const decodedToken = decodeJWT(response.credential);  // Decode the JWT
    const requestData = {
      google_id:decodedToken.sub,
      email:decodedToken.email,
      first_name:decodedToken.given_name,
      last_name:decodedToken.family_name,
    }
    try {
      const response = await axiosInstance.post('/login-with-google',requestData)
      
      localStorage.setItem("token",response.data.token);
      const userData = {
        id: response.data.data.id,
        first_name: response.data.data.first_name || '',
        last_name: response.data.data.last_name || '',
        email: response.data.data.email || '',
        phone_number: response.data.data.phone || '',
        birthdate: response.data.data.birthdate || '',
        company: response.data.data.company || '',
        company_address: response.data.data.company_address || '',
        city: response.data.data.city || '',
        state: response.data.data.state || '',
        pincode: response.data.data.pincode || '',
        department: response.data.data.department || '',
        designation: response.data.data.designation || '',
        wallet_amount: response.data.data.wallet_amount || 0,
      };
      
      localStorage.setItem("userData",JSON.stringify(userData));
      setTimeout(()=>{
        router.push('/thank-you')
      },100) 
    } catch (error) {
      //toast.error(error.response.data.message)
    }
  };

  const handleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  const handleFacebookCallback = async (response) => {
    if (response?.status === "unknown") {
        console.error('Sorry!', 'Something went wrong with facebook Login.');
     return;
    }
    let name = response.name;
    name = name.split(" ");
    const requestData = {
      facebook_id:response.id,
      email:response.email,
      first_name:name[0]?name[0]:'',
      last_name:name[1]?name[1]:'',
    }    
    try {
      const response = await axiosInstance.post('/login-with-facebook',requestData)
      
      localStorage.setItem("token",response.data.token);
      const userData = {
        id: response.data.data.id,
        first_name: response.data.data.first_name || '',
        last_name: response.data.data.last_name || '',
        email: response.data.data.email || '',
        phone_number: response.data.data.phone || '',
        birthdate: response.data.data.birthdate || '',
        company: response.data.data.company || '',
        company_address: response.data.data.company_address || '',
        city: response.data.data.city || '',
        state: response.data.data.state || '',
        pincode: response.data.data.pincode || '',
        department: response.data.data.department || '',
        designation: response.data.data.designation || '',
        wallet_amount: response.data.data.wallet_amount || 0,
      };
      
      localStorage.setItem("userData",JSON.stringify(userData));
      setTimeout(()=>{
        router.push('/thank-you')
      },100) 
    } catch (error) {
      //toast.error(error.response.data.message)
    }
   }

  return (
    <>
      <ToastContainer />
      <div id="main" className="subscribeWrapper">
        <div className="breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12"></div>
            </div>
          </div>
        </div>
        <section className="margin-bottom-900">
          <div className="container">
            <div className="row justify-content-center row-gap-5">
              <div className="col-md-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}>
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="loginBox">
                        <div className="heading1 fs-600 text-center">
                          Stay Rooted!
                        </div>
                        <div className="enterMobileNo">
                          <label>Enter mobile number</label>
                          <div className="group">
                            <div className="code">+91</div>
                            <Field
                              type="text"
                              id="mobileNumber"
                              name="mobileNumber"
                            />
                            <ErrorMessage
                              name="mobileNumber"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <button type="submit">Send OTP</button>
                        <GoogleLogin
                        buttonText="Log in with Google"
                          onSuccess={handleLoginSuccess}
                          onError={handleLoginFailure}
                          render={renderProps => (
                            <button
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              className='loginWith'
                            >
                              <img src="assets/images/icons/google.svg" alt="" /> Log in with Google
                            </button>
                          )}
                        />
                      <FacebookLogin 
                            buttonStyle={{padding:"6px"}}  
                            appId="1049112006354351"  // we need to get this from facebook developer console by setting the app.
                            autoLoad={false}  
                            fields="name,email,picture"  
                            callback={handleFacebookCallback}/>

                         {/* <Link href="" className="loginWith">
                          <img src="assets/images/icons/google.svg" alt="" /> Log
                          in with Google
                        </Link> */}

                        {/* <Link href="" className="loginWith">
                          <img
                            src="assets/images/icons/facebook-login.svg"
                            alt=""
                          />{" "}
                          Log in with Facebook
                        </Link> */}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
