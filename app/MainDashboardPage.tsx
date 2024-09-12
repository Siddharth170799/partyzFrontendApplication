import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Dashboard from "@/components/Dashboard";
import Mycontext from "@/context/createContext";
import { useNavigation } from "expo-router";

const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  const {input} = useContext(Mycontext)
  console.log(input,"llll")

  useEffect(() => {
    const getLocationAsync = async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission not granted");
        console.log("Location permission not granted");
        return;
      }

      // Get current location
      try {
        let { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        // Truncate latitude and longitude
        const truncateDecimal = (value, decimals) =>
          Number(value.toFixed(decimals));
        const truncatedLatitude = truncateDecimal(coords.latitude, 3); // Truncate to 4 decimal places
        const truncatedLongitude = truncateDecimal(coords.longitude, 4); // Truncate to 4 decimal places

        console.log("Truncated Location:", {
          latitude: truncatedLatitude,
          longitude: truncatedLongitude,
        }); // Log the truncated coordinates
        setLocation({
          latitude: truncatedLatitude,
          longitude: truncatedLongitude,
        });
      } catch (error) {
        console.error("Error fetching location:", error); // Log any error
        setErrorMsg("Error fetching location");
      }
    };

    getLocationAsync();
  }, []);

  return (
    <>
      <Dashboard location={location} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default UserLocation;
