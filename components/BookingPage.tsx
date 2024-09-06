import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";
import Mycontext from "@/context/createContext";

const BookingPage = ({ date, bookingDates,functionHallName }) => {
  const navigation = useNavigation();
  const [displayMessage, setDisplayMessage] = useState("");

  const {hallBookedDate,sethallBookedDate} = useContext(Mycontext)
  
  const { selectedHallName } = useContext(Mycontext);

  const datePosting = async () => {
    try {
      if (bookingDates.includes(date)  ){
        setDisplayMessage("");
        setDisplayMessage("No slots available on this day");
      } else if (date) {
        // await axios.post("http://192.168.0.5:4000/api/postBookingDate", {
        //   bookingDate: date,
        // });    
        sethallBookedDate(date)
        setDisplayMessage("");
        navigation.navigate("UserBookingDetailsPage");
      }
    } catch (error) {
      console.error("Error posting date:", error);
    }
  };

  console.log(date)


  return (
    <View style={styles.container}>
      <Text>{displayMessage}</Text>
      <TouchableOpacity style={styles.button} onPress={datePosting}>
        <Text style={styles.buttonText}>Confirm Date</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "orange",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});


export default BookingPage;
