import { Link } from "react-router-dom";

export const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-4">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>

        {/* Redirect Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition inline-block"
          >
            Go to Home page
          </Link>
        </div>
      </div>
    </div>
    )
}