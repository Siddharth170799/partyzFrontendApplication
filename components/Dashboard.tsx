import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Card from "@/components/Card";
import { GetFunctionHalls } from "@/config/useLocalConfig";
import Navbar from "@/components/Header";
import { useNavigation } from "expo-router";

export default function Dashboard({ location, navigation }) {
  const [functionHalls, setFunctionHalls] = useState([]);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = useState([]);
  const [searchByHallName, setSearchByHallName] = useState("");
  const navigation1 = useNavigation();

  const FunctionHallsData = async () => {
    try {
      const hallsList = await axios.get(GetFunctionHalls);
      setFunctionHalls(hallsList.data);
    } catch (error) {
      console.error("Error fetching function halls:", error);
    }
  };

  const filteredFunctionHallsBySearch = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) =>
        item.Name.toLowerCase().includes(searchByHallName.toLowerCase()) ||
        item.Address.toLowerCase().includes(searchByHallName.toLowerCase())
    );

    setFilteredFunctionHalls(filteredFunctionHallsDetails);
  };

  const filteredFunctionHallsByLocation = () => {
    const filteredFunctionHallsDetails1 = functionHalls.filter(
      (item) =>
        item?.lat == `${location?.latitude}` &&
        item?.long == `${location?.longitude}`
    );

    setFunctionHalls(filteredFunctionHallsDetails1);
  };

  const filteredFunctionHallsByPax = () => {
    const filteredFunctionHallsDetails = functionHalls.filter(
      (item) => parseInt(item.Capacity) > 400
    );

    setFunctionHalls(filteredFunctionHallsDetails);
  };

  useEffect(() => {
    FunctionHallsData();
  }, []);

  useEffect(() => {
    filteredFunctionHallsBySearch();
  }, [searchByHallName]);

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <TouchableOpacity
            style={styles.myBookingsButton}
            onPress={() => navigation1.navigate("UserBookingsPage")}
          >
            <Text style={styles.myBookingsButtonText}>My Bookings</Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search By Hall Name or Location"
              onChangeText={(text) => setSearchByHallName(text)}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={filteredFunctionHallsByPax}
              >
                <Text style={styles.buttonText}>Capacity above 500</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={FunctionHallsData}
              >
                <Text style={styles.buttonText}>Display All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.cardsContainer}>
            {filteredFunctionHalls.length > 0 || searchByHallName != ""
              ? filteredFunctionHalls.map((hall, id) => (
                  <Card key={id} hall={hall} />
                ))
              : functionHalls.map((hall, id) => <Card key={id} hall={hall} />)}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "orange",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  contentContainer: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  cardsContainer: {
    flexGrow: 1,
  },
  myBookingsButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  myBookingsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
