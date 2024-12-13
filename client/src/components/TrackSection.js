// import { useState } from 'react'
import 'animate.css';
import { HowToUse } from './HowToUse';

export const TrackSection = () => {
    // const [productInfo, setProductInfo] = useState(null);
    // const [inputValue, setInputValue] = useState('');
    // const [animate, setAnimate] = useState(false);
    let animate = true

    return (
        <section className="flex flex-col place-items-center">
            

            <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-4 sm:space-y-0">
                <input
                    type="text"
                    placeholder="Paste your product link here"
                    className="border-2 border-gray-600 focus:ring-2 focus:ring-yellow-500 bg-gray-800 w-80 text-white px-4 h-11 py-2 rounded-l-md sm:w-80 md:w-80 placeholder-gray-400"
                    aria-label="Product URL"
                />
                <button
                    className="bg-orange-600 text-white h-11 font-semibold px-6 py-2 rounded-r-md sm:rounded-l-none hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:ml-2 w-full sm:w-auto"
                >
                    Track Product
                </button>
            </div>

            
            {/* Product details */}

            <div className={`mt-6 p-4 border rounded-lg bg-gray-100 shadow-md w-full max-w-xl ${animate ? 'animate__animated animate__fadeIn' : 'hidden'}`}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <img
                    src="https://slickmobile.com.ng/wp-content/uploads/2024/06/Samsung-S24-Ultra.jpg"
                    alt=""
                    className="w-32 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                    />
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg font-bold">Samsung s24 ultra</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aliquid
                            libero maxime, explicabo amet voluptatibus suscipit porro quia fugit
                            modi!
                        </p>
                        <p className="text-md font-semibold mt-2 text-orange-600">Price: $1500</p>
                        <button className="mt-4 bg-orange-600 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-500 transition lg:w-full sm:w-full">
                            Track Product
                        </button>
                    </div>
                </div>
            </div>


            <HowToUse />
        </section>

    )
}