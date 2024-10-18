import { useState, useEffect } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { baseUrl } from "../baseurl";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  // disabled eslint
  /* eslint-disable */
  const [error, setError] = useState<any>(null);
  const [search, setSearch] = useState("");

  // Fetch all customers
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/customers`)
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        // disabled eslint
        /* eslint-disable */
        // ts-ignore
        setError("Error fetching customers");
        setLoading(false);
        console.error("Error fetching customers:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-semibold mb-6 text-secondary text-center">
        Customer List
      </h2>
      <div className="overflow-x-auto">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-primary/30 my-3  outline-none border-none  px-4 py-2 rounded-md"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <table className="min-w-full bg-white  rounded-lg shadow-md">
          <thead>
            <tr className="bg-primary text-white   uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-left">State</th>
              <th className="px-6 py-3 text-left">City</th>
            </tr>
          </thead>
          <tbody className="text-tertiary   font-medium">
            {customers
              ?.filter((customer: any) =>
                customer.name.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((customer: any) => (
                <tr key={customer._id} className=" ">
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {customer.country?.name || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {customer.state?.name || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {customer.city?.name || "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
