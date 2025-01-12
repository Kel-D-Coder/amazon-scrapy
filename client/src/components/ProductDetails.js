import 'animate.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Loader } from './Loader'
import {useNavigate} from "react-router-dom";

export const ProductDetails = ({ name, price, image, animate, url }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState("");
    const controllerRef = useRef(null);
    const navigate = useNavigate();

    const trackProduct = async () => {
        setLoading(true);
        setError("");
        setSuccess("");


        const controller = new AbortController();
        controllerRef.current = controller;
        const signal = controller.signal;

        const productData = {
            name,
            price,
            image,
            url
        }

        try {
            if (price !== 'Unavailable') {
                setLoading(false);
                setSuccess('');
                setError('');

                const response = await axios.post("http://localhost:8000/api/v1/track", productData, {
                    signal,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await response.data;
                setLoading(false);
                setSuccess(data.msg);
                // console.log(data);
            } else {
                setLoading(false);
                setError("Cannot keep track of price Unavailable");
            }

        } catch (error) {
            if (axios.isCancel(error)) {
                return
            } else {

                setSuccess("")
                setLoading(false);
                setError(error.response.data.msg);
                navigate(error.response.data.loginUrl || error.response.data.subUrl);
                console.log(error);
            }
        }
    }

    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        }
    }, [])

    
    return (
        <div className={`mt-10 p-4 border self-center rounded-lg bg-gray-100 shadow-md w-full max-w-xl mb-8 ${animate ? 'animate__animated animate__fadeIn' : 'hidden'}`}>
            <div className="flex flex-col items-center">
                <img
                    src={image}
                    alt="Product"
                    className="w-32 h-32 object-contain rounded-md mb-4"
                />
                <h2 className="text-lg font-bold text-center text-gray-700">{name}</h2>
                <p className="text-md font-semibold mt-2 text-orange-600">Price: ${price}</p>
                <button className="mt-4 bg-orange-600 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-500 transition w-full disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 flex place-content-center" disabled={loading} onClick={trackProduct}>
                    {
                        loading ? <Loader /> : 'Track Product'
                    }
                </button>
                <p className='text-red-700 text-center'>{error}</p>
                <p className='text-green-700 text-center'>{success}</p>
            </div>
        </div>
    )
}