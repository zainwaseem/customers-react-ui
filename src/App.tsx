import { Toaster } from "react-hot-toast";
import AddCustomer from "./pages/AddCustomer";
import CustomerList from "./pages/CustomerList";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import AddCity from "./pages/AddCity";
import AddState from "./pages/AddState";

export default function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/cities" element={<AddCity />} />
        <Route path="/states" element={<AddState />} />
      </Routes>
      <Toaster />
    </div>
  );
}
