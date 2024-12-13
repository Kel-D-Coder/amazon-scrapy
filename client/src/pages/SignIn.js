import { Link, useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"
import { useDispatch } from "react-redux"
import { setUser } from "../store/userSlice"

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState("");
    const controllerRef = useRef('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const payload = {
        email,
        password
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        setError("");
        e.preventDefault();
        const controller = new AbortController();
        controllerRef.current = controller;
        const signal = controller.signal;

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { signal });

            const data = await response.data;
            setLoading(false);
            setSuccess(data.msg);
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.info));
            navigate('/');

            console.log(data);

        } catch (error) {
            if (error.name === 'AbortError') {
                return
            } else {
                setLoading(false)
                setError(error.response.data.msg);
                setSuccess("")
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
        <div className="bg-orange-600 p-6 rounded-2xl shadow-lg w-80 mx-auto my-20">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Login</h2>
            <hr className="border-white mb-6" />
            <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <input type="email" required onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Email</label>
                </div>
            
                <div className="relative mb-6">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full text-lg p-2 border-b-2 border-white bg-transparent focus:outline-none focus:border-gray-900" />
                    <label
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-gray-900 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-gray-900 peer-valid:top-[-10px] peer-valid:text-sm">
                    Password</label>
                </div>
            
                <button type="submit"
                    className="w-full flex place-content-center bg-gradient-to-br from-black to-gray-800 text-yellow-400 font-semibold py-2 rounded-full hover:opacity-90 transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300" disabled={loading}>
                    {loading ? <Loader /> : 'Log In'}
                </button>
                <p className="text-center text-red-700 mt-2">{error}</p>
                <p className="text-center text-green-700 mt-2">{success}</p>
                <footer className="text-center mt-6 text-lg text-gray-900">
                    Don't have an Account? <Link to='/sign-up' className="text-yellow-500 hover:text-white transition">Signup</Link>
                </footer>
            </form>
        </div>
    )
}