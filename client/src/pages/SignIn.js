import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { Loader } from "../components/Loader"
import { useDispatch } from "react-redux"
import { setUser } from "../store/userSlice"
import { signInWithPopup } from "firebase/auth"
import { auth, GoogleProvider} from "../firebase/firebase"

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const controllerRef = useRef(null);


    const payload = {
        email,
        password
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        setError("");
        e.preventDefault();

        // Create a new AbortController for the request
        const controller = new AbortController();
        controllerRef.current = controller; // Store the controller in the ref
        const signal = controller.signal;


        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/login', payload, { signal });

            const data = await response.data;
            setLoading(false);
            setSuccess(data.msg);
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.info));
            navigate('/');

        } catch (error) {
            if (axios.isCancel(error)) {
                return
            } else {
                setLoading(false)
                setError(error.response.data.msg);
                setSuccess("")
            }
        }
    }

    const signWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider);
            const user = result.user;

            // send user details to the backend
            const response = await axios.post('http://localhost:8000/api/v1/auth/signWithGoogle', {
                name: user.displayName,
                email: user.email,
            });

            const data = await response.data;
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.info));
            navigate('/');
        } catch (error) {
            console.log("Google sign-in error: ", error.message);
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
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-3xl shadow-2xl w-96 mx-auto my-10">
            <h2 className="text-center text-3xl font-extrabold text-white mb-6">Login</h2>
            <hr className="border-white mb-6"/>
            <form onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer w-full text-lg p-3 border-2 rounded-md border-gray-300 bg-white focus:outline-none focus:border-orange-600"
                    />
                    <label
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange-600"
                    >
                        Email
                    </label>
                </div>

                <div className="relative mb-6">
                    <input
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer w-full text-lg p-3 border-2 rounded-md border-gray-300 bg-white focus:outline-none focus:border-orange-600"
                    />
                    <label
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-gray-600 pointer-events-none transition-all peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-orange-600"
                    >
                        Password
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full flex place-content-center bg-gradient-to-br from-black to-gray-800 text-yellow-400 font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
                    disabled={loading}
                >
                    {loading ? <Loader/> : "Log In"}
                </button>
                <p className="text-center text-red-700 mt-2">{error}</p>
                <p className="text-center text-green-700 mt-2">{success}</p>

                {/* Sign in with Google */}
                <div className="my-4 flex justify-center items-center">
                    <div className="border-t border-white flex-grow"></div>
                    <span className="mx-4 text-white">or</span>
                    <div className="border-t border-white flex-grow"></div>
                </div>
                <button
                    type="button"
                    onClick={signWithGoogle}
                    className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/2875/2875404.png"
                        alt="Google"
                        className="w-6 h-6 mr-3"
                    />
                    Sign in with Google
                </button>

                <footer className="text-center mt-6 text-lg text-white">
                    Don't have an Account?{" "}
                    <Link to="/sign-up" className="text-yellow-300 hover:text-white transition">
                        Signup
                    </Link>
                </footer>
            </form>
        </div>

    )
}