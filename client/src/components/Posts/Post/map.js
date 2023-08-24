import React, { useState, useEffect } from "react";

function MapApp() {
  if (!("geolocation" in navigator)) {
    console.error("Geolocation is not supported by this browser.");
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude);
        const long = Number(position.coords.longitude);
        const apiKey = "7507ea0c02084a469414d51670a73f72";
        console.log(`Latitude: ${lat}, longitude: ${long}`);

        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&type=city&lang=en&limit=1&format=json&apiKey=${apiKey}`
        )
          .then((response) => response.json())
          .then((result) => {
            const city = result.results[0].address_line1;
            console.log(city);
            return city;
          })
          .catch((error) => console.log("error", error));
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }
}

export default MapApp;
