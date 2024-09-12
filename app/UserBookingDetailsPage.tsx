import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import {
  ValidateEmail,
  ValidateGuests,
  ValidateName,
  ValidatePhoneNumber,
} from "@/Validations/userDetailsValidation";
import Mycontext from "@/context/createContext";
import { useNavigation } from "expo-router";
import { PostBookingDatesDetails, postBookingDate } from "@/config/useLocalConfig";

const UserDetailsForm = () => {
  const {userPhoneNumber} = useContext(Mycontext)
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [guestsError, setGuestsError] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [bookingDoneMessage, setBookingDoneMessage] = useState("");
  const [globalErrorMessage, setGlobalErrorMessage] = useState("");
  const navigation = useNavigation()

  const { hallBookedDate } = useContext(Mycontext);
  console.log(hallBookedDate, "ooo");

  const { selectedHallName } = useContext(Mycontext);
  console.log(selectedHallName, "lllllooopooooo");







  const postUserDetails = async () => {
    if (name != "") {
      if (phoneNumber != "") {
        if (email != "") {
          if (dateOfBooking == "") {
            if (typeOfEvent != "") {
              if (numberOfGuests != "") {
                if (userAddress != "") {
                  const userDetails = await axios.post(
                    PostBookingDatesDetails,
                    {
                      name,
                      phoneNumber:userPhoneNumber,
                      email,
                      dateOfBooking: hallBookedDate,
                      typeOfEvent,
                      numberOfGuests,
                      userAddress,
                    }
                  );
                  await axios.post(
                    postBookingDate,
                    {
                      bookingDate: hallBookedDate,
                      functionHallName: selectedHallName,
                      phoneNumber: phoneNumber,
                      request: "Pending",
                      nameOfThePersonBooked: name,
                      typeOfEvent: typeOfEvent,
                      SupervisorId: `${selectedHallName}/123`,
                      numberOfGuests: numberOfGuests,
                    }
                  );

                  setGlobalErrorMessage("");
                  setBookingDoneMessage("Request Pending");
                  setTimeout(function(){
                        navigation.navigate("UserBookingsPage")
                  },3000)
                }
              } else {
                setGlobalErrorMessage("Enter All the fields");
                setBookingDoneMessage("");
              }
            } else {
              setGlobalErrorMessage("Enter All the fields");
              setBookingDoneMessage("");
            }
          } else {
            setGlobalErrorMessage("Enter All the fields");
            setBookingDoneMessage("");
          }
        } else {
          setGlobalErrorMessage("Enter All the fields");
          setBookingDoneMessage("");
        }
      }
      
      else {
        setGlobalErrorMessage("Enter All the fields");
        setBookingDoneMessage("");
      }
    } else {
      setGlobalErrorMessage("Enter All the fields");
      setBookingDoneMessage("");
    }
  };

  const handleEmail = (text) => {
    const email = text;
    console.log(email);
    setEmail(email);
    setEmailError(ValidateEmail(email));
  };

  const handlePhoneNumber = (number) => {
    const phoneNumber = number;
    setPhoneNumber(phoneNumber);
    setPhoneNumberError(ValidatePhoneNumber(phoneNumber));
  };

  const handleName = (name) => {
    const userName = name;
    console.log(userName);
    setName(userName);
    setNameError(ValidateName(userName));
  };

  const handleGuests = (guests) => {
    const numberofguests = guests;
    setNumberOfGuests(numberofguests);
    setGuestsError(ValidateGuests(numberofguests));
  };

  return (
    <ImageBackground
      source={require("../images/LandingImage.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Event Booking Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={handleName}
        />
        {nameError && <Text style={{ color: "red" }}>{nameError}</Text>}
        <TextInput
          style={styles.input}
          placeholder="PhoneNumber"
          value={userPhoneNumber}
          
        />
        {/* {phoneNumberError && (
          <Text style={styles.errorMessage}>{phoneNumberError}</Text>
        )} */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmail}
        />
        {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Date of Booking"
          value={hallBookedDate}
        />

        <Picker
          selectedValue={typeOfEvent}
          style={styles.picker}
          onValueChange={(itemValue) => setTypeOfEvent(itemValue)}
        >
          <Picker.Item label="Select Event Type" value="" />
          <Picker.Item label="Wedding" value="Wedding" />
          <Picker.Item label="Reception" value="Reception" />
          <Picker.Item label="Engagement" value="Engagement" />
          <Picker.Item label="Birthday Party" value="Birthday" />
          <Picker.Item label="Corporate Event" value="Corporate" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Number of Guests"
          value={numberOfGuests}
          keyboardType="numeric"
          onChangeText={handleGuests}
        />
        {guestsError && <Text style={{ color: "red" }}>{guestsError}</Text>}

        <TextInput
          style={styles.input}
          placeholder="User Address"
          value={userAddress}
          onChangeText={setUserAddress}
        />

        <TouchableOpacity style={styles.button} onPress={postUserDetails}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{ color: "red", textAlign: "center" }}>
          {globalErrorMessage}
        </Text>
        <Text style={{ color: "red", textAlign: "center" }}>
          {bookingDoneMessage}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
  },
  nameError: {
    color: "red",
  },
});

export default UserDetailsForm;
