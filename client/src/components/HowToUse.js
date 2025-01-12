// HowToUse.js
import React from 'react';
import 'animate.css';

export const HowToUse = () => {

  return (
       <section className="py-16  bg-gray-800 text-white">
          <h3 className="text-3xl font-bold text-center text-orange-500 mb-12">
            How to Use Our Bot
          </h3>
          <div className="grid md:grid-cols-3 gap-8 px-6">
            <div className="text-center bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🔗</div>
              <h4 className="text-xl font-bold mb-2">Paste Your Product Link</h4>
              <p className="text-gray-300">
                Simply copy the product URL from Amazon and paste it into the
                input box provided.
              </p>
            </div>
            <div className="text-center bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">📈</div>
              <h4 className="text-xl font-bold mb-2">Track Product</h4>
              <p className="text-gray-300">
                Click on the "Get Product" button, and our bot will start
                monitoring the price for you.
              </p>
            </div>
            <div className="text-center bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">📩</div>
              <h4 className="text-xl font-bold mb-2">Get Notified</h4>
              <p className="text-gray-300">
                You will receive notifications via email whenever the price drops
                or at the scheduled time.
              </p>
            </div>
          </div>
      </section>
  );
};