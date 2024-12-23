import React from 'react';
import axios from "axios";
import {useEffect, useState } from "react";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router-dom";

export const TrackedProduct = () => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      setLoading(true);

      const controller = new AbortController();
      const signal = controller.signal;

    const getTrackedProducts = async () => {

      try {
        const response = await  axios.get('http://localhost:8000/api/v1/track/get-tracked', {
          signal,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const data = await response.data;
        setTrackedProducts(data)
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          setLoading(false);
          navigate(error.response.data.loginUrl);
        }
      }
    }

    getTrackedProducts();

    return () => {
      controller.abort();
    }
  }, [navigate])

  return (
      <div className="min-h-screen text-white py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Tracked Products</h1>
          <p className="text-gray-300 mt-2">
            View and manage the products you're tracking.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 flex flex-col justify-center items-center">
          {loading ? (
              <Loader/>
          ) : trackedProducts.length === 0 ? (
              <h1 className="text-orange-500">No product is being tracked</h1>
          ) : (
              <ul className="space-y-4">
                {trackedProducts.map((trackedProduct) => {
                  return (
                      <li
                          key={trackedProduct._id}
                          className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                              src={trackedProduct.imageUrl}
                              alt={trackedProduct.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-md"
                          />
                          <div>
                            <h2 className="text-lg font-semibold">{trackedProduct.name}</h2>
                            <p className="text-sm text-gray-400">
                              Current Price: <span
                                className="text-orange-500 font-bold">{`$${trackedProduct.currentPrice}`}</span>
                            </p>
                          </div>
                        </div>
                        <button
                            className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
                          Untrack
                        </button>
                      </li>
                  );
                })}
              </ul>
          )}
        </div>
      </div>
  );
};
