'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axiosInstance";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLogin,setisLogin] = useState(false);
    const [userName,setuserName] = useState("");
    const [issubscription, setisSubscription] = useState(true);
    const [walletAmounts,setwalletAmounts] = useState(parseFloat(0).toFixed(2));
    useEffect(()=>{
        
        if(localStorage.getItem("userData")){
            setisLogin(true);
            const userData = JSON.parse(localStorage.getItem("userData"));  
            if(userData.phone_number=='' || userData.phone_number==null){
                router.push('/profile');
            }          
            setwalletAmounts(userData.wallet_amount);
            if((userData.first_name!=null && userData.first_name!='') && (userData.last_name!=null && userData.last_name!="")){
                setuserName(userData.first_name+" "+userData.last_name);
            }else{
                setuserName("Hello User");
            }
        }
    })
    useEffect(()=>{
        
    },[issubscription,walletAmounts])
    const fetchData = async()=>{
        
        const token = localStorage.getItem('token');
        const params = {
            token: token
        };
        
        if(token!=null){
            try{
                const response = await axiosInstance.get("/subscription/detail",{params})            
                if(response.data){
                    
                    if(response.data.data==null){
                        setisSubscription(false);
                    }
                }            
            }catch(error){
                
            }
        }        
     }
     useEffect(() => {
        fetchData();
      }, [])
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        router.push('/');
        setisLogin(false);
    }
  return (
      <>
        <header id="topHead">
            <div className="container">
                <div className="wrapper">
                    <button className="mobileToggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                        <img src="assets/images/icons/menu.svg" alt="" />
                      </button>
                      <Link href="/" className="logo"><img src="assets/images/logo/logo.svg" alt="" /></Link>

                    <div className="navigationWrapper">
                        <ul className="desktopMenu onlyDesktop">
                            <li className={`link ${pathname === '/' ? 'active' : ''}`}>
                                <Link href="/"><span>Home</span></Link>
                            </li>
                            <li className={`link ${pathname === '/aboutus' ? 'active' : ''}`}>
                                <Link href="/aboutus"><span>About Us</span></Link>
                            </li>
                            <li className={`link ${pathname === '/corporate' ? 'active' : ''}`}>
                                <Link href="/corporate"><span>For Corporate</span></Link>
                            </li>
                        </ul>

                        <div className="accountNav">
                        {!isLogin && 
                        <Link href="/login" className="btn1">
                        Subscribe</Link>
                        }
                            {isLogin?(
                                issubscription?(
                                    <Link href="/subscription-details" className="btn1">Subscribe</Link>
                                ):(
                                    <Link href="/subscription" className="btn1">Subscribe</Link>
                                )
                            ):(
                                
                                <Link href="/login" className="btn2">Login</Link>
                            )}
                        </div>
                        {isLogin &&
                        <div className="btn-group loggedIN">
                            <button type="button" className="btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="profile">{(userName.charAt(0)).toUpperCase()}</div>
                                <div className="name">{userName}</div> <img src="assets/images/icons/account-arrow.svg" className="arrow" alt="" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link href="/profile" className="dropdown-item" type="button">Edit Profile</Link></li>
                                <li><Link href="/subscription-details" className="dropdown-item" type="button">Subscription details</Link></li>
                                <li><Link href="/billing-history" className="dropdown-item" type="button">Billing History</Link></li>
                                <li><Link href="javascript:void(0)" className="dropdown-item" type="button">Wallet Bal. <span>₹ {walletAmounts}</span></Link></li>
                                <li onClick={logout}><Link href="javascript:void(0)" className="dropdown-item" type="button">Log out <img src="assets/images/icons/logout.svg" alt="" /></Link></li>
                            </ul>
                        </div>
                        }
                    </div>

                </div>
            </div>

        </header>
        <div className="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="mobileMenuLabel"><img src="assets/images/logo/logo.svg" alt="" /></h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body mobile-menu">
                <ul>
                    <li>
                        <Link href="/"><span>Home</span></Link>
                    </li>
                    <li>
                        <Link href="/aboutus"><span>About Us</span></Link>
                    </li>
                    <li>
                        <Link href="/corporate"><span>For Corporate</span></Link>
                    </li>
                    <li style={{display:isLogin?'block':'none'}}>
                        <Link href=""><span>Subscribe</span></Link>
                    </li>
                </ul>
            </div>
        </div>
      </>
  )
}

export default Header