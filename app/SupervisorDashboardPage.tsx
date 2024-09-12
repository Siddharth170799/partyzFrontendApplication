import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Input } from "react-native-elements";
import axios from "axios";
import {
  SupervisorIdPostingBackend,
  getFunctionHallsBySupervisorUserId,
  getUpdateBookingRequestUrl,
  updateBookingRequestById,
} from "@/config/useLocalConfig";

const SupervisorDashboardPage = () => {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageButton, setMessageButton] = useState("");

  const userIdInput = (supervisorid) => {
    const id = supervisorid;
    setUserId(id);
  };

  const userIdPostingBackend = async () => {
    await axios.post(SupervisorIdPostingBackend, {
      supervisorId: userId,
    });

    const details = await axios.get(getFunctionHallsBySupervisorUserId);
    setBookings(details?.data?.data);
  };

  const retrieveBookingrequests = async () => {
    const details = await axios.get(
      // `http://192.168.0.4:4000/api/getFunctionHallsBySupervisorUserId?supervisorId=${userId}`
      getFunctionHallsBySupervisorUserId
    );
    setBookings(details?.data?.data);
  };

  // const handleApprove = async (itemId) => {
  //   console.log(`Approved item ID: ${itemId}`);
  //   const details = await axios.put(
  //     `http://192.168.0.4:4000/api/updateRequestById/${itemId}`,
  //     { message: "Approved" }
  //   );

  //   setMessage("Approved");
  // };

  // const handleReject = async (itemId) => {
  //   console.log(`Rejected item ID: ${itemId}`);
  //   const details = await axios.put(
  //     `http://192.168.0.4:4000/api/updateRequestById/${itemId}`,
  //     { message: "Rejected" }
  //   );

  //   setMessage("Rejected");
  // };

  const handleApprove = async (itemId) => {
    const url = getUpdateBookingRequestUrl(itemId);
    const details = await axios.put(url, { message: "Approved" });

    setMessage("Approved");
    setMessageButton(true);
  };

  const handleReject = async (itemId) => {
    const url = getUpdateBookingRequestUrl(itemId);
    const details = await axios.put(url, { message: "Rejected" });

    setMessage("Rejected");
    setMessageButton(false);
  };

  useEffect(() => {
    if (message != null) {
      retrieveBookingrequests();
    }
  }, [message]);

  useEffect(() => {
    if (message == "Approved" || message == "Rejected") {
      setMessage("");
    }
  }, [messageButton]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Bookings Page</Text>
      <Input
        onChangeText={userIdInput}
        placeholder="Enter Supervisor ID"
        style={styles.input}
      />
      <TouchableOpacity onPress={userIdPostingBackend} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {bookings?.map((item, index) => (
        <View key={index} style={styles.bookingContainer}>
          <Text style={styles.functionHallName}>{item?.FunctionHallName}</Text>
          {item.Request != "Pending" && (
            <Text style={styles.statusMessage}>{item.Request}</Text>
          )}

          <Text style={styles.details}>Date: {item?.Date}</Text>
          <Text style={styles.details}>
            Booked By: {item?.NameofTheUserBooked}
          </Text>
          <Text style={styles.details}>Phone: {item?.PhoneNumber}</Text>
          <Text style={styles.details}>Request Status: {item?.Request}</Text>
          <Text style={styles.details}>
            Number of Guests: {item?.NumberOfGuests}
          </Text>
          <Text style={styles.details}>Event Type: {item?.TypeOfEvent}</Text>
          <View style={styles.buttonContainer}>
            {!message && item.Request == "Pending" ? (
              <TouchableOpacity
                onPress={() => handleApprove(item._id)}
                style={[styles.actionButton, styles.approveButton]}
              >
                <Text style={styles.actionButtonText}>Approve</Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}

            {!message && item.Request == "Pending" ? (
              <TouchableOpacity
                onPress={() => handleReject(item._id)}
                style={[styles.actionButton, styles.rejectButton]}
              >
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  statusMessage: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "fff",
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
    color: "#333",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  functionHallName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SupervisorDashboardPage;
