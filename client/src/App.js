import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Portal } from "./pages/Portal"
import { Pricing } from "./pages/Pricing"
import { TrackedProduct} from "./pages/TrackedProduct"
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Footer } from "./components/Footer";

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
        <Route path="/tracked-product" element={<TrackedProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
