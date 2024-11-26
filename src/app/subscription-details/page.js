"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import axiosInstance from "@/config/axiosInstance";
import Auth from '@/route/Auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from '@progress/kendo-date-math';
import { Calendar } from 'react-date-range';

const Page = () => {
    const [id, setId] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [errors, setErrors] = useState({ vacation_date: '' });
    const [holidays, setHolidays] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [subsDate, setSubsDate] = useState('');
    const [disableDate, setDisableDate] = useState([]);
    const [showdisableDate, setShowDisableDate] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        setId(id);
    }, []);

    useEffect(() => {
        document.body.classList.add('headeBorder');
        return () => {
            document.body.classList.remove('headeBorder');
        };
    }, []);

    useEffect(() => {
        getHolidays();
        fetchData();
    }, [id]);

    useEffect(() => { }, [holidays, selectedDates, subscriptionData, subsDate, disableDate]);

    const getHolidays = async () => {
        try {
            const response = await axiosInstance.get("/get-holidays");
            if (response.data.data) {
                let holi_arr = [];
                response.data.data.map((Element) => {
                    holi_arr.push(Element.date);
                });
                setHolidays(holi_arr);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const fetchData = async () => {
        let currentDate = new Date();
        currentDate = addDays(currentDate, 1);
        currentDate = currentDate.toISOString().split('T')[0];

        const token = localStorage.getItem('token');
        if (token !== '') {
            try {
                const response = await axiosInstance.get(`/show-billing-history/${id}`);

                if (response.data.data) {
                    setSubscriptionData(response.data.data);
                    const subscriptionId = response.data.data.id
                    const vacationResponse = await axiosInstance.get(`/get-vacation?subscription_id=${subscriptionId}`)

                    let vData = vacationResponse.data.data;

                    if (vData.length > 0) {
                        const str = `"${vacationResponse.data.data}"`;
                        const validJsonStr = str.replace(/'/g, '"');
                        const parsedArray = JSON.parse(validJsonStr);
                        const str1 = `${parsedArray}`;
                        const shoDdates = str1.split(",");
                        setShowDisableDate(shoDdates);
                    }

                    setDisableDate(vacationResponse.data.data)
                    if (currentDate > response.data.data.start_date) {
                        setStartDate(currentDate);
                    } else {
                        setStartDate(response.data.data.start_date);
                    }

                    setEndDate(response.data.data.end_date);
                    let st_date = response.data.data.start_date.split("-").reverse().join("-");
                    let ed_date = response.data.data.end_date.split("-").reverse().join("-");
                    let subs_date = st_date + ' to ' + ed_date;
                    setSubsDate(subs_date);
                }
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleSelect = (date) => {
        let n_date = addDays(date, 1);
        const dateString = n_date.toISOString().split('T')[0];
        setSelectedDates((prevDates) => {
            if (prevDates.includes(dateString)) {
                return prevDates.filter((d) => d !== dateString);
            } else {
                return [...prevDates, dateString];
            }
        });
    };

    const dayContentRenderer = (date) => {
        let FMS = addDays(date, 1);
        const formattedDate = FMS.toISOString().split('T')[0];
        const res = holidays.indexOf(formattedDate) + 1;
        const isSaturday = date.getDay() === 6;
        const dropdownValue = subscriptionData.weekend_type;
        let className = 'normalDay';
        if (res > 0) {
            className = 'holidayDay';
        } else if (isSaturday) {
            if (dropdownValue === 'all') {
                className = 'allSaturday';
            } else if (dropdownValue === '1_3' && (Math.ceil(date.getDate() / 7) === 1 || Math.ceil(date.getDate() / 7) === 3)) {
                className = 'firstThirdSaturday';
            } else if (dropdownValue === '2_4' && (Math.ceil(date.getDate() / 7) === 2 || Math.ceil(date.getDate() / 7) === 4)) {
                className = 'secondFourthSaturday';
            }
        }
        return <span className={className}>{date.getDate()}</span>;
    };

    const saveManageCal = async () => {
        if (selectedDates.length <= 0) {
            setErrors({ vacation_date: 'Please select a vacation date' });
        } else {
            setErrors({ vacation_date: '' });
            let amount = (parseFloat(subscriptionData.price) / 26).toFixed(2);
            let num = selectedDates.length;
            let total = (parseFloat(amount * num)).toFixed(2);
            let requestData = {
                date: selectedDates,
                subscription_id: subscriptionData.id,
                amount: amount,
                total: total
            };

            try {
                await axiosInstance.post('/manage-vacation', requestData);
                toast.success('Vacation dates saved successfully');
                setShowModal(false);
                setSelectedDates([])
                let userData = JSON.parse(localStorage.getItem('userData'));
                userData.wallet_amount = (parseFloat(userData.wallet_amount) + parseFloat(total)).toFixed(2);
                localStorage.setItem('userData', JSON.stringify(userData));
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };


    return (
        <>
            <ToastContainer />
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
                            <div className="col-md-12">
                                <div className="row row-gap-4">
                                    <div className="col-12">
                                        <div className="subBox">
                                            <div className="head">
                                                Subscription Details
                                                {subscriptionData.user &&
                                                    <div className="buttonWrap">
                                                        <Link href="javascript:void(0)" className="cancel" onClick={handleModalToggle}>Manage Vacation</Link>
                                                        <Link href="/billing-history" className="history">View Billing History</Link>
                                                    </div>
                                                }
                                            </div>
                                            {subscriptionData.user ? (
                                                <div className="content">
                                                    <div className="row row-gap-3">
                                                        {subscriptionData.user &&
                                                            <div className='col-md-6'>
                                                                <div className="title fw-bold text-neutral-400">Personal Details </div>
                                                                <p className="fs-400 fw-semiBold text-neutral-900 mb-1">{subscriptionData.user.first_name} {subscriptionData.user.last_name}</p>
                                                                <p className="fs-200 text-neutral-900">{subscriptionData.user.company}</p>
                                                                <p className="fs-200 text-neutral-900">{subscriptionData.user.company_address.replace("||", "")}
                                                                    <br />
                                                                    {subscriptionData.user.city}
                                                                    {subscriptionData.user.pincode != '' ? ` - ${subscriptionData.user.pincode}` : ''}
                                                                    {/* ,{subscriptionData.user.state} */}
                                                                </p>
                                                            </div>
                                                        }
                                                        {subscriptionData.diet_type &&
                                                            <div className='col-md-6'>
                                                                <div className="title fw-bold text-neutral-400 mt-3">Diet Type</div>
                                                                <div className="boxSelected mt-3">
                                                                    <div className="box">
                                                                        {subscriptionData.diet_type.id === 1 ? (
                                                                            <img src="assets/images/subscribe/veg.png" alt="" />
                                                                        ) : (
                                                                            <img src="assets/images/subscribe/non-veg.png" alt="" />
                                                                        )}
                                                                    </div>
                                                                    <div className="title">
                                                                        {subscriptionData.diet_type.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="row row-gap-3 mt-4">
                                                        {subscriptionData.box &&
                                                            <div className='col-md-6'>
                                                                <div className="title fw-bold text-neutral-400 mt-3">Box Size</div>
                                                                <div className="boxSelected mt-3">
                                                                    <div className="box">
                                                                        {subscriptionData.box.id === 1 ? (
                                                                            <img src="assets/images/subscribe/box.png" alt="" />
                                                                        ) : (
                                                                            <img src="assets/images/subscribe/box-small.png" alt="" />
                                                                        )}
                                                                    </div>
                                                                    <div className="title">
                                                                        {subscriptionData.box.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className='col-md-6'>
                                                            <div className="title fw-bold text-neutral-400">Delivery Days<br />
                                                                <span className="fw-regular fs-200">(Weekend Type)</span>
                                                            </div>

                                                            {subscriptionData.weekend_type == null &&
                                                                <p className="fs-400 text-neutral-900 mt-3">
                                                                    None
                                                                </p>
                                                            }
                                                            {subscriptionData.weekend_type == "all" &&
                                                                <p className="fs-400 text-neutral-900 mt-3">
                                                                    All Saturday
                                                                </p>
                                                            }
                                                            {subscriptionData.weekend_type == '1_3' &&
                                                                <p className="fs-400 text-neutral-900 mt-3">
                                                                    1<sup>st</sup> & 3<sup>rd</sup> Saturday
                                                                </p>
                                                            }
                                                            {subscriptionData.weekend_type == '2_4' &&
                                                                <p className="fs-400 text-neutral-900 mt-3">
                                                                    2<sup>nd</sup> & 4<sup>th</sup> Saturday
                                                                </p>
                                                            }
                                                        </div>
                                                    </div>
                                                    {subscriptionData.cuisine_ids != null &&
                                                        <div className="row row-gap-3 mt-5">
                                                            <div className='col-md-6'>
                                                                <div className="title fw-bold text-neutral-400">Cuisine</div>
                                                                <div className="row row-gap-4 mt-3">
                                                                    {subscriptionData.cuisines.map(cuisine => (
                                                                        <div className="col-md-12" key={cuisine.id}>
                                                                            <div className="boxSelected">
                                                                                <div className="icon">
                                                                                    <img src="assets/images/subscribe/veg-icon.png" alt="" />
                                                                                </div>
                                                                                <div className="title">
                                                                                    {cuisine.name}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            ) : (
                                                <div className="content">
                                                    <div className="row row-gap-3">
                                                        <div className="col-md-12">
                                                            <p>Subscription is not available.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="fs-400 fw-semiBold text-neutral-900 mb-1">Manage Vacation</p>
                                <button type="button" className="btn-close" onClick={handleModalToggle} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row row-gap-4 justify-content-center">
                                    <div className="col-md-12"><p>Subscription Date: <span>{subsDate}</span></p></div>
                                    <div className="col-md-9">
                                        <Calendar
                                            date={new Date(startDate)} onChange={handleSelect} showMonthAndYearPickers={false} dayContentRenderer={dayContentRenderer} color={'#115561'}
                                            minDate={new Date(startDate)}
                                            maxDate={new Date(endDate)}
                                            showDateDisplay={false}
                                            disabledDates={disableDate}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <ul className="manage-cal-date">
                                            {selectedDates.map((date) => (
                                                <li key={date}>{date}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    {showdisableDate.length > 0 &&
                                        <div className="col-md-12">
                                            <p>Subscription Pause Dates</p>
                                            <ul className="pause-cal-date">
                                                {showdisableDate.map((date) => (
                                                    <li key={date}>{date}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className="row mt-2 justify-content-center">
                                    {errors.vacation_date && <p style={{ color: 'red' }}>{errors.vacation_date}</p>}
                                    <button type="button" className="btn1" onClick={saveManageCal}>Save <img src="assets/images/icons/right-arrow.svg" alt="" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth(Page);