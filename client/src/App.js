// import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Pricing } from "./pages/Pricing"
import { TrackedProduct} from "./pages/TrackedProduct"
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/Landing";
import {Navbar} from "./components/Navbar";

function App() {
  return (

      <BrowserRouter>
         <Navbar />
        <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/tracked-product" element={<TrackedProduct />} />
              <Route path="/landing-page" element={<LandingPage />} />
        </Routes>
          <Footer />
      </BrowserRouter>
  );
}

export default App;
