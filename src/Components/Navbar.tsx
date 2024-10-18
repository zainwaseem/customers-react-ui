import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className=" px-4 py-2 rounded-md">
            Customers List
          </Link>

          {/* <Link to="/states" className=" px-4 py-2 rounded-md">
            States
          </Link>

          <Link to="/cities" className=" px-4 py-2 rounded-md">
            Cities
          </Link> */}
          <Link to="/states" className=" px-4 py-2 rounded-md">
            States
          </Link>
          <Link to="/cities" className=" text-white px-4 py-2 rounded-md">
            Cities
          </Link>
          <Link to="/add-customer" className=" px-4 py-2 rounded-md">
            Add Customer
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
