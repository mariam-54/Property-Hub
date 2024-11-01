import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Login from "../pages/Login/Login";
import About from "../pages/AboutUs/About";
import OurServives from "../pages/OurServices/OurServices";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Contact from "../pages/ContactUs/Contact";
import Properties from "../pages/Properties/Properties";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import MyProperties from "../pages/MyProperties/MyProperties";
import MyFavourite from "../pages/MyFavourite/MyFavourite";
import Reviews from "../pages/Reviews/Reviews";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddProperty from "../pages/AddProperty/AddProperty";
import Logout from "../pages/Logout/Logout";
import FirebaseUpload from "../components/FirebaseUpload/FirebaseUpload";
import { HelmetProvider } from "react-helmet-async";

const Approutes = () => {
  return (
    <>
    <HelmetProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/our-services" element={<OurServives />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:_id" element={<PropertyDetails />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/firebase-upload" element={<FirebaseUpload/>}/>

      {/* User dashboard routes  */}
      <Route path="/user-dashboard" element={<UserDashboard />}>
        <Route path="my-properties" element={<MyProperties />} />
        <Route path="my-favorites" element={<MyFavourite />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
    </HelmetProvider>
    </>

  );
};

export default Approutes;
