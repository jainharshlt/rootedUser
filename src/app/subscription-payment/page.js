"use client";
import React, { useEffect } from "react";
import Link from 'next/link'
import OrderSummery from '@/componets/OrderSummery'

const page = () => {
    useEffect(() => {
        document.body.classList.add('headeBorder')
        return () => {
          document.body.classList.remove('headeBorder')
        }
      }, [])

  return (
    
      < >
        <div id="main" className="subscribeWrapper">
        <div className="breadcrumb">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li>Subscription</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <section className="margin-bottom-900 mt-3">
            <div className="container">
                <div className="row row-gap-5">
                    <div className="col-md-8">
                        <div className="row row-gap-4">
                            <div className="col-12">
                                <div className="subBox">
                                    <div className="head">Box Size <Link href="subscription" className="edit">Edit</Link></div>
                                    <div className="content">
                                        <div className="row row-gap-4">
                                            <div className="col-md-12">
                                                <div className="boxSelected">
                                                    <div className="box">
                                                        <img src="assets/images/subscribe/box.png" alt="" />
                                                    </div>
                                                    <div className="title">
                                                        Large Size Tiffin Box
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-12" id="DietType">
                                <div className="subBox ">
                                    <div className="head">Diet Type <Link href="subscription-diet-type#DietType" className="edit">Edit</Link></div>
                                    <div className="content">
                                        <div className="row row-gap-4">
                                            <div className="col-md-12">
                                                <div className="boxSelected">
                                                    <div className="box">
                                                        <img src="assets/images/subscribe/veg.png" alt="" />
                                                    </div>
                                                    <div className="title">
                                                        Vegetarian Diet
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                
                            <div className="col-12" id="Cuisine">
                                <div className="subBox ">
                                    <div className="head">Cuisine <Link href="subscription-cuisine#Cuisine" className="edit">Edit</Link></div>
                                        <div className="content">
                                            <div className="row row-gap-4">
                                                <div className="col-md-12">
                                                    <div className="boxSelected">
                                                        <div className="icon">
                                                            <img src="assets/images/subscribe/veg-icon.png" alt="" />
                                                        </div>
                                                        <div className="title">
                                                            Odysseys Of The North
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="boxSelected">
                                                        <div className="icon">
                                                            <img src="assets/images/subscribe/veg-icon.png" alt="" />
                                                        </div>
                                                        <div className="title">
                                                            Maratha Culinary Heritage
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="boxSelected">
                                                        <div className="icon">
                                                            <img src="assets/images/subscribe/veg-icon.png" alt="" />
                                                        </div>
                                                        <div className="title">
                                                            Southern Spice Symphony
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-12" id="DeliveryDays">
                                <div className="subBox">
                                    <div className="head">Delivery Days <Link href="subscription-delivery-days#DeliveryDays" className="edit">Edit</Link></div>
                                    <div className="content"></div>
                                </div>
                            </div>
                            <div className="col-12" id="PersonalDetails">
                                <div className="subBox">
                                    <div className="head">Personal Details <a href="subscription-personal-details.php#PersonalDetails" className="edit">Edit</a></div>
                                    <div className="content">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="fs-300 fw-semiBold text-neutral-900">Prashant Savarkar | Bombaytone</div>
                                                <p className="fs-200 text-neutral-900">19A, Sunshine Building, Opp: Domino's Pizza, 1st Cross Road, Lokhandwala, Andheri West, Mumbai, Maharashtra 400053</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p className="fs-200 text-neutral-900">+91 97416 35476</p>
                                            </div>
                                            <div className="col-md-3">
                                                <p className="fs-200 text-neutral-900">name.123@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12" id="Payment">
                                <div className="subBox">
                                    <div className="head">Payment</div>
                                    <div className="content pt-3 pb-3">
                                        <div className="row row-gap-4 align-items-center">
                                            <div className="col-md-6">
                                                <form action="">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" for="flexCheckDefault">
                                                             Use your ₹ 30.00 <span className="fw-medium ">Rooted Wallet Balance</span>
                                                        </label>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="coupon">
                                                    <form action="">
                                                    <input type="text" placeholder="Enter Coupon Code" />
                                                    <button>Apply Now</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="accordion mt-3" id="accordionPayment">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Credit Card/ Debit Card
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionPayment">
                                                    <div className="accordion-body">
                                                        <form action="" className="personalDetails">
                                                            <div className="row row-gap-4">
                                                                <div className="col-10">
                                                                    <input type="text" placeholder="Card number" />
                                                                </div>
                                                                <div className="col">
                                                                    <img src="assets/images/icons/mastercard.png" alt="" />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" placeholder="Card Holder Name" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input type="text" placeholder="Expiry Date" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <input type="text" placeholder="Enter CVV" />
                                                                </div>
                                                            </div>
                                                            <div className="row row-gap-2 mt-4 justify-content-center">
                                                                <div className="col-md-6">
                                                                    <a href="#" className="btn1 w-100">Cancel</a>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <Link href="/subscription-thank-you" className="btn1 w-100">Pay Now </Link>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    UPI
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionPayment">
                                                    <div className="accordion-body">
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Net Banking
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionPayment">
                                                    <div className="accordion-body">
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div id="orderSummeryWrap">
                            <div id="sidebar">
                                {/* <OrderSummery /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
        </div>
      </>
  )
}

export default page