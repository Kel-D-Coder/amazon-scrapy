import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Portal } from "./pages/Portal"
import { Pricing } from "./pages/Pricing"
import { TrackedProduct} from "./pages/TrackedProduct"
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Footer } from "./components/Footer";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51OtQK2P5uge0MF4ZfkX6VB63ubdwsC1DamD6XhWwYyUShpnigKt0F9T1nunBWoCB7FRdkJ0Mv5P69SQDIBEvbDYW00oog7atSv');

function App() {
  return (

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/tracked-product" element={<TrackedProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
