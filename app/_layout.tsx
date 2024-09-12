import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Mycontext from "@/context/createContext";
import UserLocation from "./MainDashboardPage";
import PartyzLandingPage from "./LandingPage";
import DatePicker from "./BookingDatePicker";
import UserDetailsForm from "./UserBookingDetailsPage";
import SupervisorDashboardPage from "./SupervisorDashboardPage";
import UserLoginPage from "./UserLoginPage";
import UserBookingsPage from "./UserBookingsPage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [hallBookedDate, sethallBookedDate] = React.useState(null);
  const [selectedHallName, setselectedHallName] = React.useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState(null);

  return (
    <Mycontext.Provider
      value={{
        hallBookedDate,
        sethallBookedDate,
        selectedHallName,
        setselectedHallName,
        userPhoneNumber,
        setUserPhoneNumber,
      }}
    >
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={PartyzLandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLoginPage"
          component={UserLoginPage}
          options={{ title: "User Login" }}
        />
        <Stack.Screen
          name="UserBookingsPage"
          component={UserBookingsPage}
          options={{ title: "User Login" }}
        />

        <Stack.Screen
          name="MainDashboardPage"
          component={UserLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupervisorDashboardPage"
          component={SupervisorDashboardPage}
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
