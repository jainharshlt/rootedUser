'use client'
import React, { useEffect,useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/config/axiosInstance";
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        phone_number: "",
        company: "",
        designation: "",
        message: "",
    });
    useEffect(() => {
      AOS.init({
        // initialise with other settings
        duration : 800
      });
      AOS.refresh();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        phone_number: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        company: Yup.string().required("Company Name is required"),
        designation: Yup.string().required("Designation is required"),
        message: Yup.string().required("Message is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const requestData = values;
        try {
            const response = await axiosInstance.post("/contact-send",requestData)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
        setSubmitting(false);
    };

  return (
      <>
        <ToastContainer />
      <div id="main">
          <section className="banner">
            <div className="bg"><img src="assets/images/bg/001.svg" alt="" /></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="details">
                            <h1 data-aos="fade-right" data-aos-delay="000">For Corporates</h1>
                            <p data-aos="fade-right" data-aos-delay="100">The heart of a thriving business is Rooted in its people and the culture it fosters. Our bespoke culinary service is designed to enrich your workplace, offering a unique dining experience that benefits not just every individual, but the entire organisation.</p>
                            
                        </div>
                    </div>
                    
                    <div className="col-md-6 " data-aos="fade-left" data-aos-delay="100">
                        <img src="assets/images/banner/for-corporate.svg" alt="" />
                    </div>
                </div>
            </div>
        </section>
        
        
        <section>
            <div className="container">
                <div className="row row-gap-4">
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-right" data-aos-delay="000">
                        <img src="assets/images/for-corporate/003.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-right" data-aos-delay="000">	Boost Inter-Cultural<br/><span>Respectability Amongst<br/>Employees</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-right" data-aos-delay="100">When employees share food, they are not just exchanging dishes, but also their culture, traditions and values. This very exchange fosters understanding and respect, breaking down barriers and building a more inclusive workplace. Through these shared experiences, food becomes a powerful tool for promoting inter-cultural respect.</p>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-left" data-aos-delay="000">
                        <img src="assets/images/for-corporate/002.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-left" data-aos-delay="000">	Bolsters Creativity <br/>by <span>Reducing Food Monotony</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-left" data-aos-delay="100">Our ever-changing menus break the cycle of food monotony, stimulating a sense of newness and inspiring creativity. When employees look forward to meal times to explore new tastes and dishes, it translates into a more dynamic and innovative approach to their work.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="margin-top-max">
            <div className="container">
                <div className="row row-gap-4">
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-right" data-aos-delay="000">
                        <img src="assets/images/for-corporate/004.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-right" data-aos-delay="000">Increases Post- <span>Lunch<br/>Productivity</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-right" data-aos-delay="100">Our approach to a balanced and wholesome meal ensures that employees  are content with joy, without being overly heavy, keeping your team energised, focused, and ready to tackle the challenges of the afternoon with renewed vigour.</p>
                        
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-left" data-aos-delay="000">
                        <img src="assets/images/for-corporate/005.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-left" data-aos-delay="000">Encourages  <span>Interaction</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-left" data-aos-delay="100">Our Culture Chronicles initiative elevates meal times by encouraging not just the sharing of food, but also the stories behind it. This creates opportunities for teams to connect more deeply, sparking richer conversations and interactions around the meals they enjoy together. </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="margin-top-max mb-5">
            <div className="container">
                <div className="row row-gap-4">
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-right" data-aos-delay="000">
                        <img src="assets/images/for-corporate/001.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-right" data-aos-delay="000">Curtails Operating <span>Costs<br/>of Cafeterias</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-right" data-aos-delay="100">Managing an in-house cafeteria can be a significant financial and operational burden. Partnering with Rooted proves to be a highly cost-effective alternative, eliminating the need for extensive cafeteria operations while still providing your employees with high-quality, diverse dining options.</p>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-center" data-aos="fade-left" data-aos-delay="000">
                        <img src="assets/images/for-corporate/006c.svg" style={{maxHeight:"425px"}} alt="" />
                        <h1 className="heading2 text-center mt-3" data-aos="fade-left" data-aos-delay="000">	Promotes <span>Sustainability</span></h1>
                        <p className="mt-4 pe-md-5 text-center" data-aos="fade-left" data-aos-delay="100">From ethically sourcing the freshest ingredients to utilising packaging that's not only eco-friendly but also recyclable. We are rooted into significantly maximizing every corporate’s environment-friendly impact.   </p>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="bottomForm | padding-block-900">
            <div className="container">
                <div className="row row-gap-4">
                    <div className="col-md-6 pe-md-5" data-aos="fade-right" data-aos-delay="000">
                        <div className="pe-md-4">
                            <h1 className="heading1">Let’s discuss how<br/>we can make your<br/>work environment a<br />better place.</h1>
                            <p className="mt-4">Rooted is more than a meal delivery service. We’re your partner in building a more vibrant, productive, and cohesive workplace. By choosing Rooted, you're investing in the well-being of your employees, the culture of your organisation, and the future of your business.</p>
                        </div>
                    </div>
                    <div className="col-md-5 offset-md-1" data-aos="fade-left" data-aos-delay="100">
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ setFieldValue, values, handleSubmit }) => (
                                <Form onSubmit={handleSubmit} className="personalDetails">
                                    <div className="row row-gap-4">
                                        <div className="col-md-12">
                                            <label for="name">Name</label>
                                            <Field type="text" id="name" name="name" placeholder="Full Name" />
                                            <ErrorMessage name="name" component="div" className="error" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="email">Email</label>
                                            <Field type="text" id="email" name="email" placeholder="Email Address" />
                                            <ErrorMessage name="email" component="div" className="error" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="phone_number">Phone Number</label>
                                            <Field type="text" id="phone_number" name="phone_number" placeholder="Phone Number" />
                                            <ErrorMessage name="phone_number" component="div" className="error" />
                                        </div>                                                        
                                        <div className="col-md-6">
                                            <label for="company">Company Name</label>
                                            <Field type="text" id="company" name="company" placeholder="Company Name" />
                                            <ErrorMessage name="company" component="div" className="error" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="designation">Designation</label>
                                            <Field type="text" id="designation" name="designation" placeholder="Designation" />
                                            <ErrorMessage name="designation" component="div" className="error" />
                                        </div>
                                        <div className="col-md-12">
                                            <label for="message">Message</label>
                                            <Field type="text" id="message" name="message" placeholder="Message" /> 
                                            <ErrorMessage name="message" component="div" className="error" />
                                            {/* <textarea name="message" id="message" placeholder="Message"></textarea>
                                             */}
                                        </div>
                                        <div className="col-md-12 mt-1 justify-content-center">
                                            <button type="submit" className="btn1">SEND</button>
                                        </div>
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
  )
}

export default page