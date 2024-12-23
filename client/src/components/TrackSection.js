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
        <section className="flex flex-col place-items-center">
            

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-4 sm:space-y-0">
                <div className="relative w-80 sm:w-80 md:w-80">
                    <input
                    type="text"
                    placeholder="Paste your product link here"
                    className="border-2 border-gray-600 focus:ring-2 focus:ring-yellow-500 bg-gray-800 w-full text-white px-4 h-11 py-2 rounded-l-md placeholder-gray-400"
                    aria-label="Product URL"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
                    {inputValue && (
                    <button
                        type="button"
                        onClick={() => setInputValue('')}
                        className="absolute right-2 top-2 text-gray-400 hover:text-white focus:outline-none"
                        aria-label="Clear input"
                    >
                        ✕
                    </button>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-orange-600 text-white h-11 font-semibold px-6 py-2 rounded-r-md flex place-content-center sm:rounded-l-none hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:ml-2 w-full sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                    disabled={loading}
                >
                    {loading ? <Loader /> : 'Get Product'}
                </button>
            </form>

            <p className='text-red-700 text-center'>{error}</p>

            <ProductDetails name={productInfo.name} price={productInfo.price} image={productInfo.productImage} animate={animate} url={inputValue} />
            <HowToUse />
        </section>

    )
}