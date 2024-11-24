'use client'
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const page = () => {
    useEffect(() => {
      AOS.init({
        // initialise with other settings
        duration : 800
      });
      AOS.refresh();
    }, []);
    
  return (
      <>
      <div id="main">
          <section className="banner">
            <div className="bg"><img src="assets/images/bg/001.svg" alt="" /></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="details">
                            <h1 data-aos="fade-right" data-aos-delay="000">About Us</h1>
                                  <p data-aos="fade-right" data-aos-delay="100">
                                      <strong>
                                      At Rooted, we're more than just a meal delivery service. Our mission is to provide experiences rich in heritage, diversity, and authenticity.
                                      </strong><br></br>
                                    We're a movement towards redefining the corporate dining experience. In a world where the food industry is rapidly industrializing, we stand out by bringing the soulful essence of traditional cooking back to the forefront.

                            </p>
                            
                        </div>
                    </div>
                    
                    <div className="col-md-6 ">
                        <img src="assets/images/banner/about.svg" data-aos="fade-left" data-aos-delay="100" alt="" />
                    </div>
                </div>
            </div>
        </section>
        
        
        <section className="ourValueSection">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="heading1 text-center" data-aos="fade-up" data-aos-delay="000">Our Values</h1>
                    </div>
                </div>
                <div className="row row-gap-5 mt-5">
                    <div className="col-md-3" data-aos="fade-up" data-aos-delay="000">
                        <div className="item">
                            <img src="assets/images/values/inclusive.jpg" alt="" className="bg inclusive" />
                            <div className="details prime">
                                <h2>Reconnect</h2>
                                <p>We help you know your food better, understand its cultural significance, and appreciate the hands that prepared it. By fostering this deeper connection, we encourage mindful eating practices, greater appreciation for culinary arts, and a profoundly meaningful dining experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
                        <div className="item">
                            <img src="assets/images/values/sustainable.jpg" alt="" className="bg sustainable" />
                            <div className="details second">
                                <h2>Share</h2>
                                <p>We believe, sharing food is key to cultivating new connections and fostering new bonds. Our meals are to be shared, encouraging conversations and creating moments that bring us closer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
                        <div className="item">
                            <img src="assets/images/values/sharing.jpg" alt="" className="bg sharing" />
                            <div className="details prime">
                                <h2>Sustain</h2>
                                <p>We are Rooted in our commitment towards maximising a positive environmental impact.  Our eco-friendly packaging is designed to promote recycling and proper disposal, to give you a truly guilt-free meal experience and contribute to a healthier planet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
                        <div className="item">
                            <img src="assets/images/values/reconnecting.jpg" alt="" className="bg reconnecting" />
                            <div className="details second">
                                <h2>Rebuild</h2>
                                <p>Rooted champions inclusivity by offering a diverse range of cultural tastes and preferences. We are building a unique community which welcomes, values, and encourages all to explore the vast world of flavours of our country, together.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
        <section className="margin-top-max">
            <div className="container">
                <div className="row row-gap-4 align-items-center">
                    <div className="col-md-6" data-aos="fade-right" data-aos-delay="000">
                        <img src="assets/images/img1.svg" alt="" />
                    </div>
                    <div className="col-md-6">
                        <h1 className="heading1" data-aos="fade-left" data-aos-delay="000">What We Stand For</h1>
                              <p data-aos="fade-left" data-aos-delay="100">At Rooted, we believe in the power of food to bring people together and make a positive impact . We are dedicated to creating a dining experience that delights, educates, and inspires, all while upholding our commitment to sustainable and ethical practices.</p>
                              <p data-aos="fade-left" data-aos-delay="100">Our mission is to deliver to you ease and delight while you  explore new cuisines, discover new flavours, through wholesome meals every day.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="team | padding-block-max">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="heading1 text-center" data-aos="fade-up" data-aos-delay="000">Our Founders</h1>
                    </div>
                    <div className="col-md-12" data-aos="fade-right" data-aos-delay="000">
                        <p className="text-center">Rooted in unwavering dedication and a shared passion for our mission, our exceptional team forms the cornerstone of our success. Together, we combine years of experience and innovative thinking to serve you better, every step of the way.</p>
                    </div>
                </div>
                <div className="row row-gap-4 mt-5 justify-content-center">
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="000">
                        <div className="box">
                            <div className="overlay"> </div>
                            <img src="assets/images/founder/Saurabh-Wadkar.jpg" alt="" className="bg" />
                            <div className="details prime">
                                <h2>Saurabh Wadkar</h2>
                                <p>Multifaceted Triple Degree Holder F&B Trailblazer with Global Expertise Culturally Adept Culinary Explorer </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="box">
                            <div className="overlay"> </div>
                            <img src="assets/images/founder/Neha-Shah.jpg" alt="" className="bg" />
                            <div className="details second">
                                <h2>Neha Shah</h2>
                                <p>Managerial Mastermind Global Gourmet Connoisseur Visionary Epicure With Style </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="box">
                            <div className="overlay"> </div>
                            <img src="assets/images/founder/001.jpg" alt="" className="bg" />
                            <div className="details prime">
                                <h2>Navin Khadilkar</h2>
                                <p>Process-driven Culinary Expert Indian cuisine Aficionado Bulk Cooking Specialist </p>
                            </div>
                        </div>
                    </div> */}
                </div>
                
            </div>
        </section>
            </div>
      </>
  )
}

export default page