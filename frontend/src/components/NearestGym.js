import React, { useState } from "react";
import axios from "axios";

const NearestGymFinder = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);

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

      if (response.data.length === 0) {
        setError("No gyms found in the area.");
      } else {
        setGyms(response.data);
        setShowMap(true);
      }
    } catch (error) {
      console.error("Error fetching gym data:", error.message);
      setError("Error fetching gym data. Please try again later.");
    }
  };

  return (
    <div>
      <label style={{ fontSize: "15px", textAlign: "center", paddingRight: "5px"}} htmlFor="city">City:</label>
      <input  style={{ fontSize: "20px", textAlign: "center", paddingLeft: "5px"}} type="text" id="city" value={selectedCity} onChange={handleCityChange} />
  
      <label style={{ fontSize: "15px", textAlign: "center", paddingLeft: "15px"}} htmlFor="state">State:</label>
      <input  style={{ fontSize: "20px", textAlign:"center", paddingRight: "5px"}} type="text" id="state" value={selectedState} onChange={handleStateChange} />
  
      <button style={{ fontSize: "20px", textAlign: "center", paddingLeft: "15px"}} onClick={fetchGymsByLocation}>Find Gyms in the Area</button>
  
      {error && <div>{error}</div>}
  
      {gyms.length > 0 && (
        <div>
          <u style={{paddingTop: "10px", paddingBottom: "10px"}}>Gyms in the Area:</u>
          <ul>
            {gyms.map((gym) => (
              <li style={{ fontSize: "25px", textAlign: "left", paddingLeft: "5px", paddingTop: "5px", paddingBottom: "20px"}} key={gym.place_id}>
                <p>Address: {gym.display_name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}
export default NearestGymFinder;
