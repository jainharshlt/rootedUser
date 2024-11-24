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
                            <h1 data-aos="fade-right" data-aos-delay="000">Certification</h1>
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