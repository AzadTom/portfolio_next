'use client';

import React from "react";
import Stepper from "./Stepper";

const StepperContainer = () => {
  const CHECKOUT_STEPS = [
    {
      name: "Customer",
      Component: () => <div>Provide your contact details.</div>,
    },
    {
      name: "Shipping",
      Component: () => <div>Enter your shipping address.</div>,
    },
    {
      name: "Payment",
      Component: () => <div>Complete your payment for your order.</div>,
    },
    {
      name: "Delivered",
      Component: () => <div>Your order has been delivered.</div>,
    },
  ];

  return (
    <div>
      <Stepper steps={CHECKOUT_STEPS} />
    </div>
  );
};

export default StepperContainer;
