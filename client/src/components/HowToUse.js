// HowToUse.js
import React from 'react';
import 'animate.css';

export const HowToUse = () => {
  const steps = [
    {
      title: 'Paste Your Product Link',
      description: 'Simply copy the product URL from Amazon and paste it into the input box provided.',
      image: 'https://icons.veryicon.com/png/o/object/material-design-icons/insert-link.png', // Replace with your actual image path
    },
    {
      title: 'Track Product',
      description: 'Click on the Track Product button, and our bot will start monitoring the price for you.',
      image: 'https://st2.depositphotos.com/47577860/46972/v/450/depositphotos_469721670-stock-illustration-analytics-data-monitoring-icon-marketing.jpg', // Replace with your actual image path
    },
    {
      title: 'Get Notified',
      description: 'You will receive notifications via email whenever the price drops or at the scheduled time.',
      image: 'https://static.vecteezy.com/system/resources/previews/004/999/412/non_2x/mail-icon-envelope-sign-email-symbol-free-vector.jpg', // Replace with your actual image path
    },
  ];

  return (
    <section className="bg-black-100 py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">How to Use Our Bot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center animate__animated animate__fadeIn"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-32 h-32 mb-4 rounded-md object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};