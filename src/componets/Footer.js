"use client";
import React, { useState } from 'react'
import Link from 'next/link'

const Footer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("Subscribe Now");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint =
            "https://e042d645.sibforms.com/serve/MUIFALt1pXBZ9_1yLYdNzlwbvmgqt2872iaPtrR7D8sTp-c_w1oSy9ExDBz9AjilZFHzlIxyRak1ODsSZQIgUmoKOQZq9yJyzOc07iYCMXk9aj3_ySERo9eD9H-ZI4AGr45FuiEtafuiltnnfmOegfYnDFfgY39PDnzdUBx4jfq_ipTYwFSfqSBZl6CeX32pozeVAlfTrpmZiu77?isAjax=1";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ EMAIL: email }).toString(),
            });

            if (response.ok) {
                setMessage("Thank you for subscribing!");
                setEmail("");
            } else {
                setMessage("Subscription failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <footer id='footer'>
                <div className="container">
                    <div className="topSection">
                        <div className="row justify-content-between row-gap-5">
                            <div className="col-md-3">
                                <div className="info">
                                    <img src="assets/images/logo/logo-light.svg" className="logo" alt="" />
                                    <p className="mt-4">
                                        <strong>Ingenium Food  Ventures Pvt Ltd.</strong> <br />
                                        Delivering a real taste of India through authentic and diverse flavours, we bring the essence of regional cultures to your doorstep, ensuring you always stay true to your roots.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2 className="footerHead">USEFUL LINKS</h2>
                                <div className="row row-gap-5">
                                    <div className="col-md-6">
                                        <div className="linkWrapper">
                                            <Link href="/#whyRooted" className="singleLink">Why Rooted</Link>
                                            <Link href="/aboutus" className="singleLink">About us</Link>
                                            <Link href="#" className="singleLink">Contact Us</Link>
                                            <Link href="/login" className="singleLink">Login</Link>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="linkWrapper">
                                            <Link href="/term-conditions" className="singleLink">T&C</Link>
                                            <Link href="/faqs" className="singleLink">FAQ’s</Link>
                                            <Link href="/privacy-policy" className="singleLink">Privacy Policy</Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h2 className="footerHead">{message}</h2>
                                <div className="subscribeForm">
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <button><img src="assets/images/icons/send.svg" alt="" /></button>
                                    </form>
                                </div>
                                <h2 className="footerHead pt-3">Contact Us</h2>
                                <div className="info">
                                    <p className="mt-2">
                                        <strong>Ingenium Food  Ventures Pvt Ltd.</strong> <br />
                                        Unit 10 & 11, Ground Floor, Narayan Plaza Building, Saki Vihar Road, Mumbai, MH - 400072
                                    </p>
                                </div>
                                <ul className="social">
                                    <li><a href="https://www.instagram.com/rootedtoyou/" target="_blank"><img src="assets/images/social/instagram.svg" alt="" /></a></li>
                                    <li><a href="https://www.facebook.com/profile.php?id=61564401310689" target="_blank"><img src="assets/images/social/fb.svg" alt="" /></a></li>
                                    <li><a href="https://www.linkedin.com/company/rooted-to-you/" target="_blank"><img src="assets/images/social/linkedin.svg" alt="" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottomSection">
                        <p>© 2024 Ingenium Food  Ventures Pvt Ltd.</p>
                    </div>
                </div>
            </footer>
        </ >
    )
}

export default Footer