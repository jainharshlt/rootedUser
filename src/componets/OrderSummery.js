import React, { useState } from "react";

const OrderSummery = (orderDetails) => {
  return (
    <>
      <div className="row row-gap-4 ">
            <div className="col-12">
              <div className="summary">
                <div className="head">Order Summary</div>
                <ul>
                  <li>
                    <div className="title">Base Price</div>
                    <div className="price">₹{orderDetails.orderDetails.boxPrice}<br />
                      <strike>₹{orderDetails.orderDetails.ActualboxPrice}</strike>
                    </div>
                  </li>
                  <li>
                    <div className="title">Discount</div>
                    <div className="price red">-₹{orderDetails.orderDetails.discount}</div>
                  </li>
                  <li>
                    <div className="title">Wallet Amount</div>
                    <div className="price">-₹{orderDetails.orderDetails.wallet_amount}</div>
                  </li>
                  <li>
                    <div className="title">Shipping cost</div>
                    <div className="price red">₹{orderDetails.orderDetails.shipping_charge}</div>
                  </li>
                  <li>
                    <div className="title">GST Taxes</div>
                    <div className="price">₹{orderDetails.orderDetails.gstRate}</div>
                  </li>
                  
                  <li>
                    <div className="title">Total Payment</div>
                    <div className="price red">₹{orderDetails.orderDetails.totalPrice}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
    </>
  );
};

export default OrderSummery;
