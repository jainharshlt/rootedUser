"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import OrderSummery from '@/componets/OrderSummery'
import axiosInstance from "@/config/axiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { addDays } from '@progress/kendo-date-math';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from "next/navigation";
import Auth from '@/route/Auth';
import Sticky from 'react-sticky-el';


const Page = () => {
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
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
        terms: false,
    });

    const [boxes, setBoxes] = useState([]);
    const [diet, setDiet] = useState([]);
    const [cuisine, setCuisine] = useState([]);
    const [orderData, setorderData] = useState({ box_id: '', boxPrice: parseFloat(0).toFixed(2), ActualboxPrice: parseFloat(0).toFixed(2), totalPrice: parseFloat(0).toFixed(2), discount: parseFloat(0).toFixed(2), gstRate: parseFloat(0).toFixed(2), shipping_charge: parseFloat(0).toFixed(2), shipping_charge_gstRate: parseFloat(0).toFixed(2), dietType: '', cuisine_id: '', start_date: '', end_date: '', coupon_code: '', weekend_type: '', holiday_days: [], userData: {}, wallet_amount: parseFloat(0).toFixed(2) });
    const [CurrentPage, setCurrentPage] = useState(1);
    const [errors, setErrors] = useState({ boxSize: '', dietType: '', cuisine: "" });
    const [imageUrl] = useState(axiosInstance.imageUrl);
    const [checkedCusines, setCheckedCusines] = useState([]);
    const [Cshow, setCshow] = useState(true);
    const [dropdownValue, setDropdownValue] = useState('');
    const [holidays, setHolidays] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [walletAmount, setWalletAmount] = useState(0);
    const [checkedCusinesfade, setCheckedCusinesFade] = useState([]);
    const [couponText, setCouponText] = useState('Apply Now');

    let min_Date = new Date();
    min_Date = addDays(min_Date, 2);

    function formatDate(stdate, eddate) {
        let day = String(stdate.getDate()).padStart(2, '0');
        let month = String(stdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let year = stdate.getFullYear();
        const starts = `${day}-${month}-${year}`;
        day = String(eddate.getDate()).padStart(2, '0');
        month = String(eddate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        year = eddate.getFullYear();
        const ends = `${day}-${month}-${year}`;
        return `${starts} To ${ends}`;
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setWalletAmount(userData.wallet_amount);
            let company_address = userData.company_address;
            company_address = company_address.split("||");
            setInitialValues({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                phone_number: userData.phone_number || '',
                email: userData.email || '',
                birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
                company: userData.company || '',
                company_address1: company_address[0] || "",
                company_address2: company_address[1] || "",
                city: userData.city || '',
                state: userData.state || '',
                pincode: userData.pincode || "",
                department: userData.department || '',
                designation: userData.designation || '',
                terms: false
            });
        }

        document.body.classList.add('headeBorder')
        return () => {
            document.body.classList.remove('headeBorder')
        }

    }, [])
    const validationSchema = Yup.object({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        phone_number: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
            .required("Mobile number is required"),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        birthdate: Yup.date().required("Birthdate is required"),
        company: Yup.string().required("Company Name is required"),
        company_address1: Yup.string().required("Company address is required"),
        city: Yup.string().required("City is required"),
        /* state: Yup.string().required("State is required"), */
        pincode: Yup.string()
            .oneOf(["400052", "400053", "400058", "400047", "400059", "400069", "400072", "400076", "400093", "400099"], "We are not delivering to this pincode at the moment.")
            .required("Pincode is required"),
        department: Yup.string().required("Department is required"),
        designation: Yup.string().required("Designation is required"),
        terms: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const combinedCompanyAddress = `${values.company_address1}` + '||' + `${values.company_address2}`.trim();

        const requestData = {
            ...values,
            company_address: combinedCompanyAddress
        }
        delete requestData.company_address1;
        delete requestData.company_address2;

        setorderData({ ...orderData, userData: requestData });
        setCurrentPage(6);

    };
    const [state, setState] = useState([
        {
            startDate: min_Date,
            endDate: min_Date,
            key: 'selection'
        }
    ]);

    const dateranges = (ranges) => {
        let range_data = ranges.selection;
        let StartDate = range_data.startDate;
        let dtd = new Date(StartDate);
        dtd = addDays(dtd, 29);
        range_data.endDate = dtd;
        setState([range_data]);
    }

    useEffect(() => {
    }, [cuisine, diet, boxes, orderData, CurrentPage, holidays, walletAmount]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/subscription")
            if (response.data.data) {
                setBoxes(response.data.data.boxes);
                setDiet(response.data.data.dietTypes);
                setCuisine(response.data.data.cuisines);
                let fadeArr = [];
                response.data.data.cuisines.map(fadeData => (
                    fadeArr[fadeData.id] = 'false'
                ))
                setCheckedCusinesFade(fadeArr);
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
    }, [checkedCusinesfade]);
    const stepOne = (event) => {
        if (!orderData.box_id) {
            setErrors({ boxSize: 'Please select a box size' });
        } else {
            if (orderData.box_id == 2) {
                setCshow(false);
                setCheckedCusines("");
                const orderDetails = orderData;
                orderDetails.cuisine_id = checkedCusines;
                setorderData(orderDetails);
            }
            setCurrentPage(2);
        }
    }
    const handleOptionChange = (event) => {
        const orderDetails = orderData;
        let boxId = event.target.value;
        orderDetails.box_id = boxId;

        for (var i = 0; i < boxes.length; i++) {
            if (boxes[i].id == boxId) {
                orderDetails.boxPrice = parseFloat(boxes[i].price);
                orderDetails.ActualboxPrice = parseFloat(boxes[i].actual_price);
            }
        }

        orderDetails.gstRate = (parseFloat(orderDetails.boxPrice) * parseFloat(axiosInstance.GSTRate)) / 100;
        orderDetails.shipping_charge = parseFloat(axiosInstance.shippingCharge).toFixed(2);
        orderDetails.shipping_charge_gstRate = (parseFloat(axiosInstance.shippingCharge) * parseFloat(axiosInstance.GSTRate)) / 100;

        orderDetails.gstRate = parseFloat(orderDetails.shipping_charge_gstRate) + parseFloat(orderDetails.gstRate);

        orderDetails.totalPrice = (parseFloat(orderDetails.boxPrice) + parseFloat(axiosInstance.shippingCharge) + parseFloat(orderDetails.gstRate)).toFixed(2);

        setorderData(orderDetails);
        setErrors({ ...errors, boxSize: '' });
    };
    const backone = () => {
        setCurrentPage(1);
    }
    const backTwo = () => {
        setCurrentPage(2);
    }
    const backThree = () => {
        setCurrentPage(3);
        setCheckedCusines("");
    }
    const diethandleSubmit = (event) => {
        event.preventDefault();
        if (event.target.dietType.value == '') {
            setErrors({ dietType: 'Please select a diet type' });
        } else {
            const orderDetails = orderData;
            orderDetails.dietType = event.target.dietType.value;
            setorderData(orderDetails);
            if (orderDetails.box_id == 2) {
                setCurrentPage(4);
            } else {
                setCurrentPage(3);
            }
        }
    }
    const handleDietOptionChange = (event) => {
        setErrors({ ...errors, boxSize: '' });
    }
    const cusinehandleSubmit = (event) => {
        event.preventDefault();
        if (checkedCusines.length === 0) {
            setErrors({ cuisine: 'Please select a cuisines' });
        } else if (checkedCusines.length < 3) {
            setErrors({ cuisine: 'You must be select at least 3 cuisines' });
        } else {
            const orderDT = { ...orderData, cuisine_id: checkedCusines };
            setorderData(orderDT);
            setCurrentPage(4);
        }
    }
    const handleCuisineChange = (event) => {
        const { value, checked } = event.target;
        let updatedCuisines = checkedCusines;
        let fadeData = checkedCusinesfade;
        if (checked) {
            if (checkedCusines.length + (1) <= 3) {
                fadeData[value] = 'true';
                updatedCuisines = [...checkedCusines, value];
            } else if (checkedCusines.length < 3) {
                setErrors({ cuisine: 'You can select a maximum of 3 cuisines' });
                return;
            } else {
                setErrors({ cuisine: 'You can select a maximum of 3 cuisines' });
                return;
            }
        } else {
            fadeData[value] = 'false';
            updatedCuisines = checkedCusines.filter(item => item !== value);
        }
        setCheckedCusinesFade(fadeData);
        setCheckedCusines(updatedCuisines);
        if (updatedCuisines.length === 0) {
            setErrors({ cuisine: 'Please select a cuisine' });
        } else if (updatedCuisines.length < 3) {
            setErrors({ cuisine: 'Choose up to 3 cuisines' });
        } else {
            setErrors({ ...errors, cuisine: '' });
        }

    };
    const handleDaterange = () => {
        const date_dt = state[0];
        orderData.start_date = date_dt.startDate;
        orderData.end_date = date_dt.endDate;
        setorderData(orderData);
        setCurrentPage(5);
    }
    const backFour = () => {
        setCurrentPage(4);
    }
    const backFive = () => {
        setCurrentPage(5);
    }
    const getHolidays = async () => {
        try {
            const response = await axiosInstance.get("/get-holidays")
            if (response.data.data) {
                let holi_arr = [];
                response.data.data.map((Element) => {
                    holi_arr.push(Element.date)
                })
                setHolidays(holi_arr);
                setorderData({ ...orderData, holiday_days: holi_arr });
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        getHolidays();
    }, [])

    const dayContentRenderer = (date) => {
        let FMS = date;
        FMS = addDays(date, 1);
        const formattedDate = FMS.toISOString().split('T')[0];
        const res = holidays.indexOf(formattedDate) + 1;
        const isSaturday = date.getDay() === 6;
        let weekdays = [];
        let className = 'normalDay';
        if (res > 0) {
            className = 'holidayDay';
            weekdays.push(formattedDate);
        } else if (isSaturday) {
            if (dropdownValue === 'all') {
                className = 'allSaturday';
                weekdays.push(formattedDate);
            } else if (dropdownValue === '1_3' && (Math.ceil(date.getDate() / 7) === 1 || Math.ceil(date.getDate() / 7) === 3)) {
                className = 'firstThirdSaturday';
                weekdays.push(formattedDate);
            } else if (dropdownValue === '2_4' && (Math.ceil(date.getDate() / 7) === 2 || Math.ceil(date.getDate() / 7) === 4)) {
                className = 'secondFourthSaturday';
                weekdays.push(formattedDate);
            }
        }
        return (
            <span className={className}>{date.getDate()}</span>
        )
    }
    const dayChange = (e) => {
        setDropdownValue(e.target.value);
        setorderData({ ...orderData, 'weekend_type': e.target.value });
    }

    const handlePayment = async () => {
        if (orderData.totalPrice > 0) {
            // Create order on server

            const od_response = await axiosInstance.post('/create-order', { amount: Number(orderData.totalPrice) });

            const options = {
                key: od_response.data.data.key,
                amount: ((orderData.totalPrice) * 100).toFixed(2),
                currency: "INR",
                name: "Rooted",
                description: "Buy Subscription Plan",
                order_id: od_response.data.data.order_id,
                handler: async function (response) {
                    const userRequestData = orderData.userData;

                    await axiosInstance.post("/update-profile", userRequestData)

                    userRequestData.wallet_amount = walletAmount;
                    localStorage.setItem('userData', JSON.stringify(userRequestData));

                    const requestDataS = {
                        box_id: orderData.box_id,
                        diet_type_id: orderData.dietType,
                        cuisine_ids: orderData.cuisine_id.join(","),
                        start_date: orderData.start_date,
                        end_date: orderData.end_date,
                        price: orderData.boxPrice,
                        sub_total: orderData.totalPrice,
                        total: orderData.totalPrice,
                        shipping_charge: orderData.shipping_charge,
                        gst_rate: orderData.gstRate,
                        coupon_discount: orderData.discount,
                        coupon_code: orderData.coupon_code,
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        weekend_type: orderData.weekend_type,
                        holiday_days: (orderData.holiday_days).toString(),
                        wallet_amount: orderData.wallet_amount
                    };

                    try {
                        await axiosInstance.post("/subscription/store", requestDataS)
                        localStorage.removeItem("rzp_device_id");
                        localStorage.removeItem("rzp_checkout_anon_id");
                        router.push('/subscription-thank-you')
                    } catch (error) {
                        toast.error(error.response.data.message)
                    }
                },
                prefill: {
                    name: orderData.userData.first_name + " " + orderData.userData.last_name,
                    email: orderData.userData.email,
                    contact: orderData.userData.phone_number
                },
                notes: {
                    address: orderData.userData.company_address.replace("||", "")
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            const userRequestData = orderData.userData;
            await axiosInstance.post("/update-profile", userRequestData)

            userRequestData.wallet_amount = walletAmount;
            localStorage.setItem('userData', JSON.stringify(userRequestData));

            const requestDataS = {
                box_id: orderData.box_id,
                diet_type_id: orderData.dietType,
                cuisine_ids: orderData.cuisine_id.join(","),
                start_date: orderData.start_date,
                end_date: orderData.end_date,
                price: orderData.boxPrice,
                sub_total: orderData.totalPrice,
                total: orderData.totalPrice,
                shipping_charge: orderData.shipping_charge,
                gst_rate: orderData.gstRate,
                coupon_discount: orderData.discount,
                coupon_code: orderData.coupon_code,
                payment_id: '',
                order_id: '',
                signature: ''
            };

            try {
                await axiosInstance.post("/subscription/store", requestDataS)
                router.push('/subscription-thank-you')
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

    };
    const handleCouponApply = async (event) => {
        event.preventDefault();

        if (couponText === 'Remove') {
            setCouponCode('');
            setCouponText('Apply Now');

            setorderData((prevState) => {
                const originalBoxPrice = parseFloat(prevState.boxPrice);
                const originalShippingCharge = parseFloat(prevState.shipping_charge);
                const gstRate = ((originalBoxPrice + originalShippingCharge) * parseFloat(axiosInstance.GSTRate)) / 100;

                const updatedTotalPrice = (originalBoxPrice + originalShippingCharge + gstRate - parseFloat(prevState.wallet_amount)).toFixed(2);

                return {
                    ...prevState,
                    coupon_code: '',
                    discount: '0.00',
                    gstRate: gstRate.toFixed(2),
                    totalPrice: updatedTotalPrice,
                };
            });

            return;
        }

        const requestData = {
            coupon_code: couponCode,
        };

        try {
            const response = await axiosInstance.post("/coupon-verify", requestData);
            if (response.data.status) {
                const discount = parseFloat(response.data.data.amount);
                const discountedPrice = parseFloat(orderData.boxPrice) - discount;

                let gstRate = (discountedPrice * parseFloat(axiosInstance.GSTRate)) / 100; // GST on discounted price
                const shipping_charge_gstRate = (parseFloat(axiosInstance.shippingCharge) * parseFloat(axiosInstance.GSTRate)) / 100;

                gstRate = gstRate + shipping_charge_gstRate;

                const shippingCharge = parseFloat(axiosInstance.shippingCharge);
                const updatedTotalPrice = ((discountedPrice + shippingCharge + gstRate) - parseFloat(orderData.wallet_amount)).toFixed(2);

                setorderData({
                    ...orderData,
                    coupon_code: couponCode,
                    discount: discount.toFixed(2),
                    gstRate: gstRate.toFixed(2),
                    shipping_charge: shippingCharge.toFixed(2),
                    totalPrice: updatedTotalPrice,
                });

                setCouponText("Remove");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error applying coupon");
        }
    };

    const useWalletAmount = (event) => {
        if (event.target.checked) {
            let total, w_amount, wallet_amt = 0;
            if (parseFloat(orderData.totalPrice) > parseFloat(walletAmount)) {
                total = (parseFloat((orderData.totalPrice) - (walletAmount))).toFixed(2);
                w_amount = walletAmount;
                wallet_amt = parseFloat(0).toFixed(2);
            } else {
                total = parseFloat(0).toFixed(2);
                wallet_amt = (parseFloat((walletAmount) - (orderData.totalPrice))).toFixed(2);
                w_amount = orderData.totalPrice;
            }
            setWalletAmount(wallet_amt);
            setorderData({ ...orderData, totalPrice: total, wallet_amount: w_amount });
        } else {
            setWalletAmount((parseFloat(walletAmount) + parseFloat(orderData.wallet_amount)).toFixed(2));
            let total = (parseFloat(orderData.totalPrice) + parseFloat(orderData.wallet_amount)).toFixed(2);
            setorderData({ ...orderData, totalPrice: total, wallet_amount: parseFloat(0).toFixed(2) });
        }
    }

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
                                    <div className="col-12" id="boxsize">
                                        {CurrentPage == 1 ? (
                                            <div className="subBox">
                                                <div className="head">Box Size</div>
                                                <div className="content">
                                                    <form>
                                                        <div className="row row-gap-4">
                                                            {boxes.map((box, index) => (

                                                                <div className="col-md-6">
                                                                    <div className="box-size boxsize">
                                                                        <input className="form-check-input" name="boxSize" type="radio" value={box.id} id={box.id} onChange={handleOptionChange} checked={orderData.box_id == box.id ? 'checked' : ''} />
                                                                        <span className="checkmark"></span>
                                                                        <label className="form-check-label" for={box.id}>
                                                                            {box.id == 1 ? (
                                                                                <img src="assets/images/subscribe/box.png" alt="" />
                                                                            ) : (
                                                                                <img src="assets/images/subscribe/box-small.png" alt="" />
                                                                            )}
                                                                        </label>
                                                                        <div className="title">{box.name}</div>
                                                                        <div className="title1">{box.component}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="row mt-5 justify-content-center">
                                                            {errors.boxSize && <p style={{ color: 'red' }}>{errors.boxSize}</p>}
                                                            <button type="button" onClick={stepOne} className="btn1">
                                                                Next <img src="assets/images/icons/right-arrow.svg" alt="" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="subBox">
                                                <div className="head">Box Size <a href="javascript:void(0)" className="edit" onClick={backone}>Edit</a></div>
                                                <div className="content">
                                                    <div className="row row-gap-4">
                                                        <div className="col-md-12">
                                                            {boxes.map((box, index) => (
                                                                <div>
                                                                    {box.id == orderData.box_id ? (
                                                                        <div className="boxSelected">
                                                                            <div className="box">
                                                                                {box.id == 1 ? (
                                                                                    <img src="assets/images/subscribe/box.png" alt="" />
                                                                                ) : (
                                                                                    <img src="assets/images/subscribe/box-small.png" alt="" />
                                                                                )}
                                                                            </div>
                                                                            <div className="title">
                                                                                {box.name}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <p></p>
                                                                    )}
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {CurrentPage == 2 &&
                                        <div className="col-12" id="DietType">
                                            <div className="subBox ">
                                                <div className="head b0">Diet Type</div>
                                                <div className="content">
                                                    <form onSubmit={diethandleSubmit}>
                                                        <div className="row row-gap-4">
                                                            {diet.map(diets => (
                                                                <div className="col-md-6">
                                                                    <div className="box-size DietType">

                                                                        <input className="form-check-input" name="dietType" type="radio" value={diets.id} id={diets.id} onClick={handleDietOptionChange} />
                                                                        <span className="checkmark"></span>
                                                                        <label className="form-check-label" for={diets.id}>
                                                                            {diets.id == 1 ? (
                                                                                <img src="assets/images/subscribe/veg.png" alt="" />
                                                                            ) : (
                                                                                <img src="assets/images/subscribe/non-veg.png" alt="" />
                                                                            )}
                                                                        </label>
                                                                        <div className="title">{diets.name}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="row row-gap-4 mt-5">
                                                            <div className="col-md-12">
                                                                <ul>
                                                                    <li>We serve Non-Veg on Wednesday and Friday.</li>
                                                                    <li>Non-Veg options may vary between Poultry, Seafood, Shellfish, Crustacean, or Goat as per availability.</li>
                                                                    <li>"Foods may contain garlic, onion, or similar ingredients."</li>
                                                                    <li>"Foods may contain nuts & nut-based products."</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-5 justify-content-center">
                                                            {errors.dietType && <p style={{ color: 'red' }}>{errors.dietType}</p>}
                                                            <button type="submit" className="btn1">Next <img src="assets/images/icons/right-arrow.svg" alt="" /></button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 1 &&
                                        <div className="col-12">
                                            <div className="subBox ">
                                                <div className="head b0">Diet Type</div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage > 2 &&
                                        <div className="row row-gap-4">
                                            <div className="col-12" id="DietType">
                                                <div className="subBox ">
                                                    <div className="head">Diet Type <Link href="javascript:void(0)" onClick={backTwo} className="edit">Edit</Link></div>
                                                    <div className="content">
                                                        <div className="row row-gap-4">
                                                            {diet.map(diet_s => (
                                                                diet_s.id == orderData.dietType &&
                                                                <div className="col-md-6">
                                                                    <div className="boxSelected">
                                                                        <div className="box">
                                                                            {diet_s.id == 1 ? (
                                                                                <img src="assets/images/subscribe/veg.png" alt="" />
                                                                            ) : (
                                                                                <img src="assets/images/subscribe/non-veg.png" alt="" />
                                                                            )}
                                                                        </div>
                                                                        <div className="title">
                                                                            {diet_s.name}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 3 &&
                                        <div className="row row-gap-4">
                                            <div className="col-12">
                                                <div className="col-12" id="Cuisine">
                                                    <div className="subBox ">
                                                        <form onSubmit={cusinehandleSubmit}>
                                                            <div className="head head-cusines">Cuisine <small>[Choose up to 3 cuisines]</small></div>
                                                            <div className="content">
                                                                <div className="row row-gap-5">
                                                                    {cuisine.map(cusines => (
                                                                        cusines.diet_type == orderData.dietType &&
                                                                        <div className="col-md-4">
                                                                            <div className="box-size">
                                                                                {checkedCusines.length >= 3 ? (
                                                                                    <input className="form-check-input" name={`cusine${cusines.id}`} type="checkbox" value={cusines.id} id={`cusine${cusines.id}`} onClick={handleCuisineChange} disabled={checkedCusinesfade[cusines.id] == 'true' ? false : true} />
                                                                                ) : (
                                                                                    <input className="form-check-input" name={`cusine${cusines.id}`} type="checkbox" value={cusines.id} id={`cusine${cusines.id}`} onClick={handleCuisineChange} />
                                                                                )}

                                                                                <span className="checkmark"></span>
                                                                                <label className="form-check-label" for={`cusine${cusines.id}`}>
                                                                                    <img src={`${imageUrl}${cusines.image}`} alt="" />
                                                                                </label>
                                                                                <div className="title">{cusines.name}</div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="row mt-5 justify-content-center">
                                                                    {errors.cuisine && <p style={{ color: 'red' }}>{errors.cuisine}</p>}
                                                                    {checkedCusines.length <= 3 &&
                                                                        <button type="submit" className="btn1">Next <img src="assets/images/icons/right-arrow.svg" alt="" /></button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage <= 2 && Cshow &&
                                        <div className="col-12">
                                            <div className="subBox ">
                                                <div className="head b0">Cuisine</div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage > 3 && Cshow &&
                                        <div className="row row-gap-4">
                                            <div className="col-12" id="Cuisine">
                                                <div className="subBox ">
                                                    <div className="head">Cuisine <Link href="javascript:void(0)" className="edit" onClick={backThree}>Edit</Link></div>
                                                    <div className="content">
                                                        <div className="row row-gap-4">
                                                            {cuisine.map(cuisines => (
                                                                checkedCusines.map(id => (
                                                                    cuisines.id == id &&
                                                                    <div className="col-md-12">
                                                                        <div className="boxSelected">
                                                                            <div className="icon">
                                                                                <img src="assets/images/subscribe/veg-icon.png" alt="" />
                                                                            </div>
                                                                            <div className="title">
                                                                                {cuisines.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage <= 3 &&
                                        <div className="col-12">
                                            <div className="subBox ">
                                                <div className="head b0">Delivery Days</div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 4 &&
                                        <div className="col-12" id="DeliveryDays">
                                            <div className="subBox ">
                                                <div className="head">Delivery Days</div>
                                                <div className="content">
                                                    <form action="" className="personalDetails">
                                                        <div className="row row-gap-4">
                                                            <div className="col-md-12">
                                                                <label for="" className="fs-300 text-center fw-medium">Select Weekend Type</label>
                                                                <select onChange={dayChange}>
                                                                    <option value="">None</option>
                                                                    <option value="all" selected={dropdownValue == 'all' ? 'selected' : ''}>All Saturday</option>
                                                                    <option value="1_3" selected={dropdownValue == '1_3' ? 'selected' : ''}>1st & 3rd Saturday's</option>
                                                                    <option value="2_4" selected={dropdownValue == '2_4' ? 'selected' : ''}>2nd & 4th Saturday's</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <div className="row row-gap-4 mt-5 justify-content-center">
                                                        <div className="col-md-10">
                                                            <DateRange
                                                                editableDateInputs={true}
                                                                minDate={min_Date}
                                                                onChange={dateranges}
                                                                ranges={state}
                                                                dayContentRenderer={dayContentRenderer}
                                                                rangeColors={['#115561', '#115561']}
                                                            />
                                                        </div>
                                                        <p>Selected Date: {formatDate(state[0].startDate, state[0].endDate)}</p>
                                                    </div>
                                                    <div className="row mt-5 justify-content-center">
                                                        <button type="button" className="btn1" onClick={handleDaterange}>Confirm <img src="assets/images/icons/right-arrow.svg" alt="" /></button>
                                                    </div>
                                                </div>
                                                <div className="note">
                                                    <div className="icon">
                                                        <img src="assets/images/icons/note.svg" alt="" />
                                                    </div>
                                                    <span>Note: Dates marked in yellow are your Non-Working Days and Public Holidays</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 5 &&
                                        <div className="col-12" id="DeliveryDays">
                                            <div className="subBox">
                                                <div className="head">Delivery Days <Link href="javascript:void(0)" className="edit" onClick={backFour}>Edit</Link></div>
                                                <div className="content">
                                                    <form action="" className="personalDetails">
                                                        <div className="row row-gap-4">
                                                            <div className="col-md-12">
                                                                <label for="" className="fs-300 text-center fw-medium">Select Weekend Type</label>
                                                                <select name="" id="" disabled>
                                                                    <option value="">None</option>
                                                                    <option value="all" selected={dropdownValue == 'all' ? 'selected' : ''}>All Saturday</option>
                                                                    <option value="1_3" selected={dropdownValue == '1_3' ? 'selected' : ''}>1st & 3rd Saturday's</option>
                                                                    <option value="2_4" selected={dropdownValue == '2_4' ? 'selected' : ''}>2nd & 4th Saturday's</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage <= 4 &&
                                        <div className="col-12">
                                            <div className="subBox ">
                                                <div className="head b0">Personal Details</div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 5 &&
                                        <div className="col-12" id="PersonalDetails">
                                            <div className="subBox">
                                                <div className="head">Personal Details</div>
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
                                                                        <Field type="text" id="phone_number" name="phone_number" placeholder="Phone Number" readOnly={initialValues.phone_number != null ? 'readonly' : ''} />
                                                                        <ErrorMessage name="phone_number" component="div" className="error" />
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <Field type="text" id="email" name="email" placeholder="Email Address" readOnly={initialValues.email != null && initialValues.email != '' ? true : false} />
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
                                                                    <div className="col-md-6">
                                                                        {/* <Field type="checkbox" id="term" name="term" />
                                                            <label htmlFor="term"></label> */}
                                                                        <label>
                                                                            <Field type="checkbox" name="terms" />
                                                                            &nbsp; T & C apply
                                                                        </label>
                                                                        <ErrorMessage name="term" component="div" className="error" />
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-5 justify-content-center">
                                                                    <button type="submit" className="btn1">Next <img src="assets/images/icons/right-arrow.svg" /></button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 6 &&
                                        <div className="col-12" id="PersonalDetails">
                                            <div className="subBox">
                                                <div className="head">Personal Details <a href="javascript:void(0)" onClick={backFive} className="edit">Edit</a></div>
                                                <div className="content">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <div className="fs-300 fw-semiBold text-neutral-900">{orderData.userData.first_name} {orderData.userData.last_name} | {orderData.userData.company}</div>
                                                            <p className="fs-200 text-neutral-900">{(orderData.userData.company_address).replace("||", "")}, {orderData.userData.city}, {orderData.userData.state}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <p className="fs-200 text-neutral-900">+91 {orderData.userData.phone_number}</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <p className="fs-200 text-neutral-900">{orderData.userData.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage <= 5 &&
                                        <div className="col-12">
                                            <div className="subBox ">
                                                <div className="head b0">Payment</div>
                                            </div>
                                        </div>
                                    }
                                    {CurrentPage == 6 &&
                                        <div className="col-12" id="Payment">
                                            <div className="subBox">
                                                <div className="head">Payment</div>
                                                <div className="content pt-3 pb-3">
                                                    <div className="row row-gap-4 align-items-center">
                                                        <div className="col-md-6">
                                                            <form action="">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={useWalletAmount} />
                                                                    <label className="form-check-label" for="flexCheckDefault">
                                                                        Use your ₹ {walletAmount} <span className="fw-medium ">Rooted Wallet Balance</span>
                                                                    </label>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="coupon">
                                                                <form onSubmit={handleCouponApply}>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter Coupon Code"
                                                                        value={couponCode}
                                                                        onChange={(e) => setCouponCode(e.target.value)}
                                                                        disabled={orderData.totalPrice <= 0 || couponText === 'Remove'}
                                                                    />
                                                                    <button
                                                                        type="submit"
                                                                        disabled={orderData.totalPrice <= 0}
                                                                    >
                                                                        {couponText}
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="row row-gap-2 mt-4 justify-content-center">
                                                        <div className="col-md-6">
                                                            <a href="/subscription" className="btn1 w-100">Cancel</a>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button type="button" onClick={handlePayment} className="btn1 w-100">Pay Now</button>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* <div className="col-md-4 sticky">
                        <div id="orderSummeryWrap">
                            <div id="sidebar">
                                <OrderSummery orderDetails={orderData} />
                            </div>
                        </div>
                    </div> */}
                            <div className="col-md-4 stickyparent" >
                                <Sticky className="wrapper" boundaryElement=".stickyparent" bottomOffset={0} hideOnBoundaryHit={false}>
                                    <div id="orderSummeryWrap">
                                        <div id="sidebar">
                                            <OrderSummery orderDetails={orderData} />
                                        </div>
                                    </div>
                                </Sticky>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default Auth(Page);