import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../baseurl";

const AddCity = () => {
  const [name, setName] = useState("");
  // disabled eslint
  /* eslint-disable */
  const [countries, setCountries] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/countries`)
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
        .get(`${baseUrl}/api/states/${selectedCountry}`)
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(`${baseUrl}/api/cities/${selectedState}`)
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    } else {
      setCities([]);
    }
  }, [selectedState]);

  // Handle form submission to add a new city
  const handleAddCity = (e: any) => {
    e.preventDefault();
    if (!name || !selectedState) {
      toast.error("Please fill all required fields.");
      return;
    }

    const data = {
      name,
      stateId: selectedState,
    };

    axios
      .post(`${baseUrl}/api/cities`, data)
      .then((response) => {
        toast.success("City added successfully.");
        setName("");
        // disabled eslint
        /* eslint-disable */
        setCities([...cities, response.data.city]);
      })
      .catch((error) => {
        toast.error("Error adding city");
        console.error("Error adding city:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Manage Cities
      </h2>
      <form onSubmit={handleAddCity} className="space-y-4">
        <div className="mb-4">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
        <div className="mb-4">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select State</option>
            {/* disabled eslint   */}
            {/* eslint-disable */}
            {states?.map((state: any) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-colors duration-200"
        >
          Add City
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Cities List
        </h3>
        {cities.length > 0 ? (
          <ul className="space-y-2">
            {cities.map((city: any) => (
              <li
                key={city._id}
                className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm"
              >
                {city.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No cities found.</p>
        )}
      </div>
    </div>
  );
};

export default AddCity;
