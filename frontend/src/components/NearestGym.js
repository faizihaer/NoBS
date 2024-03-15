import React, { useState } from "react";
import axios from "axios";

const NearestGymFinder = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [gyms, setGyms] = useState([]);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);


  // Type in city 
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
//type in state
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
//use nominatim instead of google thing to fetch the selected gyms
  const fetchGymsByLocation = async () => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          format: "json",
          //this syntax took me so long :cry:
          q: `gym ${selectedCity}, ${selectedState}`,
        },
      });
//error checks
      if (response.data.length === 0) {
        setError("No gyms found in the area.");
      } else {
        setGyms(response.data);
        setShowMap(true);
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 10);
      }
    } catch (error) {
      console.error("Error fetching gym data:", error.message);
      setError("Error fetching gym data. Please try again later.");
    }
  };
//return results, styling as well
  return (
    <div>
      <label style={{ fontSize: "15px", color: "white", marginLeft: "40px", textAlign: "center", paddingRight: "5px"}} htmlFor="city">City:</label>
      <input style={{ fontSize: "20px", marginLeft: "10px", textAlign: "center"}} type="text" id="city" value={selectedCity} onChange={handleCityChange} />
  
      <label style={{ fontSize: "15px", color: "white", textAlign: "center",  paddingLeft: "15px"}} htmlFor="state">State:</label>
      <input  style={{ fontSize: "20px", marginLeft: "10px", textAlign:"center" }} type="text" id="state" value={selectedState} onChange={handleStateChange} />
  
      <button style={{color: "white", fontSize: "15px", marginLeft: "20px", paddingBottom: "15px", paddingTop: "15px", borderBlockColor: "white",  textAlign: "center", paddingLeft: "15px"}} onClick={fetchGymsByLocation}>Find Gyms in the Area</button>
  
      {error && <div>{error}</div>}
  
      {gyms.length > 0 && (
        <div>
          <u style={{ color: "white",fontSize: "20px", paddingT: "25px", paddingLeft: "25px", paddingBottom: "25px"}}>Gyms in the Area:</u>
          <ul>
            {gyms.map((gym) => (
              <p style={{ color: "white", fontSize: "30px", textAlign: "left", paddingBottom: "10px", paddingLeft: "30px"}} key={gym.place_id}>
                 <ul >Address: {gym.display_name}</ul>
              </p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}
export default NearestGymFinder;
