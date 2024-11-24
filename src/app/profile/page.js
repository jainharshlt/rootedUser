"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/config/axiosInstance";
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '@/route/Auth';

const Page = () => {
    const [initialValues, setInitialValues] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        birthdate: null,
        company: "",
        company_address1: "",
        company_address2: "",
        city: "",
        state: "",
        pincode: "",
        designation: "",
        department: "",
    });

    useEffect(() => {
        document.body.classList.add('headeBorder')
        return () => {
            document.body.classList.remove('headeBorder')
        }
    }, [])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));


        if (userData) {
            let company_address = userData.company_address;
            company_address = company_address?.split("||");
            setInitialValues({
                first_name: userData.first_name || "",
                last_name: userData.last_name || "",
                phone: userData.phone_number || "",
                email: userData.email || "",
                birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
                company: userData.company || "",
                company_address1: company_address?.[0] || "",
                company_address2: company_address?.[1] || "",
                city: userData.city || "",
                state: userData.state || "",
                pincode: userData.pincode || "",
                designation: userData.designation || "",
                department: userData.department || "",
                wallet_amount: userData.wallet_amount || "0.00",
            });
        }
    }, []);

    const validationSchema = Yup.object({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Mobile number is required"),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        birthdate: Yup.date().required("Birthdate is required"),
        company: Yup.string().required("Company Name is required"),
        company_address1: Yup.string().required("Company address is required"),
        city: Yup.string().required("City is required"),
        //state: Yup.string().required("State is required"),
        pincode: Yup.string()
            .oneOf(["400052", "400053", "400058", "400047", "400059", "400069", "400072", "400076", "400093", "400099"], "We are not delivering to this pincode at the moment.")
            .required("Pincode is required"),
        department: Yup.string().required("Department is required"),
        designation: Yup.string().required("Designation is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const combinedCompanyAddress = `${values.company_address1}` + '||' + `${values.company_address2}`.trim();

        const requestData = {
            ...values,
            company_address: combinedCompanyAddress
        }
        delete requestData.company_address1;
        delete requestData.company_address2;

        const usersData = {
            ...values,
            phone_number: requestData.phone,
            company_address: combinedCompanyAddress
        }
        delete usersData.phone;
        delete usersData.company_address1;
        delete usersData.company_address2;

        try {
            const response = await axiosInstance.post("/update-profile", requestData)
            toast.success(response.data.message);
            localStorage.setItem('userData', JSON.stringify(usersData));
        } catch (error) {
            toast.error(error.response.data.message)
        }
        setSubmitting(false);

    };

    return (
        <>
            <ToastContainer />
            <div id="main" className="subscribeWrapper">
                <div className="breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Add breadcrumb content if needed */}
                            </div>
                        </div>
                    </div>
                </div>
                <section className="margin-bottom-900">
                    <div className="container">
                        <div className="row justify-content-center row-gap-5">
                            <div className="col-md-8">
                                <div className="subBox">
                                    <div className="content">
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}>
                                            {({ setFieldValue, values, handleSubmit }) => (
                                                <Form onSubmit={handleSubmit} className="personalDetails">
                                                    <div className="row row-gap-4">
                                                        <div className="col-md-6">
                                                            <Field type="text" id="first_name" name="first_name" placeholder="First Name" />
                                                            <ErrorMessage name="first_name" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="last_name" name="last_name" placeholder="Last Name" />
                                                            <ErrorMessage name="last_name" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="phone" name="phone" placeholder="Phone Number" readOnly={initialValues.phone == null || initialValues.phone == '' ? '' : 'readonly'} />
                                                            <ErrorMessage name="phone" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="email" name="email" placeholder="Email Address" readOnly={initialValues.email == null || initialValues.email == '' ? '' : 'readonly'} />
                                                            <ErrorMessage name="email" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <DatePicker
                                                                selected={values.birthdate}
                                                                onChange={(date) => setFieldValue("birthdate", date)}
                                                                dateFormat="dd-MM-yyyy"
                                                                className="form-control"
                                                                showYearDropdown
                                                                scrollableMonthYearDropdown
                                                                placeholderText="Birthdate"
                                                            />
                                                            <ErrorMessage name="birthdate" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="company" name="company" placeholder="Company" />
                                                            <ErrorMessage name="company" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <Field type="text" id="company_address1" name="company_address1" placeholder="Company Address Line 1" />
                                                            <ErrorMessage name="company_address1" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <Field type="text" id="company_address2" name="company_address2" placeholder="Company Address Line 2" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="city" name="city" placeholder="City" />
                                                            <ErrorMessage name="city" component="div" className="error" />
                                                        </div>
                                                        {/* <div className="col-md-6">
                                                            <Field type="text" id="state" name="state" placeholder="State" />
                                                            <ErrorMessage name="state" component="div" className="error" />
                                                        </div> */}
                                                        <div className="col-md-6">
                                                            <Field type="text" id="pincode" name="pincode" placeholder="Pincode" />
                                                            <ErrorMessage name="pincode" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="department" name="department" placeholder="Department" />
                                                            <ErrorMessage name="department" component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Field type="text" id="designation" name="designation" placeholder="Designation" />
                                                            <ErrorMessage name="designation" component="div" className="error" />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-5 justify-content-center">
                                                        <button type="submit" className="btn1">SAVE <img src="assets/images/icons/right-arrow.svg" /></button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
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

export default Auth(Page);