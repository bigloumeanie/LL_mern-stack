import React, { useState, useEffect } from "react";

function MapApp() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        function (position) {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;

          console.log(`Latitude: ${newLat}, longitude: ${newLng}`);
          console.log(position);

          setLat(newLat);
          setLng(newLng);

          // Fetch location information using Nominatim reverse geocoding
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newLat}&lon=${newLng}`
          )
            .then((response) => response.json())
            .then((data) => {
              const state = data.address.state || "Unknown State";
              setLocationInfo(`${state}`);
            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
            });
        },
        function (error) {
          console.error("Error getting user location:", error);
        }
      );

      // Clean up the geolocation watch when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {lat !== null && lng !== null && (
        <div>{locationInfo && <p> Location: {locationInfo}</p>}</div>
      )}
    </div>
  );
}

export default MapApp;
