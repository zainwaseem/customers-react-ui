import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`http://localhost:5000/api/states/${selectedCountry}`)
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(`http://localhost:5000/api/cities/${selectedState}`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedState]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      name,
      email,
      password,
      confirmPassword,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    };

    axios
      .post("http://localhost:5000/api/customers/register", data)

      .then((response: any) => {
        toast.success("Customer registered successfully");
        console.log(response);
      })
      // disabled eslint
      /* eslint-disable */
      .catch((error: any) => {
        toast.error("Error registering customer:");
        console.log(error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-10 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-xl">
      <h2 className="text-4xl font-semibold mb-10 text-center text-gray-800 tracking-tight">
        Register Customer
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          >
            <option value="">Select Country</option>
            {/* disabled eslint   */}
            {/* eslint-disable */}
            {countries?.map((country: any) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          >
            <option value="">Select State</option>
            {/* disabled eslint   */}
            {/* eslint-disable */}
            {states?.map((state: any) => (
              <option key={state._id} value={state._id}>
                {state?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            required
          >
            <option value="">Select City</option>
            {cities?.map((city: any) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
