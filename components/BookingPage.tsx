import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";
import Mycontext from "@/context/createContext";

const BookingPage = ({ date, bookingDates }) => {
  const navigation = useNavigation();
  const [displayMessage, setDisplayMessage] = useState("");

  const {hallBookedDate,sethallBookedDate} = useContext(Mycontext)

  
  const { selectedHallName } = useContext(Mycontext);
console.log(bookingDates)
  const datePosting = async () => {
    try {
      if (bookingDates.includes(date)){
       
        
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



// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
// import axios from "axios";
// import { useNavigation } from "expo-router";
// import Mycontext from "@/context/createContext";

// const BookingPage = ({ date, functionHallName }) => {
//   const navigation = useNavigation();
//   const [displayMessage, setDisplayMessage] = useState("");

//   const { hallBookedDate, sethallBookedDate } = useContext(Mycontext);
//   const { selectedHallName } = useContext(Mycontext);
//   const [bookingDates, setBookingDates] = useState([]);

//   // Fetch the booked dates specifically for the selected function hall
//   const fetchBookingDates = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/getBookedDates", {
//         params: {
//           functionHallName: selectedHallName, // Pass the selected hall name to get specific booking dates
//         },
//       });
//       setBookingDates(response.data.bookedDates); // Make sure to receive only the dates for the selected hall
//     } catch (error) {
//       console.error("Error fetching booking dates:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedHallName) {
//       fetchBookingDates();
//     }
//   }, [selectedHallName]);

//   const datePosting = async () => {
//     try {
//       if (bookingDates.includes(date)) {
//         setDisplayMessage("No slots available on this day");
//       } else if (date) {
//         // Post booking for the selected hall and date
//         sethallBookedDate(date);
//         setDisplayMessage("");
//         navigation.navigate("UserBookingDetailsPage");
//       }
//     } catch (error) {
//       console.error("Error posting date:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{displayMessage}</Text>
//       <TouchableOpacity style={styles.button} onPress={datePosting}>
//         <Text style={styles.buttonText}>Confirm Date</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "orange",
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default BookingPage;
