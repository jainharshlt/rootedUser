"use client";
import React, { useEffect, useState } from "react";
import Auth from '@/route/Auth';
import axiosInstance from "@/config/axiosInstance";
import { toast } from "react-toastify";
import Link from "next/link";

const Page = () => {
    const [bilingHistroy, setBilingHistory] = useState([]);

    useEffect(() => {
        document.body.classList.add('headeBorder')
        return () => {
            document.body.classList.remove('headeBorder')
        }
    }, [])

    useEffect(() => {
        const fetchBilingHistory = async () => {
            try {
                const response = await axiosInstance.get('/get-billing-history')
                setBilingHistory(response.data.data)
            } catch (error) {
                toast.error(error.response.error.message)
            }
        };

        fetchBilingHistory();
    }, [])
    return (

        < >
            <div id="main" className="subscribeWrapper">
                <div className="breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ul>
                                    <li><a href="">Subscription Details</a></li>
                                    <li>Billing History</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="margin-bottom-900 mt-3">
                    <div className="container">

                        <div className="row row-gap-5">
                            <div className="col-12">
                                <h1 className="heading3">Billing History</h1>
                            </div>
                        </div>
                        <div className="row row-gap-5 mt-4">
                            <div className="billing-history">
                                <div className="head">
                                    <div className="title">Date</div>
                                    <div className="title">Order Number</div>
                                    <div className="title">Box Size</div>
                                    <div className="title">Amount</div>
                                    <div className="title">Action</div>
                                </div>
                                {bilingHistroy.length > 0 ? (
                                    bilingHistroy.map((item, index) => (
                                        <div className="body" key={item.id}>
                                            <div className="text">{new Date(item.created_at).toLocaleDateString()}</div>
                                            <div className="text">{item.order_no}</div>
                                            <div className="text">{item.box.name}</div>
                                            <div className="text">₹{item.total}</div>
                                            <div className="text">
                                                <Link
                                                    href={`/subscription-details?id=${item.id}`}
                                                    className="actionButton"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
                                                        <path d="M23.2047 11.745C22.3226 9.46324 20.7912 7.48996 18.7998 6.06906C16.8084 4.64817 14.4443 3.84193 11.9997 3.75C9.55507 3.84193 7.19097 4.64817 5.19958 6.06906C3.20819 7.48996 1.6768 9.46324 0.794681 11.745C0.735106 11.9098 0.735106 12.0902 0.794681 12.255C1.6768 14.5368 3.20819 16.51 5.19958 17.9309C7.19097 19.3518 9.55507 20.1581 11.9997 20.25C14.4443 20.1581 16.8084 19.3518 18.7998 17.9309C20.7912 16.51 22.3226 14.5368 23.2047 12.255C23.2643 12.0902 23.2643 11.9098 23.2047 11.745ZM11.9997 16.875C11.0355 16.875 10.093 16.5891 9.29128 16.0534C8.48959 15.5177 7.86475 14.7564 7.49577 13.8656C7.12679 12.9748 7.03025 11.9946 7.21835 11.0489C7.40646 10.1033 7.87075 9.23464 8.55254 8.55285C9.23432 7.87107 10.103 7.40677 11.0486 7.21867C11.9943 7.03057 12.9745 7.12711 13.8653 7.49609C14.7561 7.86506 15.5174 8.48991 16.0531 9.2916C16.5888 10.0933 16.8747 11.0358 16.8747 12C16.8727 13.2923 16.3584 14.5311 15.4446 15.445C14.5308 16.3588 13.292 16.873 11.9997 16.875Z" />
                                                    </svg>
                                                </Link>

                                                <a href={`${axiosInstance.baseUrls}${'download-history/'}${item.id}`} className="actionButton">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 11.15V4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289C11.1054 3.48043 11 3.73478 11 4V11.15L8.77999 8.374C8.69954 8.2669 8.59839 8.17706 8.48254 8.10981C8.3667 8.04256 8.23853 7.99926 8.10563 7.9825C7.97273 7.96573 7.83782 7.97584 7.70891 8.01221C7.57999 8.04859 7.4597 8.11049 7.35516 8.19425C7.25063 8.27801 7.16399 8.38192 7.10039 8.49981C7.03679 8.61769 6.99752 8.74716 6.98491 8.88051C6.9723 9.01387 6.98661 9.1484 7.027 9.27611C7.06738 9.40383 7.13301 9.52213 7.21999 9.624L11.22 14.624C11.3137 14.7408 11.4324 14.8351 11.5674 14.8998C11.7024 14.9646 11.8503 14.9982 12 14.9982C12.1497 14.9982 12.2976 14.9646 12.4326 14.8998C12.5676 14.8351 12.6863 14.7408 12.78 14.624L16.78 9.624C16.867 9.52213 16.9326 9.40383 16.973 9.27611C17.0134 9.1484 17.0277 9.01387 17.0151 8.88051C17.0025 8.74716 16.9632 8.61769 16.8996 8.49981C16.836 8.38192 16.7494 8.27801 16.6448 8.19425C16.5403 8.11049 16.42 8.04859 16.2911 8.01221C16.1622 7.97584 16.0273 7.96573 15.8944 7.9825C15.7615 7.99926 15.6333 8.04256 15.5174 8.10981C15.4016 8.17706 15.3004 8.2669 15.22 8.374L13 11.15Z" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.657 15.874L7.358 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V15C21 14.4696 20.7893 13.9609 20.4142 13.5858C20.0391 13.2107 19.5304 13 19 13H16.642L14.342 15.874C14.0609 16.2253 13.7045 16.5089 13.299 16.7037C12.8935 16.8986 12.4494 16.9998 11.9995 16.9998C11.5496 16.9998 11.1055 16.8986 10.7 16.7037C10.2945 16.5089 9.93806 16.2253 9.657 15.874ZM17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18H17.01C17.2752 18 17.5296 17.8946 17.7171 17.7071C17.9046 17.5196 18.01 17.2652 18.01 17C18.01 16.7348 17.9046 16.4804 17.7171 16.2929C17.5296 16.1054 17.2752 16 17.01 16H17Z" />
                                                    </svg>
                                                </a>
                                                <a href="" className="actionButton">
                                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17.6 4.25L11.06 8.34C10.41 8.75 9.59 8.75 8.94 8.34L2.4 4.25C2.29973 4.19371 2.21192 4.11766 2.14189 4.02645C2.07186 3.93525 2.02106 3.83078 1.99258 3.71937C1.96409 3.60796 1.9585 3.49194 1.97616 3.37831C1.99381 3.26468 2.03434 3.15581 2.09528 3.0583C2.15623 2.96079 2.23632 2.87666 2.33073 2.811C2.42513 2.74533 2.53187 2.69951 2.6445 2.6763C2.75712 2.65309 2.87328 2.65297 2.98595 2.67595C3.09863 2.69893 3.20546 2.74453 3.3 2.81L10 7L16.7 2.81C16.7945 2.74453 16.9014 2.69893 17.014 2.67595C17.1267 2.65297 17.2429 2.65309 17.3555 2.6763C17.4681 2.69951 17.5749 2.74533 17.6693 2.811C17.7637 2.87666 17.8438 2.96079 17.9047 3.0583C17.9657 3.15581 18.0062 3.26468 18.0238 3.37831C18.0415 3.49194 18.0359 3.60796 18.0074 3.71937C17.9789 3.83078 17.9281 3.93525 17.8581 4.02645C17.7881 4.11766 17.7003 4.19371 17.6 4.25Z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="body">
                                        <div className="text">No billing history available.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Auth(Page);