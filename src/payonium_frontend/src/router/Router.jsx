import {Routes, Route} from "react-router-dom";
import Home from "../pages/home/Home";  //xxxxxxxxxxx
import Transaction from "../pages/transaction/Transaction";
import Profile from "../pages/profile/Profile.jsx";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";




const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction" element= {<Transaction />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not Fount - 404</h1>} /> 
        </Routes>
    )
}

export default Router;