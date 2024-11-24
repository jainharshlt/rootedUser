"use client";
import React, { useEffect } from "react";
import Link from 'next/link'
const page = () => {
    useEffect(() => {
        document.body.classList.add('headeBorder')
        return () => {
          document.body.classList.remove('headeBorder')
        }
      }, [])

  return (
    
      < >
        <div id="main">
        <div className="breadcrumb">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul>
                            <li><Link href="/">Back To Homepage</Link></li>
                            <li>Subscription</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <section className="thankYou | margin-bottom-900 mt-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-2">
                        <img src="assets/images/thank-you.svg" alt="" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="text1 text-center">Thank you for embarking on this flavorful journey with Rooted. </h2>
                    </div>
                    <div className="col-md-10">
                        <h2 className="text2 text-center">Here's to discovering new tastes, celebrating diversity, and enjoying the art of fine dining together.</h2>
                    </div>
                </div>
            </div>
        </section>
        <div className="thankYouBottom | padding-block-900">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text1 text-center">
                        Should you have any questions or need assistance, our customer support team is just an email - info@rootedtoyou.com or phone call 1800 268 0268 / +91 22 60 600 012 away, ready to ensure your Rooted experience is nothing short of fantastic.
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h3 className="text-center">Follow Us On Social Media</h3>
                    </div>
                    <ul>
                        <li><a href=""><img src="assets/images/icons/insta.svg" alt="" /></a></li>
                        <li><a href=""><img src="assets/images/icons/facebook.svg" alt="" /></a></li>
                        <li><a href=""><img src="assets/images/icons/youtube.svg" alt="" /></a></li>
                        <li><a href=""><img src="assets/images/icons/linkedin.svg" alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
      </>
  )
}

export default page