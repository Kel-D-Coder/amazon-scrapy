import { useState, useRef, useEffect } from 'react'
import 'animate.css';
import { HowToUse } from './HowToUse';
import axios from 'axios'
import { Loader } from './Loader';
import { ProductDetails } from './ProductDetails';

export const TrackSection = () => {
    const [productInfo, setProductInfo] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);
    const controllerRef = useRef(null);

    const handleSubmit = async (e) => {
        setError("");
        setLoading(true);
        e.preventDefault();
        
        const controller = new AbortController();
        controllerRef.current = controller
        const signal = controller.signal

        try {
            const response = await axios.post("http://localhost:8000/api/v1/track/get-product", {url: inputValue}, { 
                signal,
            });

            const data = await response.data

            setLoading(false);
            setProductInfo(data.productData);
            setAnimate(true);

            // console.log(data)

        } catch (error) {
            if (axios.isCancel(error)) {
                return
            } else {
                setLoading(false);
                setError(error.response?.data.msg);
                // console.log(error.response.data.msg)
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
        <>
            <section className="text-center py-16 px-4 text-white flex flex-col">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Welcome To <span className="text-orange-500">Amazon Scrapy</span>
                </h2>

                {/* Subtext */}
                <p className="text-lg mb-8">
                    Paste your product link below to get started with price tracking.
                </p>

                {/* Form Section */}
                <form
                    className="flex flex-col md:flex-row justify-center items-center gap-4 relative"
                    onSubmit={handleSubmit}
                >
                    {/* Input Field */}
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Paste your product link here"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        {/* Clear Button (appears when input is not empty) */}
                        {inputValue && (
                            <button
                                type="button"
                                onClick={() => setInputValue('')}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                                aria-label="Clear input"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                        disabled={loading}
                    >
                        {loading ? <Loader/> : 'Get Product'}
                    </button>
                </form>

                {/* Error Message */}
                {error && <p className="text-red-700 text-center">{error}</p>}

                {/* Product Details Component */}
                {productInfo && (
                    <ProductDetails
                        name={productInfo.name}
                        price={productInfo.price}
                        image={productInfo.productImage}
                        animate={animate}
                        url={inputValue}
                    />
                )}
            </section>
            <HowToUse/>
        </>

    )
}