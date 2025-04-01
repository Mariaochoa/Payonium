import {Routes, Route} from "react-router-dom";
import Home from "../pages/home/Home";  //xxxxxxxxxxx
import Transaction from "../pages/transaction/Transaction";
import Profile from "../pages/profile/Profile.jsx";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Admin from "../pages/admin/Admin";

import Profiles from "../pages/admin/profiles/Profiles";
import Accounts from "../pages/admin/accounts/Accounts";
import Orders from "../pages/admin/orders/Orders";
import Transactions from "../pages/admin/transactions/Transactions";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction" element= {<Transaction />} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not Fount - 404</h1>} /> 

            {/* Rutas de administración */}
            <Route path="/admin" element={<Admin />}>
                <Route path="profiles" element={<Profiles />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="orders" element={<Orders />} />
                <Route path="transactions" element={<Transactions />} />
            </Route>
            
        </Routes>
    )
}

export default Router;