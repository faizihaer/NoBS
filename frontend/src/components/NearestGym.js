import React, { useState } from "react";
import axios from "axios";

const NearestGymFinder = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [gyms, setGyms] = useState([]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const fetchGymsByLocation = async () => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          format: "json",
          q: `gym ${selectedCity}, ${selectedState}`,
        },
      });

      setGyms(response.data);
    } catch (error) {
      console.error("Error fetching gym data:", error.message);
    }
  };

  return (
    <div>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" value={selectedCity} onChange={handleCityChange} />

      <label htmlFor="state">State:</label>
      <input type="text" id="state" value={selectedState} onChange={handleStateChange} />

      <button onClick={fetchGymsByLocation}>Find Gyms in the Area</button>

      {gyms.length > 0 && (
        <div>
          <h2>Gyms in the Area:</h2>
          <ul>
            {gyms.map((gym) => (
              <li key={gym.place_id}>
                <p>Name: {gym.display_name}</p>
                <p>Address: {gym.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NearestGymFinder;
