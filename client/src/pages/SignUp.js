import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"

export const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const controllerRef = useRef(null);
    const navigate = useNavigate();

    const payload = {
        name: fullName,
        email,
        password,
        confirmPassword,
    };


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError('');
        
        const controller = new AbortController();
        controllerRef.current = controller;
        const signal = controller.signal;

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/register', payload, {
                signal,
            });

            const data = await response.data;
            setSuccess(data.msg)
            setLoading(false);
            navigate('/sign-in')

        } catch (error) {
            if (axios.isCancel(error)) {
                return;
            } else {
                setLoading(false)
                setError(error.response.data.msg);
                setSuccess("");
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
        <div className="bg-orange-600 p-6 rounded-2xl shadow-lg w-80 mx-auto my-10">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Register</h2>
            <hr className="border-white mb-6 " />
            <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <input type="text" required className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" onChange={(e) => setFullname(e.target.value)} />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Full Name</label>
                </div>
            
                <div className="relative mb-6">
                    <input type="email" required className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" onChange={(e) => setEmail(e.target.value)} />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Email</label>
                </div>
            
                <div className="relative mb-6">
                    <input type="password" required className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" onChange={(e) => setPassword(e.target.value)} />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Password</label>
                </div>
            
                <div className="relative mb-6">
                    <input type="password" required className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Confirm Password</label>
                </div>
            
                <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-black to-gray-800 text-yellow-400 font-semibold py-2 rounded-full 
                    hover:opacity-90 transition flex place-content-center 
                    disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                    disabled={loading}
                >
                    {loading ? <Loader /> : 'Sign Up'}
                </button>
                <p className="text-center text-red-700 mt-2">{error}</p>
                <p className="text-center text-green-700 mt-2">{success}</p>
                <footer className="text-center mt-6 text-lg text-gray-900">
                    Have an Account? <Link to='/sign-in' className="text-yellow-500 hover:text-white transition">Login</Link>
                </footer>
            </form>
        </div>
    )
}
