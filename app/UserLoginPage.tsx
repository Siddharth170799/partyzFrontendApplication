import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "expo-router";
import Mycontext from "@/context/createContext";
import { ValidatePhoneNumber } from "@/Validations/userDetailsValidation";

const UserLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError,setPhoneNumberError] = useState()

  const { userPhoneNumber, setUserPhoneNumber } = useContext(Mycontext);
  const navigation = useNavigation();

  const handleInput = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
    setUserPhoneNumber(phoneNumber);
    setPhoneNumberError(ValidatePhoneNumber(phoneNumber))
   
  };

  const NavigateToDashboard=()=>{
    if(phoneNumber.length == 10){
      navigation.navigate("MainDashboardPage")

    }
  }

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number to Proceed</Text>
      <Input
        onChangeText={handleInput}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={{ type: "font-awesome", name: "phone", color: "#007bff" }}
      />
       {phoneNumberError && <Text style={styles.errorMessage}>{phoneNumberError}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={NavigateToDashboard}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
  },
});

export default UserLoginPage;
