import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import BookingPage from "../components/BookingPage";
import axios from "axios";
import Mycontext from "@/context/createContext";

const DatePicker = ({ posting }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingDates, setBookingDates] = useState(null); /// this has the  filtered array of objects with function halls and date properties
  const [bookingDates2, setBookingDates2] = useState(null); /// this has the value that map returns that is date



  const { selectedHallName } = useContext(Mycontext);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const bookingDatesData = async () => {
    const details = await axios.get(
      "http://192.168.0.4:4000/api/getBookingDateDetails"
    );

    const details1 = details.data.filter((item) => {
      return item?.FunctionHallName == selectedHallName;
    });
    setBookingDates(details1);

    const details2 = details1.map((item) => {
      return item?.Date;
    });
    setBookingDates2(details2);
    console.log(details2, "saste");



    // const details3 = details.data.filter((item) => {
    //   return item?.FunctionHallName == selectedHallName
    // });

    // const details4 = details3.map((item)=>{
    //   return item?.FunctionHallName
    // })
    // setFunctionHallName(details4);
  };
  useEffect(() => {
    bookingDatesData();
  }, [selectedDate, posting]);

  const markedDates = bookingDates
    ?.map((item) => item.Date)
    .reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "red", disabled: true };

      return acc;
    }, {});

  return (
    <>
      <View style={styles.container}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: { selected: true, selectedColor: "blue" },
          }}
        />
        {selectedDate ? (
          <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        ) : (
          <Text style={styles.selectedDate}>Select a Date</Text>
        )}
      </View>

      <BookingPage date={selectedDate} bookingDates={bookingDates2}    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "orange",
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default DatePicker;
