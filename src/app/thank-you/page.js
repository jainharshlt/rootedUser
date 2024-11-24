"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const router = useRouter();
    useEffect(() => {
        const message = localStorage.getItem('OTmessage');
        if(message){
            toast.success(message);
            setTimeout(() => {
            localStorage.removeItem('OTmessage');
            }, 200)
        }
        setTimeout(()=>{
            const userData = JSON.parse(localStorage.getItem("userData"));  
            if(userData.phone_number=='' || userData.phone_number==null){
                router.push('/profile');
            }else{
                router.push('/subscription')
            }
          },5000)
        document.body.classList.add('headeBorder')
        return () => {
          document.body.classList.remove('headeBorder')
        }
      }, [router])
    
  return (
    
      < >
      <ToastContainer/>
      <div id="main" className="subscribeWrapper">
        <div className="breadcrumb">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        
                    </div>
                </div>
            </div>
        </div>
        <section className="margin-bottom-900">
            <div className="container">
                
                <div className="row justify-content-center row-gap-5">
                    <div className="col-md-6">
                        <form name="" method="post" action="">
                                  <div className="loginBox">
                                      <img src="assets/images/gif/RootedSuccessfullAnimation.gif" alt="" />
                                <div className="heading1 fs-600 text-center" >Ready, Set, Eat! Your Account is Successfully Created.</div>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
          </div>
      </>
  )
}

export default page