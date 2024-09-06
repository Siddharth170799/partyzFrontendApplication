import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Mycontext from "@/context/createContext";
import UserLocation from "./MainDashboardPage";
import PartyzLandingPage from "./LandingPage";
import BookingPage from "../components/BookingPage";
import DatePicker from "./BookingDatePicker";
import UserDetailsForm from "./UserBookingDetailsPage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hallBookedDate, sethallBookedDate] = React.useState("hi");
  const [selectedHallName, setselectedHallName] = React.useState(null);

  return (
    <Mycontext.Provider
      value={{
        hallBookedDate,
        sethallBookedDate,
        selectedHallName,
        setselectedHallName,
      }}
    >
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={PartyzLandingPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainDashboardPage"
          component={UserLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingDatePicker"
          component={DatePicker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserBookingDetailsPage"
          component={UserDetailsForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Mycontext.Provider>
  );
}
