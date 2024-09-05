import { Link, useNavigation } from "expo-router";

import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function PartyzLandingPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Partyz</Text>
      <Text style={styles.subtitle}>
        Your ultimate party planning companion
      </Text>

      <Text style={styles.description}>
        Discover!!!!, plan, and organize unforgettable parties with ease.
        Connect with friends, find the best venues, and enjoy the perfect party
        experience!
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("userLocation")}
        style={styles.button}
      >
        {/* <Link href={"/Settings"}> */}
        {/* {" "} */}
        <Text style={styles.buttonText}>Get Started</Text>
        {/* </Link> */}
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account? <Text style={styles.link}>Sign In</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  heroImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#FF6347",
    fontWeight: "bold",
  },
});
