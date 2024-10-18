import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { baseUrl } from "../baseurl";

const AddState = () => {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);
  // disabled eslint
  /* eslint-disable */
  const [states, setStates] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);

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
      setLoadingStates(true);
      axios
        .get(`${baseUrl}/api/states/${selectedCountry}`)
        .then((response) => {
          setStates(response.data);
          setLoadingStates(false);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
          setLoadingStates(false);
        });
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Handle form submission to add a new state
  const handleAddState = (e: any) => {
    e.preventDefault();
    if (!name || !selectedCountry) {
      toast.error("Please fill all required fields.");
      return;
    }

    const data = {
      name,
      countryId: selectedCountry,
    };

    axios
      .post(`${baseUrl}/api/states`, data)
      .then((response) => {
        toast.success("State added successfully.");
        setName("");
        // Refresh the state list after adding a new state
        // disabled eslint
        /* eslint-disable */
        setStates([...states, response.data.state]);
      })
      .catch((error) => {
        toast.error("Error adding state");
        console.error("Error adding state:", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Manage States
      </h2>
      <form onSubmit={handleAddState} className="space-y-4">
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
          <input
            type="text"
            placeholder="State Name"
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
          Add State
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          States List
        </h3>
        {loadingStates ? (
          <div className="flex justify-center items-center">
            <HashLoader color="#36d7b7" />
          </div>
        ) : states.length > 0 ? (
          <ul className="space-y-2">
            {/* disabled eslint   */}
            {/* eslint-disable */}
            {states.map((state: any) => (
              <li
                key={state._id}
                className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm"
              >
                {state.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No states found.</p>
        )}
      </div>
    </div>
  );
};

export default AddState;
