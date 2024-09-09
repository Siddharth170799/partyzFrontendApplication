import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

const UserDetailsForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const {hallBookedDate} = useContext(Mycontext)
  console.log(hallBookedDate,"ooo")

  const {selectedHallName} = useContext(Mycontext)
  console.log(selectedHallName,"lllllooopooooo")

  const postUserDetails = async () => {
    if (name != "") {
      if (phoneNumber != "") {
        if (email != "") {
          if (dateOfBooking == "") {
            if (typeOfEvent != "") {
              if (numberOfGuests != "") {
                if (userAddress != "") {
                  const userDetails = await axios.post(
                    "http://192.168.0.4:4000/api/postUserDetails",
                    {
                      name,
                      phoneNumber,
                      email,
                      dateOfBooking:hallBookedDate,
                      typeOfEvent,
                      numberOfGuests,
                      userAddress,
                    }
                  );
                   await axios.post("http://192.168.0.4:4000/api/postBookingDate", {
          bookingDate: hallBookedDate,
          functionHallName: selectedHallName
        });  
                  console.log(userDetails, "sid");
                  setGlobalErrorMessage("");
                  setBookingDoneMessage("Booking Done Successfully");
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
      } else {
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

  console.log(dateOfBooking)

  return (
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
        value={phoneNumber}
        onChangeText={handlePhoneNumber}
      />
      {phoneNumberError && (
        <Text style={styles.errorMessage}>{phoneNumberError}</Text>
      )}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "orange",
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
