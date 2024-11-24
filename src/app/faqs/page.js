"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
const page = () => {
  useEffect(() => {
    document.body.classList.add("headeBorder");
    return () => {
      document.body.classList.remove("headeBorder");
    };
  }, []);

  return (
    <>
      <div id="main">
        <div className="breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul>
                  <li>
                    <Link href="/">Back To Homepage</Link>
                  </li>
                  <li>FAQs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className="faq | margin-bottom-900 mt-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1 className="heading1 text-md-center">FAQs</h1>
              </div>
            </div>
            <div className="row mt-4 justify-content-center">
              <div className="col-md-10">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>1. How are the meals packaged?</Accordion.Header>
                        <Accordion.Body>We pack each meal component with love and care, using eco-friendly containers to ensure a clean and guilt-free experience.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>2.	Do you deliver on Sundays and public holidays?</Accordion.Header>
                                      <Accordion.Body>
                                          Our service is available on all Saturdays. However, we do not deliver on Sundays and 11 public holidays listed in our calendar.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>3.	Can I pause, cancel, or restart my subscription?</Accordion.Header>
                        <Accordion.Body>You can pause your subscription by 4:00 PM the day before your break. It will automatically restart the day after your selected timeout.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>4.	Is it possible to change the delivery address mid-subscription?</Accordion.Header>
                        <Accordion.Body>Yes, you can change the delivery location mid-subscription, as long as it's within our deliverable areas.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>5.	What cuisines and meal options are available?</Accordion.Header>
                        <Accordion.Body>We offer the authentic regional flavors of India, currently featuring Punjabi, Gujarati, South Indian, Bengali, and Maharashtrian cuisines. Choose from two signature meal boxes or try a paid trial. More cuisines coming soon!</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>6.	When will my meal be delivered each day?</Accordion.Header>
                        <Accordion.Body>Meals are delivered daily between 11:00 AM and 1:00 PM to ensure a timely lunch experience.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>7.	How often are non-vegetarian meals served, and what do they include?</Accordion.Header>
                        <Accordion.Body>Non-vegetarian meals are served twice a week, on Wednesdays and Fridays, featuring Chicken, Eggs, Fish, and Mutton.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header>8.	How can I check the delivery status, and what should I do if there’s a delay or missed delivery?</Accordion.Header>
                        <Accordion.Body>You'll receive a notification from our Operations Team once your meal is delivered, along with the day's menu. If your meal is late or undelivered, please contact our Toll-free number: 1800-268-0268.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="8">
                        <Accordion.Header>9.	Can I modify my food preferences during the subscription?</Accordion.Header>
                        <Accordion.Body>We understand preferences may change, but making adjustments mid-subscription is a lengthy process. For such requests, please email us at info@rootedtoyou.com.</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="9">
                        <Accordion.Header>10.	What is the refund process, and can I request one if I no longer need the service?</Accordion.Header>
                        <Accordion.Body>Please refer to our refund policy for details on cancellations and refunds</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="10">
                        <Accordion.Header>11.	What are the available payment methods for subscriptions?</Accordion.Header>
                        <Accordion.Body>We accept only digital payments for convenience and error reduction. You can pay via credit/debit cards, NEFT, or digital wallets like Google Pay and Paytm.</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
