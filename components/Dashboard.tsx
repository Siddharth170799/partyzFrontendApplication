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
import { CheckBox } from 'react-native-elements';

export default function Dashboard({ location }) {
  const [functionHalls, setFunctionHalls] = useState([]);
  const [filteredFunctionHalls, setFilteredFunctionHalls] = useState([]);
  const [searchByHallName, setSearchByHallName] = useState("");

  

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


  const filteredFunctionHallsByPax=()=>{
    const filteredFunctionHallsDetails= functionHalls.filter((item)=> parseInt(item.Capacity) > 400)
    console.log(filteredFunctionHallsDetails,"haaaaii")
    setFunctionHalls(filteredFunctionHallsDetails)
  }

  useEffect(() => {
    FunctionHallsData();
  }, []);

  useEffect(() => {
    filteredFunctionHallsBySearch();
    // filteredFunctionHallsBySearch1();
  }, [searchByHallName]);
  // useEffect(() => {
  //   filteredFunctionHallsByLocation();
  // }, [location]);
  // console.log(location)

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        {/* <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Marriage Bookings</Text>
        </TouchableOpacity>
      </View> */}

        <View style={styles.mainContent}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search By Hall Name or Location"
              onChangeText={(text) => setSearchByHallName(text)}
            />
          </View>
          {/* <View style={styles.checkboxContainer}>
      <View style={styles.searchContainer}>
      
          <TouchableOpacity >
          <Text >Capacity above 500</Text>
        </TouchableOpacity>

      </View>
    </View> */}
        <View style={styles.checkboxContainer}>
      <View style={styles.searchContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={filteredFunctionHallsByPax}>
          <Text style={styles.buttonText}>Capacity above 500</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={FunctionHallsData}>
          <Text style={styles.buttonText}>Display All</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
          {/* <View>
            <Text>{location?.latitude}</Text>
            <Text>{location?.longitude}</Text>
          </View> */}
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
  button: {
    backgroundColor: "#FF6347", // Background color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    alignItems: "center", // Center content
    justifyContent: "center",
    width: 300, // Center content
  },
  buttonText: {
    color: "#FFF", // Text color
    fontSize: 13, // Font size
    fontWeight: "bold", // Font weight
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // or 'space-around' or 'space-evenly' for spacing
  },
  sidebar: {
    width: "25%",
    backgroundColor: "orange",
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  sidebarTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    fontSize: 15,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  cardsContainer: {
    flexGrow: 1,
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
    color:"black"
  },
  contentContainer: {
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
