import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Contact from "./contact";
import Gallery from "./aboutUs";
import Items from "./items";
import BookingPage from "./bookingPage";
import ProductOverview from "./productOverview";
import Home from "./home";
import ErrorNotFound from "./error";
import Footer from "../../components/footer";
import AboutUs from "./aboutUs";

export default function HomePage(){
    
    return(
        <>
            <Header/>
            <div className="h-[calc(100vh-100px) w-full bg-amber-50]">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/booking" element={<BookingPage/>}/>
                    <Route path="/product/:key" element={<ProductOverview/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/*" element={<ErrorNotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    )
}