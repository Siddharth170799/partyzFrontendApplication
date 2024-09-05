import { useNavigation } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Mycontext from "@/context/createContext";

const Card = ({ hall }) => {
  const { selectedHallName, setselectedHallName } = useContext(Mycontext);

  function bookHall(Name: any) {
    navigation.navigate("BookingDatePicker");
    setselectedHallName(Name);
  }



  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image source={{ uri: hall.Image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{hall.Name}</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.description}>{hall.Address}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => bookHall(hall.Name)}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#333",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
});

export default Card;
