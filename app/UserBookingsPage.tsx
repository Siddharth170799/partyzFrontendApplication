import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";
import Mycontext from "@/context/createContext";
import axios from "axios";
import { PostUserPhoneNumber, getAllUserBookings } from "@/config/useLocalConfig";

const UserBookingsPage = () => {
  const [myBookings, setMyBookings] = useState([]);
  const { userPhoneNumber } = useContext(Mycontext);

  const bookingsList = async () => {
    await axios.post(PostUserPhoneNumber, {
      userPhoneNumber,
    });
  };

  async function post() {
    try {
      const details = await axios.get(
       getAllUserBookings
      );
      const filteredBookings = details?.data?.filter(
        (item) => item.PhoneNumber === userPhoneNumber
      );
      setMyBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  useEffect(() => {
    bookingsList();
    post();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      {myBookings.length > 0 ? (
        myBookings.map((booking, index) => (
          <View key={index} style={styles.bookingCard}>
            <Text>Date: {booking.Date}</Text>
            <Text>Function Hall: {booking.FunctionHallName}</Text>
            <Text>Name: {booking.NameofTheUserBooked}</Text>
            <Text>Type of Event: {booking.TypeOfEvent}</Text>

            <Text
              style={
                booking.Request === "Rejected"
                  ? styles.rejectedText
                  : booking.Request === "Approved"
                  ? styles.approvedText
                  : styles.pendingText
              }
            >
              {booking.Request === "Rejected"
                ? "Booking Request Rejected"
                : booking.Request === "Approved"
                ? "Booking Request Approved"
                : "Booking Request Pending"}
            </Text>
          </View>
        ))
      ) : (
        <Text>No bookings found.</Text>
      )}
    </View>
  );
};

export default UserBookingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  rejectedText: {
    color: "red",
    fontWeight: "bold",
  },
  approvedText: {
    color: "green",
    fontWeight: "bold",
  },
  pendingText: {
    color: "orange",
    fontWeight: "bold",
  },
});
